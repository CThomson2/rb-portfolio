import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { uniqueProducts } from "./chemicalFormula";
import { withErrorHandler } from "./withErrorHandler";
import {
  hexToRgb,
  formatCurrency,
  getTxTypeColor,
  getTxTypeVariant,
  truncate,
} from "./formatters";

// Utility function for combining Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Export all utilities
export {
  uniqueProducts,
  withErrorHandler,
  hexToRgb,
  formatCurrency,
  getTxTypeColor,
  getTxTypeVariant,
  truncate,
};
