// app/api/inventory/transactions/route.ts
import { prisma } from "@/database/client";
import { NextResponse } from "next/server";
import { getTransactions } from "@/database/repositories/transactions/queries";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "50");

  try {
    const transactions = await getTransactions();
    return NextResponse.json(transactions);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}
