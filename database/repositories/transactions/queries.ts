// database/repositories/products/queries.ts
import { prisma } from "@/database/client";
import { TransactionRow } from "@/types/database/transactions";
/**
 * Gets the 100 most recent inventory transactions with material names.
 * Joins with imports, new drums, and repro drums tables to get the material name
 * based on which ID is present in the transaction.
 * @returns Promise resolving to array of transactions with material names

 */
export async function getTransactions(
  page: number = 1,
  limit: number = 50
): Promise<{ rows: TransactionRow[]; total: number }> {
  const offset = (page - 1) * limit;

  // Use a CTE (Common Table Expression) for better performance
  const result = await prisma.$queryRaw`
    WITH MaterialInfo AS (
      SELECT 
        d.delivery_id,
        o.material as delivery_material,
        nd.drum_id,
        nd.material_type as drum_material,
        rd.repro_drum_id,
        rd.material_type as repro_material
      FROM inventory.deliveries d
      LEFT JOIN inventory.orders o ON d.order_id = o.order_id
      LEFT JOIN inventory.new_drums nd ON nd.drum_id = nd.drum_id
      LEFT JOIN inventory.repro_drums rd ON rd.repro_drum_id = rd.repro_drum_id
    )
    SELECT 
      t.*,
      COALESCE(
        mi.delivery_material,
        mi.drum_material,
        mi.repro_material
      ) as material_name,
      COUNT(*) OVER() as total_count
    FROM inventory.transactions t
    LEFT JOIN MaterialInfo mi ON 
      t.delivery_id = mi.delivery_id OR
      t.drum_id = mi.drum_id OR
      t.repro_id = mi.repro_drum_id
    ORDER BY t.tx_date DESC
    LIMIT ${limit}
    OFFSET ${offset}
  `;

  const rows = result as TransactionRow[];
  const total = rows[0]?.total_count ?? 0;

  return { rows, total };
  // return prisma.$queryRaw`
  //   SELECT
  //     t.*,
  //     CASE
  //     WHEN t.delivery_id IS NOT NULL THEN (
  //       SELECT material
  //       FROM inventory.orders o
  //       INNER JOIN inventory.deliveries d ON d.order_id = o.order_id
  //       WHERE d.delivery_id = t.delivery_id
  //     )
  //     WHEN t.drum_id IS NOT NULL THEN nd.material_type
  //     WHEN t.repro_id IS NOT NULL THEN rd.material_type
  //     END as material_name
  //   FROM inventory.transactions t
  //   LEFT JOIN inventory.deliveries d ON t.delivery_id = d.delivery_id
  //   LEFT JOIN inventory.new_drums nd ON t.drum_id = nd.drum_id
  //   LEFT JOIN inventory.repro_drums rd ON t.repro_id = rd.repro_drum_id
  //   ORDER BY t.tx_date
  //   LIMIT 100
  // `;
}
