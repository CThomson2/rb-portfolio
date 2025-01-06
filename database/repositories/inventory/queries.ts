// database/repositories/products/queries.ts
import { prisma } from "@/database/client";
import { GRADE } from "@/types/database/products";

// interface FetchProductsOptions {
//   grade?: string;
//   limit?: number;
//   offset?: number;
// }

/**
 * Counts the total number of products, optionally filtered by grade
 * @param grade Optional GRADE enum value to filter products by
 * @returns Promise resolving to the count of products matching the criteria
 *
 * Example SQL generated:
 * SELECT COUNT(*) FROM products WHERE grade = $1
 * Or if no grade provided:
 * SELECT COUNT(*) FROM products
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

/**
 * Gets counts of products broken down by grade and total
 * Uses a single GROUP BY query for efficiency rather than multiple count queries
 * @returns Object containing total count and count per grade
 *
 * Example SQL generated:
 * SELECT grade, COUNT(*) as _count
 * FROM products
 * GROUP BY grade;
 *
 * And:
 * SELECT COUNT(*) FROM products;
 *
 * Returns object like:
 * {
 *   all: number,    // Total products
 *   GD: number,     // Count of GD grade products
 *   HPLC: number,   // Count of HPLC grade products
 *   LCMS: number,   // Count of LCMS grade products
 *   PTS_DS: number  // Count of PTS-DS grade products
 * }
 */
export async function getProductCounts() {
  // Fetch all counts in a single query using GroupBy
  const gradeCounts = await prisma.products.groupBy({
    by: ["grade"],
    _count: true,
  });

  const totalCount = await prisma.products.count();

  return {
    all: totalCount,
    GD: gradeCounts.find((count) => count.grade === "GD")?._count ?? 0,
    HPLC: gradeCounts.find((count) => count.grade === "HPLC")?._count ?? 0,
    LCMS: gradeCounts.find((count) => count.grade === "LCMS")?._count ?? 0,
    PTS_DS: gradeCounts.find((count) => count.grade === "PTS-DS")?._count ?? 0,
  };
}

// export async function fetchProducts(): Promise<ProductTableRow[]> {
//   const products = await prisma.products.findMany({
//     select: {
//       product_id: true,
//       name: true,
//       sku: true,
//       grade: true,
//       raw_materials: {
//         select: {
//           cas_number: true,
//         },
//       },
//     },
//   });

//   return products.map((product) => {
//     // console.log(product.grade);
//     return {
//       ...product,
//       cas_number: product.raw_materials?.cas_number ?? "",
//     };
//   });
// }

// export async function fetchProducts(
//   options?: FetchProductsOptions
// ): Promise<ProductTableRow[]> {
//   const { grade, limit, offset } = options ?? {};

//   const where: prisma.productsWhereInput = {
//     ...(grade && { grade }),
//   };

//   const products = await prisma.products.findMany({
//     where,
//     take: limit,
//     skip: offset,
//     select: {
//       product_id: true,
//       name: true,
//       sku: true,
//       grade: true,
//       raw_materials: {
//         select: {
//           cas_number: true,
//         },
//       },
//     },
//   });

//   return products.map((product) => ({
//     ...product,
//     cas_number: product.raw_materials?.cas_number ?? "",
//   }));
// }

// export async function fetchProductById(productId: number) {
//   return prisma.products.findUnique({
//     where: { product_id: productId },
//     select: {
//       // ... selection
//     },
//   });
// }

// database/repositories/index.ts
