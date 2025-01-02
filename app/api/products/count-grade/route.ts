import { NextApiRequest, NextApiResponse } from "next";
import {
  countProductsByGrade,
  countAllProducts,
} from "@/lib/products/countProductsByGrade";
import { GRADE } from "@/types/database/products";
import { prisma } from "@/database/client";

// Since GRADE is a const enum, we need to handle it as a type rather than an object
// Create a const array of valid grades to check against
const VALID_GRADES = ["GD", "HPLC", "LCMS", "PTS_DS"] as const;

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
