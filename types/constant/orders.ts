// OrderStatus is a const object with literal string values, made immutable with 'as const'
// Type: { readonly PENDING: "pending", readonly PARTIAL: "partial", readonly COMPLETE: "complete" }
export const OrderStatus = {
  PENDING: "pending",
  PARTIAL: "partial",
  COMPLETE: "complete",
} as const;

// OrderStatusType extracts the literal string union type from OrderStatus values
// Type: "pending" | "partial" | "complete"
export type OrderStatusType = (typeof OrderStatus)[keyof typeof OrderStatus];

// OrderStatusOptions is an array of the string literal values
// Type: readonly ["pending", "partial", "complete"]
export const OrderStatusOptions = Object.values(OrderStatus);

// TODO: Combine these files from /types/constant/* into their respective files in /types/database/*
