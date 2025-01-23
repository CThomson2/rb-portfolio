import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/database/client";
import { z } from "zod";
import { drumEvents } from "@/lib/events/drumEvents";

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

export async function POST(req: NextRequest) {
  try {
    console.log("=== Starting barcode scan processing ===");
    console.log("Raw request:", {
      method: req.method,
      url: req.url,
      headers: Object.fromEntries(req.headers.entries()),
    });

    // 1) Validate incoming data
    const data = await req.json();
    console.log("Parsed request data:", JSON.stringify(data, null, 2));

    // Validate against schema
    const validationResult = barcodeSchema.safeParse(data);
    if (!validationResult.success) {
      console.error("Schema validation failed:", validationResult.error);
      return NextResponse.json(
        { message: "Invalid request data format" },
        { status: 400 }
      );
    }

    // 2) Extract order_id and drum_id from the barcode string
    const match = data.barcode.match(/^(\d+)-H(\d+)/);
    console.log("Barcode regex match result:", match);
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

    console.log("Extracted IDs:", { orderId, drumId });

    // 3) Look up the existing drum record
    console.log("Querying drum record for drum_id:", drumId);
    const existingDrum = await prisma.new_drums.findUnique({
      where: { drum_id: drumId },
    });
    console.log("Found drum record:", JSON.stringify(existingDrum, null, 2));

    if (!existingDrum) {
      console.error("No drum found with ID:", drumId);
      return NextResponse.json(
        { message: `Drum ID ${drumId} not found in database` },
        { status: 404 }
      );
    }

    // 4) Branch logic by current drum status
    console.log("Current drum status:", existingDrum.status);
    switch (existingDrum.status) {
      case "pending":
        console.log("Creating import transaction for drum:", drumId);
        const importTransaction = await prisma.transactions.create({
          data: {
            tx_type: "import",
            tx_date: new Date(),
            drum_id: drumId,
            order_id: orderId,
            tx_notes: "Scanned into inventory",
          },
        });
        console.log(
          "Created import transaction:",
          JSON.stringify(importTransaction, null, 2)
        );

        // Emit status change event for pending -> available transition
        drumEvents.emit("statusChange", {
          drumId: drumId,
          newStatus: "available",
        });

        return NextResponse.json(
          {
            success: true,
            data: {
              drum_id: drumId,
              old_status: "pending",
              message:
                "Import transaction created; DB triggers will finalize updates.",
            },
          },
          { status: 200 }
        );

      case "available":
        console.log(
          "Attempting to update drum status to scheduled for drum:",
          drumId
        );
        console.log("Running update query with exact where clause:", {
          drum_id: drumId,
          status: "available", // Adding status check to ensure we only update if status hasn't changed
        });

        // TODO: Change this to a transaction with `tx_type` = 'processing' as new status. Do not update other tables
        // with Prisma other than the `transactions` table.
        const updatedDrum = await prisma.new_drums.update({
          where: {
            drum_id: drumId,
            status: "available", // Add status condition to prevent race conditions
          },
          data: {
            status: "scheduled",
          },
        });
        console.log(
          "Update query result:",
          JSON.stringify(updatedDrum, null, 2)
        );

        // Emit status change event for available -> scheduled transition
        drumEvents.emit("statusChange", {
          drumId: drumId,
          newStatus: "scheduled",
        });

        return NextResponse.json(
          {
            success: true,
            data: {
              drum_id: drumId,
              old_status: "available",
              new_status: updatedDrum.status,
              message: "Drum set to 'scheduled'.",
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
