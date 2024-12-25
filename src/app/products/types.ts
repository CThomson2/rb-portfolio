import { Decimal } from "@prisma/client/runtime/library";

export interface Product {
  product_id: number;
  name: string;
  sku: string;
  grade: string;
}
export interface ProductRow extends Product {
  cas_number: string;
}

export interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductRow | null;
}

export interface ProductPrice extends Product {
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
