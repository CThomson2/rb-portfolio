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

export const TransactionSource = {
  DELIVERY: "delivery",
  DRUM: "drum",
  REPROCESS: "reprocess",
} as const;

export type TransactionSourceType =
  (typeof TransactionSource)[keyof typeof TransactionSource];

export const TransactionSourceOptions = Object.values(TransactionSource);

// const map for select options for `process_id`, where options displayed are the distillation unit code names i.e. "A", "B", "C", etc.
export const Stills = {
  // Old site - Hydrocarbons
  A: "A",
  B: "B",
  C: "C",
  D: "D",
  E: "E",
  F: "F",
  // Old site - CS2 Still
  G: "G",
  // New site - High Powered
  M: "M",
  P: "P",
  Q: "Q",
  R: "R",
  S: "S",
  // New site - Water Distillation Lab
  T: "T",
  W: "W",
} as const;

export type StillsType = (typeof Stills)[keyof typeof Stills];
