import type { BaseProduct, ProductWithPrices } from "@/types/database/products";

export interface ProductTableRow extends BaseProduct {
  cas_number: string;
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
