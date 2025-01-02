"use server";

import { prisma } from "@/database/client";
import { GRADE } from "@/types/database/products";

/*
SQL Equivalent:
SELECT COUNT(*) FROM products WHERE grade = $1;
*/
export async function countProductsByGrade(grade: GRADE): Promise<number> {
  const count = await prisma.products.count({
    where: {
      grade,
    },
  });
  return count;
}

export async function countAllProducts(): Promise<number> {
  const count = await prisma.products.count();
  return count;
}
