import { ChemicalGroupType } from "../constant/materials";

/*
Prisma Model:

model raw_materials {
  raw_material_id Int        @id @default(autoincrement())
  name            String     @db.VarChar(100)
  cas_number      String     @db.VarChar(20)
  chemical_group  String?    @default("Hydrocarbon") @db.VarChar(50)
  description     String?    @db.VarChar(150)
  un_code         String?    @db.Char(4)
  flash_point     Int?
  products        products[]

  @@schema("public")
}
*/
type UNDigits = `${number}${number}${number}${number}`;

type UNCode = `UN${UNDigits}` | `un${UNDigits}` | `Un${UNDigits}`;

export type RawMaterial = {
  raw_material_id: number;
  name: string;
  cas_number: string;
  chemical_group: string;
  description: string | "To be written";
  un_code?: UNCode;
  flash_point?: number;
};

export type RawMaterialPostParams = Omit<RawMaterial, "raw_material_id">;

export type RawMaterialGetAllParams = RawMaterial;
export type RawMaterialUpdateParams = Partial<RawMaterial>;
export type RawMaterialDeleteParams = Pick<RawMaterial, "raw_material_id">;

export type RawMaterialGetGroupParams = {
  group: ChemicalGroupType;
};

export type RawMaterialGetGroupResponse = {
  groups: ChemicalGroupType[];
  count: number;
};
