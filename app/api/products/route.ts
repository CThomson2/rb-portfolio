import { NextResponse } from "next/server";
import { prisma } from "@/database/client";
import { Prisma } from "@/database/prisma/generated/public-client";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  try {
    switch (req.method) {
      /** 1) READ (GET) */
      case "GET": {
        // Example: Return all products
        const products = await prisma.products.findMany();
        return NextResponse.json({ data: products }, { status: 200 });
      }

      /** 2) CREATE (POST) */
      case "POST": {
        // Example: Create a product with name and grade from the request body
        // Destructure fields from req.body or do full validation
        const { name, grade, sku } = await req.json();

        const newProduct = await prisma.products.create({
          data: {
            name: searchParams.get("name") || "[name]",
            grade: searchParams.get("grade") || "[grade]",
            sku: sku || "R_-____",
          },
        });

        return NextResponse.json({ data: newProduct }, { status: 201 });
      }

      /** 3) UPDATE (PATCH) */
      case "PATCH": {
        // Example: Partial update of specific fields
        // This snippet is optional, only if you choose to handle PATCH
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
      }

      /** 4) DELETE (DELETE) */
      case "DELETE": {
        // Usually, you pass an ID (in body or query) to identify what to delete
        const deletedProduct = await prisma.products.delete({
          where: {
            product_id: Number(searchParams.get("product_id")),
          },
        });

        return NextResponse.json({ data: deletedProduct });
      }

      default:
        return NextResponse.json(
          { error: "Method not allowed" },
          { status: 405 }
        );
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // PostgreSQL error messages are in error.message
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
