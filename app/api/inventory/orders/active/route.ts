// TODO: This is a route to get data for the sidebar. Add more functionality to this route and others relating to the sidebar, as it's not close to being fully implemented yet.
import { NextResponse } from "next/server";
import { queries } from "@/database/repositories/orders/queries";
import type {
  OrderFormData,
  OrderGetResponse,
  OrderQueryParams,
} from "@/types/database/inventory/orders";
import { PrismaClientKnownRequestError } from "@/database/prisma/generated/public-client/runtime/library";

export async function GET(req: Request) {
  // Extract search params from the request URL
  // For example, from: /api/inventory/transactions?page=2&limit=10
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  // Get limit (items per page) from URL params, defaulting to 50
  // This allows requests like ?limit=10 to show 10 items per page
  const limit = parseInt(searchParams.get("limit") || "50");

  try {
    const orders = await queries.getActiveOrders();
    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
