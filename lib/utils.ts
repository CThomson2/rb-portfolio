import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge class names with Tailwind CSS classes.
 * Uses clsx for conditional class names and tailwind-merge to handle conflicts.
 *
 * @example
 * // Basic usage with conditional classes
 * const buttonClass = cn(
 *   "btn",
 *   isActive && "btn-active",
 *   isDisabled && "btn-disabled"
 * );
 *
 * // Using with Tailwind CSS classes
 * const combinedClass = cn(
 *   "p-4",
 *   "text-center",
 *   "bg-blue-500",
 *   "hover:bg-blue-700"
 * );
 *
 * @param inputs - An array of class values that can be strings, arrays, or objects.
 * @returns A single merged class string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
