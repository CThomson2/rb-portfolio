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

// TODO: Add a list of products that we sell from database
// Each product should have a name, description, chemical group, grade[], location of storage and nested object for bottle sizes and correponding prices
// E.g.
/*
export const productList = [
  {
    name: "Methanol",
    sourceMaterial: "Methanol",
    formula: "CH3OH",
    chemicalGroup: "Alcohols",
    grade: ["GD", "HPLC", "LCMS"],
    storageLocations: ["N1"],
    prices: {
      "0.5L": 5.00,
      "1L": 10.00,
      "2.5L": 20.00,
    },
  },
  {
    name: "Acetonitrile",
    sourceMaterial: "Acetonitrile",
    formula: "CH3CN",
    chemicalGroup: "Nitriles",
    grade: ["GD", "HPLC", "LCMS", "PTS-DS", "HPLC Special"],
    storageLocations: ["OF1", "OF2"],
    prices: {
      "1L": 14.00,
      "2.5L": 30.00,
    },
  },
  {
    name: "Glacial Acetic Acid",
    sourceMaterial: "Acetic Acid",
    formula: "CH3COOH",
    chemicalGroup: "Carboxylic Acids",
    grade: ["GD", "HPLC"],
    storageLocations: ["N2"],
    prices: {
      "1L": 14.00,
      "2.5L": 30.00,
    },
  },
  ... etc.
];
*/
