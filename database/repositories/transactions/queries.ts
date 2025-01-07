// database/repositories/products/queries.ts
import { prisma } from "@/database/client";

/**
 * Gets the 100 most recent inventory transactions with material names.
 * Joins with imports, new drums, and repro drums tables to get the material name
 * based on which ID is present in the transaction.
 * @returns Promise resolving to array of transactions with material names

 */
export async function getTransactions(): Promise<any> {
  return prisma.$queryRaw`
    SELECT 
      t.*, 
      CASE 
      WHEN t.delivery_id IS NOT NULL THEN (
        SELECT material
        FROM inventory.orders o
        INNER JOIN inventory.deliveries d ON d.order_id = o.order_id
        WHERE d.delivery_id = t.delivery_id
      )
      WHEN t.drum_id IS NOT NULL THEN nd.material_type
      WHEN t.repro_id IS NOT NULL THEN rd.material_type
      END as material_name
    FROM inventory.transactions t
    LEFT JOIN inventory.deliveries d ON t.delivery_id = d.delivery_id
    LEFT JOIN inventory.new_drums nd ON t.drum_id = nd.drum_id
    LEFT JOIN inventory.repro_drums rd ON t.repro_id = rd.repro_drum_id
    ORDER BY t.tx_date
    LIMIT 100
  `;
}
