
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.4.1
 * Query Engine version: a9055b89e58b4b5bfb59600785423b1db3d0e75d
 */
Prisma.prismaVersion = {
  client: "6.4.1",
  engine: "a9055b89e58b4b5bfb59600785423b1db3d0e75d"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

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
  id: 'id',
  name: 'name',
  cas_number: 'cas_number',
  chemical_group: 'chemical_group',
  description: 'description',
  un_code: 'un_code',
  flash_point: 'flash_point'
};

exports.Prisma.SuppliersScalarFieldEnum = {
  id: 'id',
  name: 'name'
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
  status: 'status',
  eta_start: 'eta_start',
  eta_end: 'eta_end',
  po_number: 'po_number'
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
  delivery_id: 'delivery_id',
  order_id: 'order_id',
  direction: 'direction'
};

exports.Prisma.Cleaning_recordsScalarFieldEnum = {
  cleaning_id: 'cleaning_id',
  still_code: 'still_code',
  operator: 'operator',
  checker: 'checker'
};

exports.Prisma.Drum_distillationsScalarFieldEnum = {
  drum_id: 'drum_id',
  distillation_id: 'distillation_id',
  fraction_used: 'fraction_used'
};

exports.Prisma.LabsScalarFieldEnum = {
  lab_id: 'lab_id',
  lab_name: 'lab_name',
  lab_site: 'lab_site',
  description: 'description'
};

exports.Prisma.OperatorsScalarFieldEnum = {
  operator_id: 'operator_id',
  first_name: 'first_name',
  last_name: 'last_name',
  initials: 'initials',
  middle_names: 'middle_names'
};

exports.Prisma.Operators_work_labsScalarFieldEnum = {
  operator_id: 'operator_id',
  lab_id: 'lab_id'
};

exports.Prisma.Output_recordsScalarFieldEnum = {
  output_id: 'output_id',
  production_id: 'production_id',
  container_size: 'container_size',
  no_containers: 'no_containers',
  grade: 'grade',
  batch_number: 'batch_number',
  destination: 'destination',
  labels_required: 'labels_required',
  labels_destroyed: 'labels_destroyed',
  start_time: 'start_time',
  end_time: 'end_time',
  start_temp: 'start_temp',
  completion_date: 'completion_date'
};

exports.Prisma.Pr_scheduleScalarFieldEnum = {
  schedule_id: 'schedule_id',
  production_date: 'production_date',
  lab_site: 'lab_site',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.StillsScalarFieldEnum = {
  still_id: 'still_id',
  still_code: 'still_code',
  max_capacity: 'max_capacity',
  power_rating_kw: 'power_rating_kw',
  lab_id: 'lab_id',
  is_vacuum: 'is_vacuum',
  is_operational: 'is_operational',
  description: 'description'
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
  suppliers: 'suppliers',
  batches: 'batches',
  deliveries: 'deliveries',
  distillations: 'distillations',
  new_drums: 'new_drums',
  orders: 'orders',
  repro_additions: 'repro_additions',
  repro_drums: 'repro_drums',
  transactions: 'transactions',
  cleaning_records: 'cleaning_records',
  drum_distillations: 'drum_distillations',
  labs: 'labs',
  operators: 'operators',
  operators_work_labs: 'operators_work_labs',
  output_records: 'output_records',
  pr_schedule: 'pr_schedule',
  stills: 'stills'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
