
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime
} = require('./runtime/edge.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.2.1
 * Query Engine version: 4123509d24aa4dede1e864b46351bf2790323b69
 */
Prisma.prismaVersion = {
  client: "6.2.1",
  engine: "4123509d24aa4dede1e864b46351bf2790323b69"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}





/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.Bottle_sizesScalarFieldEnum = {
  id: 'id',
  volume: 'volume'
};

exports.Prisma.Chemical_groupsScalarFieldEnum = {
  group_id: 'group_id',
  name: 'name'
};

exports.Prisma.Product_pricesScalarFieldEnum = {
  product_id: 'product_id',
  bottle_size_id: 'bottle_size_id',
  price: 'price'
};

exports.Prisma.ProductsScalarFieldEnum = {
  product_id: 'product_id',
  name: 'name',
  sku: 'sku',
  raw_material_id: 'raw_material_id',
  grade: 'grade'
};

exports.Prisma.Raw_materialsScalarFieldEnum = {
  raw_material_id: 'raw_material_id',
  name: 'name',
  cas_number: 'cas_number',
  chemical_group: 'chemical_group',
  description: 'description',
  un_code: 'un_code',
  flash_point: 'flash_point'
};

exports.Prisma.BatchesScalarFieldEnum = {
  batch_id: 'batch_id',
  distillation_id: 'distillation_id',
  creation_date: 'creation_date',
  batch_code: 'batch_code',
  grade: 'grade',
  quantity: 'quantity',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.DeliveriesScalarFieldEnum = {
  delivery_id: 'delivery_id',
  order_id: 'order_id',
  quantity_received: 'quantity_received',
  date_received: 'date_received',
  batch_code: 'batch_code',
  location: 'location',
  delivery_notes: 'delivery_notes',
  created_at: 'created_at',
  updated_at: 'updated_at',
  is_finalised: 'is_finalised'
};

exports.Prisma.DistillationsScalarFieldEnum = {
  distillation_id: 'distillation_id',
  loading_date: 'loading_date',
  start_date: 'start_date',
  still_code: 'still_code',
  volume_in: 'volume_in',
  transporter: 'transporter',
  loader: 'loader',
  operator: 'operator',
  completion_date: 'completion_date',
  volume_in_spec: 'volume_in_spec',
  volume_repro: 'volume_repro',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Drum_distillationsScalarFieldEnum = {
  drum_id: 'drum_id',
  distillation_id: 'distillation_id',
  fraction_used: 'fraction_used'
};

exports.Prisma.ImportsScalarFieldEnum = {
  import_id: 'import_id',
  supplier_name: 'supplier_name',
  material_type: 'material_type',
  quantity: 'quantity',
  supplier_batch_code: 'supplier_batch_code',
  date_ordered: 'date_ordered',
  date_received: 'date_received',
  created_at: 'created_at',
  updated_at: 'updated_at',
  notes: 'notes',
  location: 'location'
};

exports.Prisma.New_drumsScalarFieldEnum = {
  drum_id: 'drum_id',
  material: 'material',
  date_processed: 'date_processed',
  status: 'status',
  location: 'location',
  created_at: 'created_at',
  updated_at: 'updated_at',
  order_id: 'order_id'
};

exports.Prisma.OrdersScalarFieldEnum = {
  order_id: 'order_id',
  supplier: 'supplier',
  material: 'material',
  quantity: 'quantity',
  date_ordered: 'date_ordered',
  notes: 'notes',
  created_at: 'created_at',
  updated_at: 'updated_at',
  quantity_received: 'quantity_received',
  delivery_status: 'delivery_status',
  eta_start: 'eta_start',
  eta_end: 'eta_end'
};

exports.Prisma.ProcessesScalarFieldEnum = {
  process_id: 'process_id',
  material: 'material',
  drum_id: 'drum_id',
  supplier: 'supplier',
  still_code: 'still_code',
  operator: 'operator',
  loader: 'loader',
  transporter: 'transporter',
  date_processed: 'date_processed'
};

exports.Prisma.Repro_additionsScalarFieldEnum = {
  addition_id: 'addition_id',
  repro_drum_id: 'repro_drum_id',
  distillation_id: 'distillation_id',
  date_added: 'date_added',
  volume_added: 'volume_added',
  volume_in_drum: 'volume_in_drum',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Repro_drumsScalarFieldEnum = {
  repro_drum_id: 'repro_drum_id',
  date_created: 'date_created',
  material: 'material',
  capacity: 'capacity',
  current_volume: 'current_volume',
  created_at: 'created_at',
  updated_at: 'updated_at',
  status: 'status',
  volume_status: 'volume_status',
  notes: 'notes',
  location: 'location'
};

exports.Prisma.TransactionsScalarFieldEnum = {
  tx_id: 'tx_id',
  tx_type: 'tx_type',
  tx_date: 'tx_date',
  material: 'material',
  drum_id: 'drum_id',
  repro_id: 'repro_id',
  tx_notes: 'tx_notes',
  created_at: 'created_at',
  updated_at: 'updated_at',
  process_id: 'process_id',
  direction: 'direction',
  delivery_id: 'delivery_id',
  batch_code: 'batch_code',
  order_id: 'order_id'
};

exports.Prisma.StillScalarFieldEnum = {
  code: 'code',
  site: 'site',
  power: 'power',
  capacity: 'capacity',
  isVacuum: 'isVacuum',
  isOperational: 'isOperational'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  bottle_sizes: 'bottle_sizes',
  chemical_groups: 'chemical_groups',
  product_prices: 'product_prices',
  products: 'products',
  raw_materials: 'raw_materials',
  batches: 'batches',
  deliveries: 'deliveries',
  distillations: 'distillations',
  drum_distillations: 'drum_distillations',
  imports: 'imports',
  new_drums: 'new_drums',
  orders: 'orders',
  processes: 'processes',
  repro_additions: 'repro_additions',
  repro_drums: 'repro_drums',
  transactions: 'transactions',
  Still: 'Still'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "/Users/conrad/Documents/portfolio/database/prisma/generated/public-client",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "darwin-arm64",
        "native": true
      }
    ],
    "previewFeatures": [
      "multiSchema"
    ],
    "sourceFilePath": "/Users/conrad/Documents/portfolio/database/prisma/schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null
  },
  "relativePath": "../..",
  "clientVersion": "6.2.1",
  "engineVersion": "4123509d24aa4dede1e864b46351bf2790323b69",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "generator client {\n  provider        = \"prisma-client-js\"\n  output          = \"./generated/public-client\"\n  previewFeatures = [\"multiSchema\"]\n}\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n  schemas  = [\"inventory\", \"public\"]\n}\n\nmodel bottle_sizes {\n  id             Int              @id @default(autoincrement())\n  volume         String           @db.VarChar(10)\n  product_prices product_prices[]\n\n  @@schema(\"public\")\n}\n\nmodel chemical_groups {\n  group_id Int    @id @default(autoincrement())\n  name     String @db.VarChar(30)\n\n  @@schema(\"public\")\n}\n\nmodel product_prices {\n  product_id     Int\n  bottle_size_id Int\n  price          Decimal      @db.Decimal(10, 2)\n  bottle_sizes   bottle_sizes @relation(fields: [bottle_size_id], references: [id], onDelete: NoAction, onUpdate: NoAction, map: \"fk_bottle_size\")\n  products       products     @relation(fields: [product_id], references: [product_id], onDelete: NoAction, onUpdate: NoAction, map: \"fk_product\")\n\n  @@id([product_id, bottle_size_id])\n  @@schema(\"public\")\n}\n\nmodel products {\n  product_id      Int              @id @default(autoincrement())\n  name            String           @db.VarChar(50)\n  sku             String           @unique(map: \"product_sku_key\") @db.VarChar(20)\n  raw_material_id Int?\n  grade           String           @db.VarChar(10)\n  product_prices  product_prices[]\n  raw_materials   raw_materials?   @relation(fields: [raw_material_id], references: [raw_material_id], onDelete: NoAction, onUpdate: NoAction, map: \"fk_raw_material\")\n\n  @@schema(\"public\")\n}\n\nmodel raw_materials {\n  raw_material_id Int        @id @default(autoincrement())\n  name            String     @db.VarChar(100)\n  cas_number      String     @db.VarChar(20)\n  chemical_group  String?    @default(\"Hydrocarbon\") @db.VarChar(50)\n  description     String?    @db.VarChar(150)\n  un_code         String?    @db.Char(4)\n  flash_point     Int?\n  products        products[]\n\n  @@schema(\"public\")\n}\n\n/// This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.\nmodel batches {\n  batch_id        Int            @id(map: \"internal_batches_pkey\") @default(autoincrement())\n  distillation_id Int?\n  creation_date   DateTime?      @default(dbgenerated(\"CURRENT_DATE\")) @db.Date\n  batch_code      String?        @unique(map: \"internal_batches_batch_code_key\") @db.VarChar(50)\n  grade           String?        @db.VarChar(5)\n  quantity        Decimal?       @db.Decimal\n  created_at      DateTime?      @default(now()) @db.Timestamptz(6)\n  updated_at      DateTime?      @default(now()) @db.Timestamptz(6)\n  distillations   distillations? @relation(fields: [distillation_id], references: [distillation_id], onDelete: NoAction, onUpdate: NoAction, map: \"internal_batches_distillation_id_fkey\")\n\n  @@schema(\"inventory\")\n}\n\nmodel deliveries {\n  delivery_id       Int            @id(map: \"drum_deliveries_pkey\") @default(autoincrement())\n  order_id          Int\n  quantity_received Int?           @default(0)\n  date_received     DateTime       @default(dbgenerated(\"CURRENT_DATE\")) @db.Date\n  batch_code        String?        @db.VarChar(50)\n  location          String         @default(\"new-site\") @db.VarChar(15)\n  delivery_notes    String?\n  created_at        DateTime       @default(now()) @db.Timestamptz(6)\n  updated_at        DateTime       @default(now()) @db.Timestamptz(6)\n  is_finalised      Boolean        @default(false)\n  orders            orders         @relation(fields: [order_id], references: [order_id], onDelete: NoAction, onUpdate: NoAction)\n  transactions      transactions[]\n\n  @@unique([order_id, batch_code], map: \"unique_order_batch\")\n  @@schema(\"inventory\")\n}\n\nmodel distillations {\n  distillation_id    Int                  @id @default(autoincrement())\n  loading_date       DateTime?            @default(dbgenerated(\"CURRENT_DATE\")) @db.Date\n  start_date         DateTime?            @db.Date\n  still_code         String?              @db.Char(1)\n  volume_in          Decimal?             @default(200) @db.Decimal\n  transporter        String?              @db.Char(2)\n  loader             String?              @db.Char(2)\n  operator           String?              @db.Char(2)\n  completion_date    DateTime?            @db.Date\n  volume_in_spec     Decimal?             @default(0) @db.Decimal\n  volume_repro       Decimal?             @default(0) @db.Decimal\n  created_at         DateTime?            @default(now()) @db.Timestamptz(6)\n  updated_at         DateTime?            @default(now()) @db.Timestamptz(6)\n  batches            batches[]\n  drum_distillations drum_distillations[]\n  repro_additions    repro_additions[]\n\n  @@schema(\"inventory\")\n}\n\n/// This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.\nmodel drum_distillations {\n  drum_id         Int\n  distillation_id Int\n  fraction_used   Decimal       @default(1) @db.Decimal\n  distillations   distillations @relation(fields: [distillation_id], references: [distillation_id], onDelete: NoAction, onUpdate: NoAction)\n  new_drums       new_drums     @relation(fields: [drum_id], references: [drum_id], onDelete: NoAction, onUpdate: NoAction)\n\n  @@id([drum_id, distillation_id])\n  @@schema(\"inventory\")\n}\n\n/// This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.\nmodel imports {\n  import_id           Int       @id @default(autoincrement())\n  supplier_name       String    @db.VarChar(100)\n  material_type       String    @db.VarChar(100)\n  quantity            Int\n  supplier_batch_code String?   @unique(map: \"unique_supplier_batch_code\") @db.VarChar(50)\n  date_ordered        DateTime? @db.Date\n  date_received       DateTime  @db.Date\n  created_at          DateTime? @default(now()) @db.Timestamptz(6)\n  updated_at          DateTime? @default(now()) @db.Timestamptz(6)\n  notes               String?   @db.VarChar(100)\n  location            String?   @db.VarChar(10)\n\n  @@schema(\"inventory\")\n}\n\nmodel new_drums {\n  drum_id            Int                  @id(map: \"drums_pkey\") @default(autoincrement())\n  material           String               @db.VarChar(100)\n  date_processed     DateTime?            @db.Date\n  status             String               @default(\"pending\") @db.VarChar(20)\n  location           String?              @default(\"new-site\") @db.VarChar(20)\n  created_at         DateTime?            @default(now()) @db.Timestamptz(6)\n  updated_at         DateTime?            @default(now()) @db.Timestamptz(6)\n  order_id           Int?\n  drum_distillations drum_distillations[]\n  orders             orders?              @relation(fields: [order_id], references: [order_id], onDelete: Cascade, onUpdate: NoAction)\n  processes          processes[]\n  transactions       transactions[]\n\n  @@index([material], map: \"idx_drums_material_type\")\n  @@index([status], map: \"idx_drums_status\")\n  @@schema(\"inventory\")\n}\n\nmodel orders {\n  order_id          Int          @id @default(autoincrement())\n  supplier          String       @db.VarChar(100)\n  material          String       @db.VarChar(100)\n  quantity          Int\n  date_ordered      DateTime?    @default(dbgenerated(\"CURRENT_DATE\")) @db.Date\n  notes             String?\n  created_at        DateTime?    @default(now()) @db.Timestamptz(6)\n  updated_at        DateTime?    @default(now()) @db.Timestamptz(6)\n  quantity_received Int          @default(0)\n  delivery_status   String       @default(\"pending\") @db.VarChar(20)\n  eta_start         DateTime?    @db.Date\n  eta_end           DateTime?    @db.Date\n  deliveries        deliveries[]\n  new_drums         new_drums[]\n\n  @@schema(\"inventory\")\n}\n\nmodel processes {\n  process_id     Int            @id(map: \"records_pkey\") @default(autoincrement())\n  material       String?        @db.VarChar(100)\n  drum_id        Int?\n  supplier       String?        @db.VarChar(100)\n  still_code     String         @db.Char\n  operator       String?        @db.VarChar(10)\n  loader         String?        @db.VarChar(10)\n  transporter    String?        @db.VarChar(10)\n  date_processed DateTime?      @db.Timestamp(6)\n  new_drums      new_drums?     @relation(fields: [drum_id], references: [drum_id], onDelete: NoAction, onUpdate: NoAction, map: \"records_drum_id_fkey\")\n  stills         Still          @relation(fields: [still_code], references: [code], onDelete: NoAction, onUpdate: NoAction, map: \"records_still_code_fkey\")\n  transactions   transactions[]\n\n  @@schema(\"inventory\")\n}\n\nmodel repro_additions {\n  addition_id     Int            @id @default(autoincrement())\n  repro_drum_id   Int?\n  distillation_id Int?\n  date_added      DateTime?      @default(dbgenerated(\"CURRENT_DATE\")) @db.Date\n  volume_added    Int\n  volume_in_drum  Int\n  created_at      DateTime?      @default(now()) @db.Timestamptz(6)\n  updated_at      DateTime?      @default(now()) @db.Timestamptz(6)\n  distillations   distillations? @relation(fields: [distillation_id], references: [distillation_id], onDelete: NoAction, onUpdate: NoAction)\n  repro_drums     repro_drums?   @relation(fields: [repro_drum_id], references: [repro_drum_id], onDelete: NoAction, onUpdate: NoAction)\n\n  @@schema(\"inventory\")\n}\n\nmodel repro_drums {\n  repro_drum_id   Int               @id @default(autoincrement())\n  date_created    DateTime          @default(dbgenerated(\"CURRENT_DATE\")) @db.Date\n  material        String            @db.VarChar(100)\n  capacity        Int               @default(200)\n  current_volume  Int               @default(0)\n  created_at      DateTime?         @default(now()) @db.Timestamptz(6)\n  updated_at      DateTime?         @default(now()) @db.Timestamptz(6)\n  status          String            @default(\"available\") @db.VarChar(20)\n  volume_status   String            @default(\"partial\") @db.VarChar(20)\n  notes           String?           @db.VarChar(20)\n  location        String?           @default(\"TBD\") @db.VarChar(20)\n  repro_additions repro_additions[]\n  transactions    transactions[]\n\n  @@index([material], map: \"idx_repro_drums_material_type\")\n  @@index([status], map: \"idx_repro_drums_status\")\n  @@index([volume_status], map: \"idx_repro_drums_volume_status\")\n  @@schema(\"inventory\")\n}\n\n/// This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.\nmodel transactions {\n  tx_id       Int          @id @default(autoincrement())\n  tx_type     String       @default(\"import\") @db.VarChar(20)\n  tx_date     DateTime     @default(dbgenerated(\"CURRENT_DATE\")) @db.Date\n  material    String?      @db.VarChar(100)\n  drum_id     Int?\n  repro_id    Int?\n  tx_notes    String?\n  created_at  DateTime?    @default(now()) @db.Timestamptz(6)\n  updated_at  DateTime?    @default(now()) @db.Timestamptz(6)\n  process_id  Int?\n  direction   String?      @default(dbgenerated(\"\\nCASE tx_type\\n    WHEN 'import'::text THEN 'IN'::text\\n    WHEN 'processing'::text THEN 'OUT'::text\\n    WHEN 'reprocessing'::text THEN 'OUT'::text\\n    WHEN 'disposal'::text THEN 'OUT'::text\\n    WHEN 'loss'::text THEN 'OUT'::text\\n    ELSE NULL::text\\nEND\")) @db.VarChar(3)\n  delivery_id Int?\n  batch_code  String?      @db.VarChar(50)\n  order_id    Int?\n  deliveries  deliveries?  @relation(fields: [delivery_id], references: [delivery_id], onDelete: Cascade, onUpdate: NoAction)\n  new_drums   new_drums?   @relation(fields: [drum_id], references: [drum_id], onDelete: NoAction, onUpdate: NoAction)\n  processes   processes?   @relation(fields: [process_id], references: [process_id], onDelete: NoAction, onUpdate: NoAction)\n  repro_drums repro_drums? @relation(fields: [repro_id], references: [repro_drum_id], onDelete: NoAction, onUpdate: NoAction)\n\n  @@schema(\"inventory\")\n}\n\n/// This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.\nmodel Still {\n  code          String      @id @unique(map: \"stills_still_code_key\") @db.Char\n  site          String      @db.Char(2)\n  power         Int\n  capacity      Int\n  isVacuum      Boolean?    @default(false) @map(\"is_vacuum\")\n  isOperational Boolean?    @default(true) @map(\"is_operational\")\n  processes     processes[]\n\n  @@map(\"stills\")\n  @@schema(\"inventory\")\n}\n",
  "inlineSchemaHash": "b7c458b36714b87303f6701cefb796745d179281156f5e8c1f03777011bbbbfd",
  "copyEngine": true
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"bottle_sizes\":{\"dbName\":null,\"schema\":\"public\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"volume\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"10\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"product_prices\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"product_prices\",\"nativeType\":null,\"relationName\":\"bottle_sizesToproduct_prices\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"chemical_groups\":{\"dbName\":null,\"schema\":\"public\",\"fields\":[{\"name\":\"group_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"30\"]],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"product_prices\":{\"dbName\":null,\"schema\":\"public\",\"fields\":[{\"name\":\"product_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"bottle_size_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"price\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"nativeType\":[\"Decimal\",[\"10\",\"2\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"bottle_sizes\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"bottle_sizes\",\"nativeType\":null,\"relationName\":\"bottle_sizesToproduct_prices\",\"relationFromFields\":[\"bottle_size_id\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"products\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"products\",\"nativeType\":null,\"relationName\":\"product_pricesToproducts\",\"relationFromFields\":[\"product_id\"],\"relationToFields\":[\"product_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"product_id\",\"bottle_size_id\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"products\":{\"dbName\":null,\"schema\":\"public\",\"fields\":[{\"name\":\"product_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"50\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sku\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"20\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"raw_material_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"grade\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"10\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"product_prices\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"product_prices\",\"nativeType\":null,\"relationName\":\"product_pricesToproducts\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"raw_materials\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"raw_materials\",\"nativeType\":null,\"relationName\":\"productsToraw_materials\",\"relationFromFields\":[\"raw_material_id\"],\"relationToFields\":[\"raw_material_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"raw_materials\":{\"dbName\":null,\"schema\":\"public\",\"fields\":[{\"name\":\"raw_material_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"100\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"cas_number\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"20\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"chemical_group\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"50\"]],\"default\":\"Hydrocarbon\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"150\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"un_code\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Char\",[\"4\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"flash_point\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"products\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"products\",\"nativeType\":null,\"relationName\":\"productsToraw_materials\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"batches\":{\"dbName\":null,\"schema\":\"inventory\",\"fields\":[{\"name\":\"batch_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"distillation_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"creation_date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Date\",[]],\"default\":{\"name\":\"dbgenerated\",\"args\":[\"CURRENT_DATE\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"batch_code\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"50\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"grade\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"5\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"quantity\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"nativeType\":[\"Decimal\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"distillations\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"distillations\",\"nativeType\":null,\"relationName\":\"batchesTodistillations\",\"relationFromFields\":[\"distillation_id\"],\"relationToFields\":[\"distillation_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.\"},\"deliveries\":{\"dbName\":null,\"schema\":\"inventory\",\"fields\":[{\"name\":\"delivery_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"order_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"quantity_received\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"date_received\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Date\",[]],\"default\":{\"name\":\"dbgenerated\",\"args\":[\"CURRENT_DATE\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"batch_code\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"50\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"location\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"15\"]],\"default\":\"new-site\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"delivery_notes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"is_finalised\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"orders\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"orders\",\"nativeType\":null,\"relationName\":\"deliveriesToorders\",\"relationFromFields\":[\"order_id\"],\"relationToFields\":[\"order_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"transactions\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"transactions\",\"nativeType\":null,\"relationName\":\"deliveriesTotransactions\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"order_id\",\"batch_code\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"order_id\",\"batch_code\"]}],\"isGenerated\":false},\"distillations\":{\"dbName\":null,\"schema\":\"inventory\",\"fields\":[{\"name\":\"distillation_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"loading_date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Date\",[]],\"default\":{\"name\":\"dbgenerated\",\"args\":[\"CURRENT_DATE\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"start_date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Date\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"still_code\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Char\",[\"1\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"volume_in\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Decimal\",\"nativeType\":[\"Decimal\",[]],\"default\":200,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"transporter\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Char\",[\"2\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"loader\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Char\",[\"2\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"operator\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Char\",[\"2\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"completion_date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Date\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"volume_in_spec\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Decimal\",\"nativeType\":[\"Decimal\",[]],\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"volume_repro\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Decimal\",\"nativeType\":[\"Decimal\",[]],\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"batches\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"batches\",\"nativeType\":null,\"relationName\":\"batchesTodistillations\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"drum_distillations\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"drum_distillations\",\"nativeType\":null,\"relationName\":\"distillationsTodrum_distillations\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"repro_additions\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"repro_additions\",\"nativeType\":null,\"relationName\":\"distillationsTorepro_additions\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"drum_distillations\":{\"dbName\":null,\"schema\":\"inventory\",\"fields\":[{\"name\":\"drum_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"distillation_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"fraction_used\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Decimal\",\"nativeType\":[\"Decimal\",[]],\"default\":1,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"distillations\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"distillations\",\"nativeType\":null,\"relationName\":\"distillationsTodrum_distillations\",\"relationFromFields\":[\"distillation_id\"],\"relationToFields\":[\"distillation_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"new_drums\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"new_drums\",\"nativeType\":null,\"relationName\":\"drum_distillationsTonew_drums\",\"relationFromFields\":[\"drum_id\"],\"relationToFields\":[\"drum_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"drum_id\",\"distillation_id\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.\"},\"imports\":{\"dbName\":null,\"schema\":\"inventory\",\"fields\":[{\"name\":\"import_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"supplier_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"100\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"material_type\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"100\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"quantity\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"supplier_batch_code\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"50\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"date_ordered\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Date\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"date_received\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Date\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"notes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"100\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"location\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"10\"]],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.\"},\"new_drums\":{\"dbName\":null,\"schema\":\"inventory\",\"fields\":[{\"name\":\"drum_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"material\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"100\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"date_processed\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Date\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"20\"]],\"default\":\"pending\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"location\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"20\"]],\"default\":\"new-site\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"order_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"drum_distillations\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"drum_distillations\",\"nativeType\":null,\"relationName\":\"drum_distillationsTonew_drums\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"orders\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"orders\",\"nativeType\":null,\"relationName\":\"new_drumsToorders\",\"relationFromFields\":[\"order_id\"],\"relationToFields\":[\"order_id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"processes\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"processes\",\"nativeType\":null,\"relationName\":\"new_drumsToprocesses\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"transactions\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"transactions\",\"nativeType\":null,\"relationName\":\"new_drumsTotransactions\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"orders\":{\"dbName\":null,\"schema\":\"inventory\",\"fields\":[{\"name\":\"order_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"supplier\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"100\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"material\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"100\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"quantity\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"date_ordered\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Date\",[]],\"default\":{\"name\":\"dbgenerated\",\"args\":[\"CURRENT_DATE\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"notes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"quantity_received\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"delivery_status\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"20\"]],\"default\":\"pending\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"eta_start\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Date\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"eta_end\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Date\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"deliveries\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"deliveries\",\"nativeType\":null,\"relationName\":\"deliveriesToorders\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"new_drums\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"new_drums\",\"nativeType\":null,\"relationName\":\"new_drumsToorders\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"processes\":{\"dbName\":null,\"schema\":\"inventory\",\"fields\":[{\"name\":\"process_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"material\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"100\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"drum_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"supplier\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"100\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"still_code\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Char\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"operator\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"10\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"loader\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"10\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"transporter\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"10\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"date_processed\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Timestamp\",[\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"new_drums\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"new_drums\",\"nativeType\":null,\"relationName\":\"new_drumsToprocesses\",\"relationFromFields\":[\"drum_id\"],\"relationToFields\":[\"drum_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"stills\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Still\",\"nativeType\":null,\"relationName\":\"StillToprocesses\",\"relationFromFields\":[\"still_code\"],\"relationToFields\":[\"code\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"transactions\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"transactions\",\"nativeType\":null,\"relationName\":\"processesTotransactions\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"repro_additions\":{\"dbName\":null,\"schema\":\"inventory\",\"fields\":[{\"name\":\"addition_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"repro_drum_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"distillation_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"date_added\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Date\",[]],\"default\":{\"name\":\"dbgenerated\",\"args\":[\"CURRENT_DATE\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"volume_added\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"volume_in_drum\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"distillations\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"distillations\",\"nativeType\":null,\"relationName\":\"distillationsTorepro_additions\",\"relationFromFields\":[\"distillation_id\"],\"relationToFields\":[\"distillation_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"repro_drums\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"repro_drums\",\"nativeType\":null,\"relationName\":\"repro_additionsTorepro_drums\",\"relationFromFields\":[\"repro_drum_id\"],\"relationToFields\":[\"repro_drum_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"repro_drums\":{\"dbName\":null,\"schema\":\"inventory\",\"fields\":[{\"name\":\"repro_drum_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"date_created\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Date\",[]],\"default\":{\"name\":\"dbgenerated\",\"args\":[\"CURRENT_DATE\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"material\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"100\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"capacity\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":200,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"current_volume\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"20\"]],\"default\":\"available\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"volume_status\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"20\"]],\"default\":\"partial\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"notes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"20\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"location\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"20\"]],\"default\":\"TBD\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"repro_additions\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"repro_additions\",\"nativeType\":null,\"relationName\":\"repro_additionsTorepro_drums\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"transactions\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"transactions\",\"nativeType\":null,\"relationName\":\"repro_drumsTotransactions\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"transactions\":{\"dbName\":null,\"schema\":\"inventory\",\"fields\":[{\"name\":\"tx_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tx_type\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"20\"]],\"default\":\"import\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tx_date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Date\",[]],\"default\":{\"name\":\"dbgenerated\",\"args\":[\"CURRENT_DATE\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"material\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"100\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"drum_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"repro_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tx_notes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"process_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"direction\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"3\"]],\"default\":{\"name\":\"dbgenerated\",\"args\":[\"\\\\nCASE tx_type\\\\n    WHEN 'import'::text THEN 'IN'::text\\\\n    WHEN 'processing'::text THEN 'OUT'::text\\\\n    WHEN 'reprocessing'::text THEN 'OUT'::text\\\\n    WHEN 'disposal'::text THEN 'OUT'::text\\\\n    WHEN 'loss'::text THEN 'OUT'::text\\\\n    ELSE NULL::text\\\\nEND\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"delivery_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"batch_code\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"50\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"order_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"deliveries\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"deliveries\",\"nativeType\":null,\"relationName\":\"deliveriesTotransactions\",\"relationFromFields\":[\"delivery_id\"],\"relationToFields\":[\"delivery_id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"new_drums\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"new_drums\",\"nativeType\":null,\"relationName\":\"new_drumsTotransactions\",\"relationFromFields\":[\"drum_id\"],\"relationToFields\":[\"drum_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"processes\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"processes\",\"nativeType\":null,\"relationName\":\"processesTotransactions\",\"relationFromFields\":[\"process_id\"],\"relationToFields\":[\"process_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"repro_drums\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"repro_drums\",\"nativeType\":null,\"relationName\":\"repro_drumsTotransactions\",\"relationFromFields\":[\"repro_id\"],\"relationToFields\":[\"repro_drum_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.\"},\"Still\":{\"dbName\":\"stills\",\"schema\":\"inventory\",\"fields\":[{\"name\":\"code\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Char\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"site\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Char\",[\"2\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"power\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"capacity\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isVacuum\",\"dbName\":\"is_vacuum\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isOperational\",\"dbName\":\"is_operational\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"processes\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"processes\",\"nativeType\":null,\"relationName\":\"StillToprocesses\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.\"}},\"enums\":{},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = undefined

config.injectableEdgeEnv = () => ({
  parsed: {
    DATABASE_URL: typeof globalThis !== 'undefined' && globalThis['DATABASE_URL'] || typeof process !== 'undefined' && process.env && process.env.DATABASE_URL || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

