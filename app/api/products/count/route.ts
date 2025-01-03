import { NextApiRequest, NextApiResponse } from "next";
import {
  countProductsByGrade,
  countAllProducts,
} from "@/lib/products/countProductsByGrade";
import { GRADE } from "@/types/database/products";
import { productRepository } from "@/database/repositories";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const counts = await productRepository.getProductCounts();
    return NextResponse.json(counts);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch product counts" },
      { status: 500 }
    );
  }
}

/*
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { grade } = req.query;

  console.log("Received grade:", grade);

  if (!grade) {
    try {
      const count = await countAllProducts();
      res.status(200).json({ count });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product count" });
    }
  }
  if (!VALID_GRADES.includes(grade as (typeof VALID_GRADES)[number])) {
    return res.status(400).json({ error: "Invalid grade" });
  }

  try {
    const count = await countProductsByGrade(grade as GRADE);
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product count" });
  }
}
*/
