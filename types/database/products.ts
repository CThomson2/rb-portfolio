// Database Types
// types/database/products.ts
import { Decimal } from "@prisma/client/runtime/library";
import { GradeType } from "@/types/constant/public/products";

// Base product type that mirrors your database schema
export interface BaseProduct {
  product_id: number;
  name: string;
  sku: string;
  grade: GradeType;
}

export interface ProductTableRow extends BaseProduct {
  cas_number: string;
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

export interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductWithPrices | null;
}

export interface FilterOption {
  label: string;
  value: string;
}
