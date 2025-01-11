import { NextResponse } from "next/server";
import { queries } from "@/database/repositories/orders/queries";

export async function GET(req: Request) {
  // Extract search params from the request URL
  // For example, from: /api/inventory/transactions?page=2&limit=10
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  // Get limit (items per page) from URL params, defaulting to 50
  // This allows requests like ?limit=10 to show 10 items per page
  const limit = parseInt(searchParams.get("limit") || "50");

  try {
    const orders = await queries.getOrders({ page, limit });
    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const newOrder = await req.json();
    const createdOrder = await queries.createOrder(newOrder);
    return NextResponse.json(createdOrder, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
