import { prisma } from "@/database/client";

export const uniqueProducts = async () => {
  const products = await prisma.products.findMany({
    select: {
      name: true,
    },
    distinct: ["name"],
    // Since name has a NOT NULL constraint in the database schema,
    // we don't need a null check here
  });
  return products;
};
