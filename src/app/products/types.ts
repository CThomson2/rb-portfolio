import { Decimal } from "@prisma/client/runtime/library";

export interface Product {
  product_id: number;
  name: string;
  sku: string;
  grade: string;
}

export interface ProductPrice {
  product_id: number;
  name: string;
  sku: string;
  raw_material_id: number | null;
  grade: string;
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
