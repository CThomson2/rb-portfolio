// database/repositories/products/queries.ts
import { prisma } from "@/database/client";

/**
 * Gets the 100 most recent inventory transactions with material names.
 * Joins with imports, new drums, and repro drums tables to get the material name
 * based on which ID is present in the transaction.
 * @returns Promise resolving to array of transactions with material names

 */
export async function getTransactions() {
  return prisma.$queryRaw`
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
}
