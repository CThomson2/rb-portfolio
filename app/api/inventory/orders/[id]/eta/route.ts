<<<<<<< HEAD
=======
/**
 * API Route Handler for updating order ETA (Estimated Time of Arrival)
 *
 * This endpoint allows updating the ETA start and end dates for a specific order.
 * It also calculates an ETA status based on the dates and delivery status.
 *
 * @route PATCH /api/inventory/orders/[id]/eta
 *
 * @param request - The incoming HTTP request
 * @param params - URL parameters containing the order ID
 *
 * @returns NextResponse with the updated order and calculated ETA status
 *
 * Request Body:
 * {
 *   etaStart?: string | null - ISO date string for ETA start date
 *   etaEnd?: string | null - ISO date string for ETA end date
 * }
 *
 * Response Body:
 * {
 *   ...orderFields - All fields from the updated order
 *   eta_status: "tbc" | "confirmed" | "overdue" - Calculated status
 * }
 *
 * Status Codes:
 * - 200: Successfully updated order ETA
 * - 400: Invalid order ID
 * - 500: Server error while updating
 */
>>>>>>> lint/production-build
import { NextResponse } from "next/server";
import { prisma } from "@/database/client";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
<<<<<<< HEAD
=======
    // Parse and validate order ID
>>>>>>> lint/production-build
    const orderId = parseInt(params.id);
    if (isNaN(orderId)) {
      return NextResponse.json({ error: "Invalid order ID" }, { status: 400 });
    }

<<<<<<< HEAD
=======
    // Parse request body
>>>>>>> lint/production-build
    const {
      etaStart,
      etaEnd,
    }: { etaStart?: string | null; etaEnd?: string | null } =
      await request.json();

    // Update the order's ETA
    console.log("Updating order ETA with:", { orderId, etaStart, etaEnd });

<<<<<<< HEAD
    const etaStartDate = etaStart
      ? new Date(etaStart).toISOString().split("T")[0]
      : null;
    const etaEndDate = etaEnd
      ? new Date(etaEnd).toISOString().split("T")[0]
      : null;
=======
    // Convert string dates to Date objects or null
    const etaStartDate = etaStart ? new Date(etaStart) : null;
    const etaEndDate = etaEnd ? new Date(etaEnd) : null;
>>>>>>> lint/production-build

    console.log("Parsed dates:", { etaStartDate, etaEndDate });

    const updatedOrder = await prisma.orders.update({
      where: { order_id: orderId },
      data: {
        eta_start: etaStartDate,
        eta_end: etaEndDate,
<<<<<<< HEAD
      },
    });

    console.log("Updated order:", updatedOrder);

    // Calculate eta_status based on the dates
=======
        updated_at: new Date(),
      },
    });

    console.log("\n\nUpdated order:", updatedOrder, "\n");

    // Calculate ETA status
>>>>>>> lint/production-build
    const now = new Date();
    let eta_status: "tbc" | "confirmed" | "overdue" = "tbc";

    if (updatedOrder.eta_start) {
      eta_status = "confirmed";
      if (
        updatedOrder.eta_end &&
        now > updatedOrder.eta_end &&
<<<<<<< HEAD
        updatedOrder.delivery_status === "pending"
=======
        updatedOrder.status === "pending"
>>>>>>> lint/production-build
      ) {
        eta_status = "overdue";
      }
    }

<<<<<<< HEAD
    // Return the order with the calculated eta_status
    return NextResponse.json({
      ...updatedOrder,
      eta_status,
    });
=======
    // Format the response to ensure dates are in ISO string format
    const formattedOrder = {
      ...updatedOrder,
      eta_start: updatedOrder.eta_start?.toISOString() || null,
      eta_end: updatedOrder.eta_end?.toISOString() || null,
      created_at: updatedOrder.created_at?.toISOString(),
      updated_at: updatedOrder.updated_at?.toISOString(),
      eta_status,
    };

    return NextResponse.json(formattedOrder);
>>>>>>> lint/production-build
  } catch (error) {
    console.error("Error updating order ETA:", error);
    return NextResponse.json(
      { error: "Failed to update order ETA" },
      { status: 500 }
    );
  }
}
