// app/api/inventory/transactions/route.ts
import { prisma } from "@/database/client";
import { NextResponse } from "next/server";
import { inventoryRepository } from "@/database/repositories";

export async function GET() {
  try {
    const transactions = await prisma.$queryRaw`
        SELECT 
            t.*, 
            CASE 
            WHEN t.import_id IS NOT NULL THEN i.supplier_name
            WHEN t.drum_id IS NOT NULL THEN nd.material_type
            WHEN t.repro_id IS NOT NULL THEN rd.material_type
            END as material_name
        FROM inventory.transactions t
        LEFT JOIN inventory.imports i ON t.import_id = i.import_id
        LEFT JOIN inventory.new_drums nd ON t.drum_id = nd.drum_id
        LEFT JOIN inventory.repro_drums rd ON t.repro_id = rd.repro_drum_id
        ORDER BY t.created_at DESC
        LIMIT 100
    `;

    return NextResponse.json(transactions.rows);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}
