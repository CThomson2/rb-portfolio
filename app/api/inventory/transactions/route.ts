// app/api/inventory/transactions/route.ts
import { prisma } from "@/database/client";
import { NextResponse } from "next/server";
import { getTransactions } from "@/database/repositories/transactions/queries";

export async function GET() {
  try {
    const transactions = await getTransactions();

    return NextResponse.json(transactions.rows);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}
