export const initials = {
  CK: "CK", // Colin Kerr
  AN: "AN", // Alistair Nottman
  JK: "JK", // Julie Kerr
  Cx: "Cx", // Craig [find surname]
  Hx: "Hx", // Heather [find surname]
  RS: "RS", // Roddy Stoddart
  // remaining lab technicians
};

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
