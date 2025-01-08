// This is a Next.js API route handler for fetching inventory transactions
// The route is accessed at /api/inventory/transactions
import { prisma } from "@/database/client";
import { NextResponse } from "next/server";
import { getTransactions } from "@/database/repositories/transactions/queries";

export async function GET(req: Request) {
  // Extract search params from the request URL
  // For example, from: /api/inventory/transactions?page=2&limit=10
  const { searchParams } = new URL(req.url);

  // Get page number from URL params, defaulting to 1 if not provided
  // parseInt converts the string param to a number
  const page = parseInt(searchParams.get("page") || "1");

  // Get limit (items per page) from URL params, defaulting to 50
  // This allows requests like ?limit=10 to show 10 items per page
  const limit = parseInt(searchParams.get("limit") || "50");

  try {
    // Fetch transactions from the database using the repository function
    // TODO: Pass page and limit to getTransactions for pagination
    const transactions = await getTransactions(page, limit);
    return NextResponse.json(transactions);
  } catch (error) {
    // If database query fails, return 500 error response
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}
