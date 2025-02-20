// const map for transaction types
export const TransactionVariant = {
  INTAKE: "intake",
  SCHEDULED: "scheduled",
  LOADED: "loaded",
  PROCESSED: "processed",
  FAILED: "failed",
  REQUEUED: "requeued",
  DISPOSED: "disposed",
  LOST: "lost",
  CANCELLED: "cancelled",
} as const;

export type TransactionVariantType =
  (typeof TransactionVariant)[keyof typeof TransactionVariant];

export const TransactionSource = {
  DELIVERY: "delivery",
  DRUM: "drum",
  REPROCESS: "reprocess",
} as const;

export type TransactionSourceType =
  (typeof TransactionSource)[keyof typeof TransactionSource];

export const TransactionSourceOptions = Object.values(TransactionSource);

// const map for select options for `process_id`, where options displayed are the distillation unit code names i.e. "A", "B", "C", etc.
