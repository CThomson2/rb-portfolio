export const OrderStatus = {
  PENDING: "pending",
  PARTIAL: "partial",
  COMPLETE: "complete",
} as const;

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];
