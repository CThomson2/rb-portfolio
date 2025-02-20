import { NextResponse } from "next/server";
import { prisma } from "@/database/client";

interface GroupStock {
  chemical_group: string;
  total_stock: bigint;
  material_count: bigint;
  materials: {
    id: number;
    name: string;
    stock: number;
    cas_number: string;
  }[];
}

export async function GET() {
  try {
    // Get stock levels by chemical group with material details
    const groupStockLevels = await prisma.$queryRaw<GroupStock[]>`
      WITH MaterialStock AS (
        SELECT 
          nd.material,
          COUNT(*) as current_stock
        FROM inventory.new_drums nd
        WHERE nd.status = 'available'
        GROUP BY nd.material
      )
      SELECT
        rm.chemical_group,
        COALESCE(SUM(ms.current_stock), 0) as total_stock,
        COUNT(DISTINCT rm.name) as material_count,
        jsonb_agg(
          jsonb_build_object(
            'id', rm.id,
            'name', rm.name,
            'stock', COALESCE(ms.current_stock, 0),
            'cas_number', rm.cas_number
          )
        ) as materials
      FROM public.raw_materials rm
      LEFT JOIN MaterialStock ms ON ms.material = rm.name
      GROUP BY rm.chemical_group
      ORDER BY total_stock DESC
    `;

    // Calculate stock distribution percentages
    const totalStock = groupStockLevels.reduce(
      (sum, group) => sum + Number(group.total_stock),
      0
    );

    console.log("\n\nTotal Stock:", totalStock.toString());

    const groupsWithPercentages = groupStockLevels.map((group) => ({
      chemical_group: group.chemical_group,
      total_stock: Number(group.total_stock),
      material_count: Number(group.material_count),
      percentage: totalStock
        ? ((Number(group.total_stock) / totalStock) * 100).toFixed(1)
        : "0",
      materials: group.materials.map((material) => ({
        ...material,
        stock: Number(material.stock),
      })),
    }));

    console.log("\n\nGroups with Percentages:", groupsWithPercentages);

    return NextResponse.json({
      groups: groupsWithPercentages,
      totalStock,
    });
  } catch (error) {
    console.error("Error fetching material groups data:", error);
    return NextResponse.json(
      { error: "Failed to fetch material groups data" },
      { status: 500 }
    );
  }
}
