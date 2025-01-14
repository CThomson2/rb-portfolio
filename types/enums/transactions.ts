// const map for transaction types
export const TransactionVariant = {
  IMPORT: "import",
  PROCESSING: "processing",
  REPROCESSING: "reprocessing",
  DISPOSAL: "disposal",
  LOSS: "loss",
} as const;

export type TransactionVariantType =
  (typeof TransactionVariant)[keyof typeof TransactionVariant];
