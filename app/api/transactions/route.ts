import { NextResponse } from "next/server";
import { prisma } from "@/database/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const material = searchParams.get("material");

  if (!material) {
    return NextResponse.json(
      { error: "Material parameter is required" },
      { status: 400 }
    );
  }

  try {
    const transactions = await prisma.transactions.findMany({
      where: {
        material: {
          contains: material,
          mode: "insensitive",
        },
      },
      orderBy: {
        tx_date: "desc",
      },
      take: 100, // Limit to 100 most recent transactions
    });

    return NextResponse.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}
