import { NextResponse } from "next/server";
import { prisma } from "@/database/client";
import type { Order } from "@/types/database/inventory/orders";
import { Prisma } from "@/database/prisma/generated/public-client";

/**
 * Fetches the three most recent orders, optionally filtered by supplier and/or material.
 * Orders are sorted by date_ordered in descending order.
 *
 * @param req - The incoming request object
 * @returns NextResponse containing the recent orders or an error message
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q") || "";

    // First, get the most recent orders (limited to 10 to have a good pool for filtering)
    const recentOrders = await prisma.orders.findMany({
      orderBy: {
        date_ordered: "desc",
      },
      take: 10,
      select: {
        order_id: true,
        supplier: true,
        material: true,
        quantity: true,
        quantity_received: true,
        status: true,
        date_ordered: true,
        po_number: true,
      },
    });

    // If there's a search query, filter the results
    let filteredOrders = recentOrders;
    if (query) {
      // Filter orders to include only those where the material or supplier matches the query string
      filteredOrders = recentOrders.filter((order) => {
        const materialMatch = order.material
          .toLowerCase()
          .includes(query.toLowerCase());
        const supplierMatch = order.supplier
          .toLowerCase()
          .includes(query.toLowerCase());
        return materialMatch || supplierMatch;
      });

      // Sort the filtered orders to prioritize those where the material or supplier starts with the query string
      filteredOrders.sort((a, b) => {
        const aMatches =
          a.material.toLowerCase().startsWith(query.toLowerCase()) ||
          a.supplier.toLowerCase().startsWith(query.toLowerCase());
        const bMatches =
          b.material.toLowerCase().startsWith(query.toLowerCase()) ||
          b.supplier.toLowerCase().startsWith(query.toLowerCase());

        if (aMatches && !bMatches) return -1; // a should come before b
        if (!aMatches && bMatches) return 1; // b should come before a
        return 0; // maintain original order if both or neither match
      });
    }

    // Take only the first 3 orders after filtering and sorting
    filteredOrders = filteredOrders.slice(0, 3);

    return NextResponse.json({
      orders: filteredOrders,
      message: "Recent orders fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching recent orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch recent orders" },
      { status: 500 }
    );
  }
}
