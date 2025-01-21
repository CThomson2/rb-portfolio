import { prisma } from "@/database/client";
import { ProductTableRow } from "@/types/components/products";

export async function fetchProducts(): Promise<ProductTableRow[]> {
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

  return products.map((product) => {
    // console.log(product.grade);
    return {
      ...product,
      cas_number: product.raw_materials?.cas_number ?? "",
    };
  });
}
