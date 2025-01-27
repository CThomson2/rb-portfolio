import { NextResponse } from "next/server";
import { prisma } from "@/database/client";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const orderId = parseInt(params.id);
    if (isNaN(orderId)) {
      return NextResponse.json({ error: "Invalid order ID" }, { status: 400 });
    }

    const {
      etaStart,
      etaEnd,
    }: { etaStart?: string | null; etaEnd?: string | null } =
      await request.json();

    // Update the order's ETA
    console.log("Updating order ETA with:", { orderId, etaStart, etaEnd });

    const etaStartDate = etaStart
      ? new Date(etaStart).toISOString().split("T")[0]
      : null;
    const etaEndDate = etaEnd
      ? new Date(etaEnd).toISOString().split("T")[0]
      : null;

    console.log("Parsed dates:", { etaStartDate, etaEndDate });

    const updatedOrder = await prisma.orders.update({
      where: { order_id: orderId },
      data: {
        eta_start: etaStartDate,
        eta_end: etaEndDate,
      },
    });

    console.log("Updated order:", updatedOrder);

    // Calculate eta_status based on the dates
    const now = new Date();
    let eta_status: "tbc" | "confirmed" | "overdue" = "tbc";

    if (updatedOrder.eta_start) {
      eta_status = "confirmed";
      if (
        updatedOrder.eta_end &&
        now > updatedOrder.eta_end &&
        updatedOrder.delivery_status === "pending"
      ) {
        eta_status = "overdue";
      }
    }

    // Return the order with the calculated eta_status
    return NextResponse.json({
      ...updatedOrder,
      eta_status,
    });
  } catch (error) {
    console.error("Error updating order ETA:", error);
    return NextResponse.json(
      { error: "Failed to update order ETA" },
      { status: 500 }
    );
  }
}
