import { NextResponse } from "next/server";
import { prisma } from "@/database/client";

interface MaterialCount {
  low_stock_count: bigint;
}

interface DailyChange {
  day: string;
  net_change: number;
}

interface TopMaterial {
  material: string;
  count: bigint;
}

export async function GET() {
  try {
    // Get total count of available drums
    const totalStock = await prisma.new_drums.count({
      where: {
        status: "available",
      },
    });

    // Get count of drums by material where count is low (less than 5)
    const lowStockMaterials = await prisma.$queryRaw<MaterialCount[]>`
      WITH MaterialCounts AS (
        SELECT 
          material,
          COUNT(*) as count
        FROM inventory.new_drums
        WHERE status = 'available'
        GROUP BY material
      )
      SELECT 
        COUNT(*) as low_stock_count
      FROM MaterialCounts
      WHERE count < 5
    `;

    // Get daily stock changes for the past 2 weeks (weekdays only)
    const weeklyStockChanges = await prisma.$queryRaw<DailyChange[]>`
      WITH RECURSIVE DateSeries AS (
        -- Generate dates for last 10 weekdays
        SELECT 
          CURRENT_DATE - INTERVAL '14 days' + (n || ' days')::INTERVAL AS date
        FROM generate_series(0, 14) n
        WHERE EXTRACT(DOW FROM CURRENT_DATE - INTERVAL '14 days' + (n || ' days')::INTERVAL) NOT IN (0, 6)
        LIMIT 10
      ),
      DailyChanges AS (
        SELECT 
          DATE(tx_date) as date,
          COUNT(*) as change_count,
          tx_type
        FROM inventory.transactions
        WHERE 
          tx_date >= CURRENT_DATE - INTERVAL '14 days'
          AND tx_type IN ('intake', 'processed')
        GROUP BY DATE(tx_date), tx_type
      )
      SELECT 
        to_char(ds.date, 'Dy') as day,
        COALESCE(
          SUM(
            CASE 
              WHEN dc.tx_type = 'intake' THEN dc.change_count 
              WHEN dc.tx_type = 'processed' THEN -dc.change_count
              ELSE 0 
            END
          ),
          0
        ) as net_change
      FROM DateSeries ds
      LEFT JOIN DailyChanges dc ON ds.date = dc.date
      GROUP BY ds.date, to_char(ds.date, 'Dy')
      ORDER BY ds.date DESC
      LIMIT 10
    `;

    // Get top materials by current stock
    const topMaterials = await prisma.$queryRaw<TopMaterial[]>`
      SELECT 
        material,
        COUNT(*) as count
      FROM inventory.new_drums
      WHERE status = 'available'
      GROUP BY material
      ORDER BY count DESC
      LIMIT 10
    `;

    return NextResponse.json({
      totalStock,
      lowStockCount: Number(lowStockMaterials[0].low_stock_count),
      weeklyStockChanges: weeklyStockChanges.map((change) => ({
        ...change,
        net_change: Number(change.net_change),
      })),
      topMaterials: topMaterials.map((material) => ({
        ...material,
        count: Number(material.count),
      })),
    });
  } catch (error) {
    console.error("Error fetching inventory overview:", error);
    return NextResponse.json(
      { error: "Failed to fetch inventory overview" },
      { status: 500 }
    );
  }
}
