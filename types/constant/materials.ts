export const ChemicalGroup = {
  ALKANES: "Alkanes",
  ALCOHOLS: "Alcohols",
  HALOGENATED_HYDROCARBONS: "Halogenated Hydrocarbons",
  AROMATICS: "Aromatics",
  CARBOXYLIC_ACIDS: "Carboxylic Acids",
  ESTERS: "Esters",
  KETONES: "Ketones",
  AMIDES: "Amides",
  ETHERES: "Ethers",
  GLYCOLS_GLYCOL_ETHERS: "Glycols & Glycol Ethers",
  SULFUR_BASED_COMPOUNDS: "Sulfur-Based Compounds",
  AMINES: "Amines",
  HETEROCYCLIC_AMINES: "Heterocyclic Amines",
  PETROLEUM_SPIRITS: "Petroleum Spirits",
  ACID_ANHYDRIDES: "Acid Anhydrides",
  HALOGENATED_ETHERS: "Halogenated Ethers",
  HYDROCARBONS: "Hydrocarbons",
  INORGANIC_COMPOUNDS: "Inorganic Compounds",
  NITRILLES: "Nitriles",
} as const;

export type ChemicalGroupType =
  (typeof ChemicalGroup)[keyof typeof ChemicalGroup];
