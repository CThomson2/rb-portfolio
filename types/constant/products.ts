export const Grade = {
  GD: "GD",
  HPLC: "HPLC",
  LCMS: "LCMS",
  PTS_DS: "PTS-DS",
} as const;

export type GradeType = (typeof Grade)[keyof typeof Grade];

export const StockLevel = {
  LOW_STOCK: "LOW_STOCK",
  IN_STOCK: "IN_STOCK",
  SURPLUS: "SURPLUS",
} as const;

export type StockLevelType = (typeof StockLevel)[keyof typeof StockLevel];
