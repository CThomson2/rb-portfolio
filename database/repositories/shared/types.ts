export const TransactionType = {
  IMPORT: "import",
  PROCESSING: "processing",
  REPROCESSING: "reprocessing",
  DISPOSAL: "disposal",
  LOSS: "loss",
} as const;

export type TransactionType =
  (typeof TransactionType)[keyof typeof TransactionType];

export const OrderStatus = {
  PENDING: "pending",
  PARTIAL: "partial",
  COMPLETE: "complete",
} as const;

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];
