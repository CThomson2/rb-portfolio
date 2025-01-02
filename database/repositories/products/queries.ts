// database/repositories/products/queries.ts
import { prisma } from "@/database/client";
import type { ProductTableRow } from "@/types/components/products";
import type { Prisma } from "@prisma/client";

interface FetchProductsOptions {
  grade?: string;
  limit?: number;
  offset?: number;
}

export async function fetchTotalProductsCount() {
  // Fetch all counts in a single query using GroupBy
  const gradeCounts = await prisma.products.groupBy({
    by: ["grade"],
    _count: {
      _all: true,
    },
  });

  const totalCount = await prisma.products.count();

  return {
    all: totalCount,
    GD: gradeCounts.find((count) => count.grade === "GD") ?? 0,
    HPLC: gradeCounts.find((count) => count.grade === "HPLC") ?? 0,
    LCMS: gradeCounts.find((count) => count.grade === "LCMS") ?? 0,
  };
}

export async function fetchProducts(
  options?: FetchProductsOptions
): Promise<ProductTableRow[]> {
  const { grade, limit, offset } = options ?? {};

  const where: Prisma.productsWhereInput = {
    ...(grade && { grade }),
  };

  const products = await prisma.products.findMany({
    where,
    take: limit,
    skip: offset,
    select: {
      product_id: true,
      name: true,
      sku: true,
      grade: true,
      raw_materials: {
        select: {
          cas_number: true,
        },
      },
    },
  });

  return products.map((product) => ({
    ...product,
    cas_number: product.raw_materials?.cas_number ?? "",
  }));
}

export async function fetchProductById(productId: number) {
  return prisma.products.findUnique({
    where: { product_id: productId },
    select: {
      // ... selection
    },
  });
}

// database/repositories/index.ts
