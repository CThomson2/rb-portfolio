// Database Types
// types/database/products.ts
import { Decimal } from "@prisma/client/runtime/library";

export enum GRADE {
  GD = "GD",
  HPLC = "HPLC",
  LCMS = "LCMS",
  PTS_DS = "PTS-DS",
}

export const enum STOCK_LEVEL {
  LOW_STOCK = "LOW_STOCK",
  IN_STOCK = "IN_STOCK",
  SURPLUS = "SURPLUS",
}

// Base product type that mirrors your database schema
export interface BaseProduct {
  product_id: number;
  name: string;
  sku: string;
  grade: string;
}

// Extended product type with prices (result of JOIN)
export interface ProductWithPrices extends BaseProduct {
  product_prices: {
    bottle_sizes: {
      id: number;
      volume: string;
    };
    product_id: number;
    bottle_size_id: number;
    price: Decimal;
  }[];
}
