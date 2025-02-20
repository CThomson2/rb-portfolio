import { NextResponse } from "next/server";
import { prisma } from "@/database/client";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") || "";
  const material = searchParams.get("material");

  if (!material) {
    return NextResponse.json({ suggestions: [] });
  }

  try {
    // First, get historical suppliers for this material
    const historicalSuppliers = await prisma.orders.findMany({
      where: {
        material: {
          equals: material,
          mode: "insensitive",
        },
      },
      select: {
        supplier: true,
      },
      distinct: ["supplier"],
    });

    let suggestions: string[] = historicalSuppliers.map((s) => s.supplier);

    // If user is typing, filter existing suggestions and add new matches
    if (query) {
      const additionalSuppliers = await prisma.suppliers.findMany({
        where: {
          name: {
            startsWith: query,
            mode: "insensitive",
          },
          // Exclude suppliers we already have
          NOT: {
            name: {
              in: suggestions,
            },
          },
        },
        select: {
          name: true,
        },
        take: 10,
      });

      // Combine and sort results
      suggestions = [
        ...suggestions.filter((s) =>
          s.toLowerCase().startsWith(query.toLowerCase())
        ),
        ...additionalSuppliers.map((s) => s.name),
      ];
    }

    return NextResponse.json({
      suggestions,
    });
  } catch (error) {
    console.error("Error fetching supplier suggestions:", error);
    return NextResponse.json(
      { error: "Failed to fetch suggestions" },
      { status: 500 }
    );
  }
}
