import { NextResponse } from "next/server";
import { prisma } from "@/database/client";
import { withErrorHandler } from "@/lib/utils/withErrorHandler";

/** 1) READ (GET) */
export const GET = withErrorHandler(async (req: Request) => {
  // Example: Return all products
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
});

/** 2) CREATE (POST) */
export const POST = withErrorHandler(async (req: Request) => {
  const { searchParams } = new URL(req.url);
  // Example: Create a product with name and grade from the request body
  const { name, grade, sku } = await req.json();

  const newProduct = await prisma.products.create({
    data: {
      name: searchParams.get("name") || "[name]",
      grade: searchParams.get("grade") || "[grade]",
      sku: sku || "R_-____",
    },
  });

  return NextResponse.json({ data: newProduct }, { status: 201 });
});

/** 3) UPDATE (PATCH) */
export const PATCH = withErrorHandler(async (req: Request) => {
  const { searchParams } = new URL(req.url);
  // Example: Partial update of specific fields
  const updatedProduct = await prisma.products.update({
    where: {
      product_id: Number(searchParams.get("product_id")),
    },
    data: {
      name: searchParams.get("name") || "[name]",
      grade: searchParams.get("grade") || "[grade]",
    },
  });

  return NextResponse.json({ data: updatedProduct }, { status: 200 });
});

/** 4) DELETE (DELETE) */
export const DELETE = withErrorHandler(async (req: Request) => {
  const { searchParams } = new URL(req.url);
  // Usually, you pass an ID (in body or query) to identify what to delete
  const deletedProduct = await prisma.products.delete({
    where: {
      product_id: Number(searchParams.get("product_id")),
    },
  });

  return NextResponse.json({ data: deletedProduct });
});
