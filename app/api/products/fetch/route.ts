import { NextResponse } from "next/server";
import { prisma } from "@/database/client";

export async function GET(request: Request) {
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

  return NextResponse.json(
    products.map((product) => {
      const { raw_materials, ...rest } = product;
      return {
        ...rest,
        cas_number: raw_materials?.cas_number ?? "",
      };
    })
  );
}
