import { prisma } from "@/database/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const recentDeliveries = await prisma.deliveries.findMany({
      orderBy: { date_received: "desc" },
      take: 3,
      select: {
        delivery_id: true,
        date_received: true,
        // ... any other fields to display
      },
    });
    return NextResponse.json(recentDeliveries);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
