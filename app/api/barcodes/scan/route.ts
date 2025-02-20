import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/database/client";
import { z } from "zod";
import { drumEvents } from "@/lib/events/drumEvents";
import { sendOrderCompleteNotification } from "@/lib/email/orderNotifications";
import type { Order } from "@/types/database/inventory/orders";

/**
 * Zod schema for the barcode data format
 * e.g. "52-H1024" or "52-H1024 2024/01/22 08:31:59"
 */
const barcodeSchema = z.object({
  barcode: z
    .string()
    .regex(/^(\d+)-H(\d+)(?:\s+\d{4}\/\d{2}\/\d{2}\s+\d{2}:\d{2}:\d{2})?$/),
  timestamp: z.string(),
});

/* Data validation methods */
async function validateDrumStatus(
  drumId: number,
  expectedStatus: string
): Promise<boolean> {
  const drum = await prisma.new_drums.findUnique({
    where: { drum_id: drumId },
  });
  return drum?.status === expectedStatus;
}

/**
 * POST endpoint for processing barcode scans of drums
 *
 * This endpoint handles barcode scanning events for drums in the inventory system.
 * It validates the barcode format, looks up the drum record, and processes status
 * transitions based on the current drum state.
 *
 * @route POST /api/barcodes/scan
 *
 * @param {NextRequest} req - The request object containing:
 *   @param {Object} req.body - Request body
 *   @param {string} req.body.barcode - Barcode string in format "XX-HXXXX" or "XX-HXXXX YYYY/MM/DD HH:mm:ss"
 *   @param {string} req.body.timestamp - Timestamp of the scan
 *
 * @returns {Promise<NextResponse>} Response object with:
 *   - 200: Successful scan processing
 *     - success: true
 *     - data: Object containing drum_id, status changes, and result message
 *   - 400: Invalid request data or unhandled drum status
 *     - message: Error description
 *   - 404: Drum not found
 *     - message: Error description
 *   - 500: Internal server error
 *     - message: "Internal server error"
 *     - error: Error details
 *
 * @throws {Error} When database operations fail or unexpected errors occur
 *
 * @example Request body:
 * {
 *   "barcode": "52-H1024",
 *   "timestamp": "2024-01-22T08:31:59Z"
 * }
 *
 * @example Success Response (Pending -> Available):
 * {
 *   "success": true,
 *   "data": {
 *     "drum_id": 1024,
 *     "old_status": "pending",
 *     "message": "Import transaction created; DB triggers will finalize updates."
 *   }
 * }
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    console.log("=== Starting barcode scan processing ===");
    console.log("\nRaw request:", {
      method: req.method,
      url: req.url,
      headers: {
        "content-length": req.headers.get("content-length"),
        "x-forwarded-for": req.headers.get("x-forwarded-for"),
      },
      // headers: Object.fromEntries(req.headers.entries()),
    });

    // 1) Validate incoming data
    const data = await req.json();
    console.log("\nParsed request data:", JSON.stringify(data, null, 2));

    // Validate against schema
    const validationResult = barcodeSchema.safeParse(data);
    if (!validationResult.success) {
      console.error(
        "\n\n !!~~ Schema validation failed: ~~!!",
        validationResult.error
      );
      return NextResponse.json(
        { message: "Invalid request data format" },
        { status: 400 }
      );
    }

    // 2) Extract order_id and drum_id from the barcode string
    const match = data.barcode.match(/^(\d+)-H(\d+)/);
    console.log("\nBarcode regex match result:", match);
    if (!match) {
      console.error("Invalid barcode format:", data.barcode);
      return NextResponse.json(
        { message: "Invalid barcode format" },
        { status: 400 }
      );
    }
    const [, orderIdStr, drumIdStr] = match;
    const orderId = parseInt(orderIdStr, 10);
    const drumId = parseInt(drumIdStr, 10);

    console.log("\nExtracted IDs:", { orderId, drumId });

    // Check the last scan time
    const lastScan = await prisma.transactions.findFirst({
      where: { drum_id: drumId },
      orderBy: { updated_at: "desc" },
    });

    const material =
      (
        await prisma.orders.findUnique({
          where: { order_id: orderId },
          select: {
            material: true,
          },
        })
      )?.material ?? "";

    const now = new Date();
    if (lastScan) {
      const timeSinceLastScan = Math.floor(
        (now.getTime() - new Date(lastScan.updated_at).getTime()) / 60000
      );

      if (timeSinceLastScan < 60) {
        // Insert a "cancelled" transaction
        const cancelledTransaction = await prisma.transactions.create({
          data: {
            tx_type: "cancelled",
            material: material,
            // tx_date: now,
            drum_id: drumId,
            order_id: orderId,
            tx_notes: `Scanned ${timeSinceLastScan} minutes after most recent scan`,
          },
        });

        return NextResponse.json(
          {
            message: `Drum has been scanned recently. Transaction cancelled.`,
          },
          { status: 429 }
        );
      }
    }

    // 3) Look up the existing drum record
    console.log("\nQuerying drum record for drum_id:", drumId);
    const existingDrum = await prisma.new_drums.findUnique({
      where: { drum_id: drumId },
    });
    console.log("\nFound drum record:", JSON.stringify(existingDrum, null, 2));
    console.log(
      "\nCurrent inventory status:",
      existingDrum?.status.toUpperCase()
    );

    if (!existingDrum) {
      console.error("No drum found with ID:", drumId);
      return NextResponse.json(
        { message: `Drum ID ${drumId} not found in database` },
        { status: 404 }
      );
    }

    let isValid: boolean;

    // 4) Branch logic by current drum status
    switch (existingDrum.status) {
      /* Scanning into inventory */
      case "pending":
        console.log("Creating import transaction for drum:", drumId);
        const importTransaction = await prisma.transactions.create({
          data: {
            tx_type: "intake",
            material: material,
            // tx_date: now,
            drum_id: drumId,
            order_id: orderId,
            tx_notes: "Scanned into inventory",
          },
        });
        console.log(
          "Created import transaction:",
          JSON.stringify(importTransaction, null, 2)
        );

        // Check if status was updated by trigger
        console.log("Verifying drum status update...");
        isValid = await validateDrumStatus(drumId, "available");
        if (!isValid) {
          console.error("Failed to update drum status to 'available'");
          return NextResponse.json(
            {
              success: false,
              data: {
                drum_id: drumId,
                old_status: "pending",
                message: "Failed to update drum status via database trigger",
              },
            },
            { status: 500 }
          );
        }

        // Emit both events with logging
        console.log("Emitting drumStatus event for drum:", drumId);
        drumEvents.emit("drumStatus", drumId, "available");

        console.log("Emitting orderUpdate event for order:", orderId);
        drumEvents.emit("orderUpdate", orderId, drumId, 1);

        console.log("Events emitted successfully");

        // After processing the scan, check if the order is now complete
        console.log("\nChecking if order is complete for order ID:", orderId);
        const drumOrder = await prisma.orders.findUnique({
          where: { order_id: orderId },
        });
        console.log("Found order:", JSON.stringify(drumOrder, null, 2));

        return NextResponse.json(
          {
            success: true,
            data: {
              drum_id: drumId,
              order_id: orderId,
              old_status: "pending",
              message:
                "Import transaction created; DB triggers will finalize updates.",
            },
          },
          { status: 200 }
        );

      /* Scanning out of inventory */
      case "available":
        console.log("Creating processing transaction for drum:", drumId);
        const processingTransaction = await prisma.transactions.create({
          data: {
            tx_type: "processing",
            material: material,
            tx_date: now,
            drum_id: drumId,
            tx_notes: "Scanned out of inventory - staged for production",
          },
        });
        console.log(
          "Created processing transaction:",
          JSON.stringify(processingTransaction, null, 2)
        );

        // Check if status was updated by trigger
        console.log("Verifying drum status update...");
        isValid = await validateDrumStatus(drumId, "processed");
        if (!isValid) {
          console.error("Failed to update drum status to 'processed'");
          return NextResponse.json(
            {
              success: false,
              data: {
                drum_id: drumId,
                old_status: "available",
                message: "Failed to update drum status via database trigger",
              },
            },
            { status: 500 }
          );
        }

        // Emit status change event for available -> processed transition
        console.log("Emitting drumStatus event for drum:", "#" + drumId);
        drumEvents.emit("drumStatus", drumId, "processed");

        return NextResponse.json(
          {
            success: true,
            data: {
              drum_id: drumId,
              old_status: "available",
              new_status: "processed",
              message: "Drum status updated to 'processed'",
            },
          },
          { status: 200 }
        );

      default:
        console.error("Unexpected drum status:", existingDrum.status);
        return NextResponse.json(
          {
            message: `Invalid or unhandled drum status for scanning: ${existingDrum.status}`,
          },
          { status: 400 }
        );
    }
  } catch (error: any) {
    console.error("Error processing barcode:", {
      message: error.message,
      stack: error.stack,
      code: error.code,
      meta: error.meta,
    });
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}

/* EMAIL NOTIFICATIONS */
/*
if (dbOrder && dbOrder.status === "complete") {
  console.log("Order is complete, preparing email notification");

  // Calculate eta_status
  const now = new Date();
  let eta_status: "tbc" | "confirmed" | "overdue" = "tbc";

  if (dbOrder.eta_start) {
    eta_status = "confirmed";
    if (dbOrder.eta_end && now > dbOrder.eta_end) {
      eta_status = "overdue";
    }
  }
  console.log("Calculated ETA status:", eta_status);

  // Create full order object with eta_status
  const order: Order = {
    order_id: dbOrder.order_id,
    supplier: dbOrder.supplier,
    material: dbOrder.material,
    quantity: dbOrder.quantity,
    quantity_received: dbOrder.quantity_received,
    status:
      dbOrder.status as Order["status"],
    notes: dbOrder.notes || undefined,
    eta_status,
    date_ordered: dbOrder.date_ordered?.toISOString(),
    created_at: dbOrder.created_at?.toISOString(),
    updated_at: dbOrder.updated_at?.toISOString(),
    eta_start: dbOrder.eta_start?.toISOString() || null,
    eta_end: dbOrder.eta_end?.toISOString() || null,
  };
  console.log(
    "Prepared order object for email:",
    JSON.stringify(order, null, 2)
  );

  // Send email notification
  console.log("Attempting to send email notification...");
  try {
    await sendOrderCompleteNotification(order);
    console.log("Email notification sent successfully");
  } catch (error) {
    console.error("Failed to send email notification:", error);
  }
} else {
  console.log(
    "Order not complete or not found - skipping email notification"
  );
}
*/
