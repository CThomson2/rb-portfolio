import { NextResponse } from "next/server";
import { prisma } from "@/database/client";
import { format } from "date-fns";

export async function GET() {
  try {
    // Get today's date in YYYY-MM-DD format for database query
    const today = new Date();
    const todayFormatted = format(today, "yyyy-MM-dd");

    // Count orders made today
    const todayOrdersCount = await prisma.orders.count({
      where: {
        date_ordered: {
          gte: new Date(todayFormatted),
          lt: new Date(
            new Date(todayFormatted).getTime() + 24 * 60 * 60 * 1000
          ),
        },
      },
    });

    // Convert count to letter (A, B, C)
    const letterMap = ["A", "B", "C", "D", "E"];
    const orderLetter = letterMap[todayOrdersCount] || "X";

    // Generate PO number in format YY-MM-DD-A-RS
    const poNumber = `${format(today, "yy-MM-dd")}-${orderLetter}-RS`;

    return NextResponse.json({ poNumber });
  } catch (error) {
    console.error("Failed to generate PO number:", error);
    return NextResponse.json(
      { error: "Failed to generate PO number" },
      { status: 500 }
    );
  }
}
