import { NextResponse } from "next/server";
import { prisma } from "@/database/client";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ suggestions: [] });
  }

  try {
    // Raw SQL equivalent:
    // SELECT name
    // FROM raw_materials
    // WHERE name ILIKE $1 || '%'
    // LIMIT 10;
    const suggestions = await prisma.raw_materials.findMany({
      where: {
        name: {
          startsWith: query,
          mode: "insensitive", // Case-insensitive search
        },
      },
      select: {
        name: true,
      },
      take: 10, // Limit results
    });

    return NextResponse.json({
      suggestions: suggestions.map((s) => s.name),
    });
  } catch (error) {
    console.error("Error fetching material suggestions:", error);
    return NextResponse.json(
      { error: "Failed to fetch suggestions" },
      { status: 500 }
    );
  }
}
