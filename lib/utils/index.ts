import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Converts a hex color code (e.g. #FF0000) to RGB format (e.g. 255, 0, 0)
// The regex pattern matches:
// ^#? - Optional # at start
// ([a-f\d]{2}) - Captures 2 characters that are either a-f or digits (red)
// ([a-f\d]{2}) - Captures 2 characters that are either a-f or digits (green)
// ([a-f\d]{2}) - Captures 2 characters that are either a-f or digits (blue)
// Each captured pair is converted from base 16 (hex) to decimal
export function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
        result[3],
        16
      )}`
    : null;
}

// Helper function to format currency values
function formatCurrency(amount: number) {
  if (amount >= 1000) {
    return `US$ ${(amount / 1000).toFixed(1)}k`;
  }
  return `US$ ${amount}`;
}
