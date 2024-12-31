import { prisma } from "@/lib/prisma";
import { ProductRow } from "@/types/products";

export async function fetchProducts(): Promise<ProductRow[]> {
  const products = await prisma.products.findMany({
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
