import { NextResponse } from "next/server";
import { queries } from "@/database/repositories/orders/queries";
import { prisma } from "@/database/client";
import type { OrderFormData } from "@/types/database/inventory/orders";
import { PrismaClientKnownRequestError } from "@/database/prisma/generated/public-client/runtime/library";

// Example request for Postman: http://localhost:3000/api/inventory/orders?page=1&limit=10
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

// Example request for Postman: http://localhost:3000/api/inventory/orders,
// Format of body when sending from frontend: { material: "string", supplier: "string", quantity: "number" }
export async function POST(req: Request) {
  // Parse request body
  const body = await req.json();
  const { material, supplier, quantity } = body;

  try {
    // 1) Create new order
    const newOrder: OrderFormData = await prisma.orders.create({
      data: {
        supplier,
        material,
        quantity,
      },
    });

    // 3) Return the combined data in JSON
    return NextResponse.json(
      {
        success: true,
        order: newOrder, // the order data
        // drum_ids: drumIds, // the array of new drum IDs
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      // PostgreSQL error messages are in error.message
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to create order" },
      { status: 500 }
    );
  }
}
