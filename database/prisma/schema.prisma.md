generator client {
provider = "prisma-client-js"
output = "./generated/public-client"
previewFeatures = ["multiSchema"]
}

datasource db {
provider = "postgresql"
url = env("DATABASE_URL")
schemas = ["inventory", "public"]
}

model bottle_sizes {
id Int @id @default(autoincrement())
volume String @db.VarChar(10)
product_prices product_prices[]

@@schema("public")
}

model chemical_groups {
group_id Int @id @default(autoincrement())
name String @db.VarChar(30)

@@schema("public")
}

model product_prices {
product_id Int
bottle_size_id Int
price Decimal @db.Decimal(10, 2)
bottle_sizes bottle_sizes @relation(fields: [bottle_size_id], references: [id], onDelete: NoAction, onUpdate: NoAction, map: "fk_bottle_size")
products products @relation(fields: [product_id], references: [product_id], onDelete: NoAction, onUpdate: NoAction, map: "fk_product")

@@id([product_id, bottle_size_id])
@@schema("public")
}

model products {
product_id Int @id @default(autoincrement())
name String @db.VarChar(50)
sku String @unique(map: "product_sku_key") @db.VarChar(20)
raw_material_id Int?
grade String @db.VarChar(10)
product_prices product_prices[]
raw_materials raw_materials? @relation(fields: [raw_material_id], references: [raw_material_id], onDelete: NoAction, onUpdate: NoAction, map: "fk_raw_material")

@@schema("public")
}

model raw_materials {
raw_material_id Int @id @default(autoincrement())
name String @db.VarChar(100)
cas_number String @db.VarChar(20)
chemical_group String? @default("Hydrocarbon") @db.VarChar(50)
description String? @db.VarChar(150)
un_code String? @db.Char(4)
flash_point Int?
products products[]

@@schema("public")
}

/// This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
model batches {
batch_id Int @id(map: "internal_batches_pkey") @default(autoincrement())
distillation_id Int?
creation_date DateTime? @default(dbgenerated("CURRENT_DATE")) @db.Date
batch_code String? @unique(map: "internal_batches_batch_code_key") @db.VarChar(50)
grade String? @db.VarChar(5)
quantity Decimal? @db.Decimal
created_at DateTime? @default(now()) @db.Timestamptz(6)
updated_at DateTime? @default(now()) @db.Timestamptz(6)
distillations distillations? @relation(fields: [distillation_id], references: [distillation_id], onDelete: NoAction, onUpdate: NoAction, map: "internal_batches_distillation_id_fkey")

@@schema("inventory")
}

model deliveries {
delivery_id Int @id(map: "drum_deliveries_pkey") @default(autoincrement())
order_id Int?
quantity_received Int
date_received DateTime @default(dbgenerated("CURRENT_DATE")) @db.Date
batch_code String? @db.VarChar(50)
location String? @db.VarChar(15)
delivery_notes String?
created_at DateTime? @default(now()) @db.Timestamptz(6)
updated_at DateTime? @default(now()) @db.Timestamptz(6)
orders orders? @relation(fields: [order_id], references: [order_id], onDelete: NoAction, onUpdate: NoAction)
transactions transactions[]

@@unique([order_id, batch_code], map: "unique_order_batch")
@@schema("inventory")
}

model [distillations](#daily-production-sheet) {
distillation_id Int @id @default(autoincrement())
loading_date DateTime? @default(dbgenerated("CURRENT_DATE")) @db.Date
start_date DateTime? @db.Date
still_code String? @db.Char(1)
volume_in Decimal? @default(200) @db.Decimal
transporter String? @db.Char(2)
loader String? @db.Char(2)
operator String? @db.Char(2)
completion_date DateTime? @db.Date
volume_in_spec Decimal? @default(0) @db.Decimal
volume_repro Decimal? @default(0) @db.Decimal
created_at DateTime? @default(now()) @db.Timestamptz(6)
updated_at DateTime? @default(now()) @db.Timestamptz(6)
batches batches[]
drum_distillations drum_distillations[]
repro_additions repro_additions[]

@@schema("inventory")
}

/// This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
model drum_distillations {
drum_id Int
distillation_id Int
fraction_used Decimal @default(1) @db.Decimal
distillations distillations @relation(fields: [distillation_id], references: [distillation_id], onDelete: NoAction, onUpdate: NoAction)
new_drums new_drums @relation(fields: [drum_id], references: [drum_id], onDelete: NoAction, onUpdate: NoAction)

@@id([drum_id, distillation_id])
@@schema("inventory")
}

/// This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
model imports {
import_id Int @id @default(autoincrement())
supplier_name String @db.VarChar(100)
material_type String @db.VarChar(100)
quantity Int
supplier_batch_code String? @unique(map: "unique_supplier_batch_code") @db.VarChar(50)
date_ordered DateTime? @db.Date
date_received DateTime @db.Date
created_at DateTime? @default(now()) @db.Timestamptz(6)
updated_at DateTime? @default(now()) @db.Timestamptz(6)
notes String? @db.VarChar(100)
location String? @db.VarChar(10)

@@schema("inventory")
}

model new_drums {
drum_id Int @id(map: "drums_pkey") @default(autoincrement())
import_id Int?
material_type String @db.VarChar(100)
date_processed DateTime? @db.Date
status String @default("available") @db.VarChar(20)
location String? @default("new-site") @db.VarChar(20)
created_at DateTime? @default(now()) @db.Timestamptz(6)
updated_at DateTime? @default(now()) @db.Timestamptz(6)
order_id Int?
drum_distillations drum_distillations[]
orders orders? @relation(fields: [order_id], references: [order_id], onDelete: NoAction, onUpdate: NoAction)
processes processes[]
transactions transactions[]

@@index([material_type], map: "idx_drums_material_type")
@@index([status], map: "idx_drums_status")
@@schema("inventory")
}

model orders {
order_id Int @id @default(autoincrement())
supplier String @db.VarChar(100)
material String @db.VarChar(100)
quantity Int
date_ordered DateTime? @default(dbgenerated("CURRENT_DATE")) @db.Date
notes String?
created_at DateTime? @default(now()) @db.Timestamptz(6)
updated_at DateTime? @default(now()) @db.Timestamptz(6)
quantity_received Int @default(0)
status String @default("pending") @db.VarChar(20)
deliveries deliveries[]
new_drums new_drums[]

@@schema("inventory")
}

model processes {
process_id Int @id(map: "records_pkey") @default(autoincrement())
material_type String? @db.VarChar(100)
drum_id Int?
supplier String? @db.VarChar(100)
still_code String @db.Char
operator String? @db.VarChar(10)
loader String? @db.VarChar(10)
transporter String? @db.VarChar(10)
date_processed DateTime? @db.Timestamp(6)
new_drums new_drums? @relation(fields: [drum_id], references: [drum_id], onDelete: NoAction, onUpdate: NoAction, map: "records_drum_id_fkey")
stills stills @relation(fields: [still_code], references: [code], onDelete: NoAction, onUpdate: NoAction, map: "records_still_code_fkey")
transactions transactions[]

@@schema("inventory")
}

model repro_additions {
addition_id Int @id @default(autoincrement())
repro_drum_id Int?
distillation_id Int?
date_added DateTime? @default(dbgenerated("CURRENT_DATE")) @db.Date
volume_added Int
volume_in_drum Int
created_at DateTime? @default(now()) @db.Timestamptz(6)
updated_at DateTime? @default(now()) @db.Timestamptz(6)
distillations distillations? @relation(fields: [distillation_id], references: [distillation_id], onDelete: NoAction, onUpdate: NoAction)
repro_drums repro_drums? @relation(fields: [repro_drum_id], references: [repro_drum_id], onDelete: NoAction, onUpdate: NoAction)

### Daily Production Sheet

@@schema("inventory")
}

model repro_drums {
repro_drum_id Int @id @default(autoincrement())
date_created DateTime @default(dbgenerated("CURRENT_DATE")) @db.Date
material_type String @db.VarChar(100)
capacity Int @default(200)
current_volume Int @default(0)
created_at DateTime? @default(now()) @db.Timestamptz(6)
updated_at DateTime? @default(now()) @db.Timestamptz(6)
status String @default("available") @db.VarChar(20)
volume_status String @default("partial") @db.VarChar(20)
drum_code String? @db.VarChar(20)
location String? @default("TBD") @db.VarChar(20)
repro_additions repro_additions[]
transactions transactions[]

@@index([material_type], map: "idx_repro_drums_material_type")
@@index([status], map: "idx_repro_drums_status")
@@index([volume_status], map: "idx_repro_drums_volume_status")
@@schema("inventory")
}

/// This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
model transactions {
tx_id Int @id @default(autoincrement())
tx_type String @db.VarChar(20)
tx_date DateTime @default(dbgenerated("CURRENT_DATE")) @db.Date
material String? @db.VarChar(100)
drum_id Int?
repro_id Int?
tx_notes String?
created_at DateTime? @default(now()) @db.Timestamptz(6)
updated_at DateTime? @default(now()) @db.Timestamptz(6)
process_id Int?
direction String? @default(dbgenerated("\nCASE tx_type\n WHEN 'intake'::text THEN 'IN'::text\n WHEN 'processing'::text THEN 'OUT'::text\n WHEN 'reprocessing'::text THEN 'OUT'::text\n WHEN 'disposal'::text THEN 'OUT'::text\n WHEN 'loss'::text THEN 'OUT'::text\n ELSE NULL::text\nEND")) @db.VarChar(3)
delivery_id Int?
batch_code String? @db.VarChar(50)
deliveries deliveries? @relation(fields: [delivery_id], references: [delivery_id], onDelete: NoAction, onUpdate: NoAction)
new_drums new_drums? @relation(fields: [drum_id], references: [drum_id], onDelete: NoAction, onUpdate: NoAction)
processes processes? @relation(fields: [process_id], references: [process_id], onDelete: NoAction, onUpdate: NoAction)
repro_drums repro_drums? @relation(fields: [repro_id], references: [repro_drum_id], onDelete: NoAction, onUpdate: NoAction)

@@schema("inventory")
}

/// This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
model stills {
code String @id @unique(map: "stills_still_code_key") @db.Char
site String @db.Char(2)
power Int
capacity Int
is_vacuum Boolean? @default(false)
is_operational Boolean? @default(true)
processes processes[]

@@schema("inventory")
}
