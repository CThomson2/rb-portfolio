// database/repositories/inventory/types.ts
import { type TransactionVariantType } from "@/types/constant/inventory/transactions";

export interface Transaction {
  tx_id: number;
  tx_type: TransactionVariantType;
  tx_date: Date;
  material: string;
  direction: "IN" | "OUT";
  // Source of transaction foreign keys
  delivery_id: number | null;
  drum_id: number | null;
  repro_id: number | null;
  // Destination of transaction foreign key
  process_id: number | null;
  // Optional notes
  tx_notes: string | null;
  // Internal product batch code for (re)processing tx_types
  batch_code: string | null;
  // Timestamps
  created_at: Date;
  updated_at: Date;
}

export interface TransactionImport extends Transaction {
  direction: "IN";
  drum_id: number; // TODO: Update all import records without a drum_id (the first 362 records from tx_id = 1 and upwards) to use drum ID of 0, for the drums which represents all the drums in-stock prior to the new system implmentation. I.e. create that record in `deliveries` first, then assign transactions with tx_type = 'import' to that delivery_id.
  delivery_id: number;
}

export interface TransactionProcessing extends Transaction {
  direction: "OUT";
  drum_id: number;
  // TODO: Change `process_id` to REFERENCE the distillation records table in the `production` schema once that table is completed.
  // process_id: number;
}

export interface TransactionResponse {
  rows: Transaction[];
  total: number;
}

/*

"""
rathburn-2025=# \d+ inventory.transactions;
                                                                    Table "inventory.transactions"
   Column    |           Type           | Collation | Nullable |                    Default                     | Storage  | Compression | Stats target | Description 
-------------+--------------------------+-----------+----------+------------------------------------------------+----------+-------------+--------------+-------------
 tx_id       | integer                  |           | not null | generated always as identity                   | plain    |             |              | 
 tx_type     | character varying(20)    |           | not null |                                                | extended |             |              | 
 tx_date     | date                     |           | not null | CURRENT_DATE                                   | plain    |             |              | 
 material    | character varying(100)   |           |          |                                                | extended |             |              | 
 drum_id     | integer                  |           |          |                                                | plain    |             |              | 
 repro_id    | integer                  |           |          |                                                | plain    |             |              | 
 tx_notes    | text                     |           |          |                                                | extended |             |              | 
 created_at  | timestamp with time zone |           |          | CURRENT_TIMESTAMP                              | plain    |             |              | 
 updated_at  | timestamp with time zone |           |          | CURRENT_TIMESTAMP                              | plain    |             |              | 
 process_id  | integer                  |           |          |                                                | plain    |             |              | 
 direction   | character varying(3)     |           |          | generated always as (                         +| extended |             |              | 
             |                          |           |          | CASE tx_type                                  +|          |             |              | 
             |                          |           |          |     WHEN 'import'::text THEN 'IN'::text       +|          |             |              | 
             |                          |           |          |     WHEN 'processing'::text THEN 'OUT'::text  +|          |             |              | 
             |                          |           |          |     WHEN 'reprocessing'::text THEN 'OUT'::text+|          |             |              | 
             |                          |           |          |     WHEN 'disposal'::text THEN 'OUT'::text    +|          |             |              | 
             |                          |           |          |     WHEN 'loss'::text THEN 'OUT'::text        +|          |             |              | 
             |                          |           |          |     WHEN 'cancelled'::text THEN 'OUT'::text   +|          |             |              | 
             |                          |           |          |     ELSE NULL::text                           +|          |             |              | 
             |                          |           |          | END) stored                                    |          |             |              | 
 delivery_id | integer                  |           |          |                                                | plain    |             |              | 
 batch_code  | character varying(50)    |           |          |                                                | extended |             |              | 
Indexes:
    "transactions_pkey" PRIMARY KEY, btree (tx_id)
Check constraints:
    "transactions_direction_check" CHECK (direction::text = ANY (ARRAY['IN'::character varying, 'OUT'::character varying]::text[]))
    "transactions_tx_type_check" CHECK (tx_type::text = ANY (ARRAY['import'::character varying, 'processing'::character varying, 'reprocessing'::character varying, 'disposal'::character varying, 'loss'::character varying]::text[]))
Foreign-key constraints:
    "transactions_delivery_id_fkey" FOREIGN KEY (delivery_id) REFERENCES inventory.deliveries(delivery_id)
    "transactions_drum_id_fkey" FOREIGN KEY (drum_id) REFERENCES inventory.new_drums(drum_id)
    "transactions_process_id_fkey" FOREIGN KEY (process_id) REFERENCES inventory.processes(process_id)
    "transactions_repro_id_fkey" FOREIGN KEY (repro_id) REFERENCES inventory.repro_drums(repro_drum_id)
Triggers:
    set_processed_status_trigger AFTER INSERT ON inventory.transactions FOR EACH ROW WHEN (new.tx_type::text = 'processing'::text) EXECUTE FUNCTION inventory.set_new_drum_processed_status()
    trigger_disposal_or_loss_transaction AFTER INSERT ON inventory.transactions FOR EACH ROW WHEN (new.tx_type::text = ANY (ARRAY['disposal'::character varying, 'loss'::character varying]::text[])) EXECUTE FUNCTION inventory.handle_disposal_or_loss_transaction()
    trigger_import_tx AFTER INSERT ON inventory.transactions FOR EACH ROW WHEN (new.tx_type::text = 'import'::text) EXECUTE FUNCTION inventory.handle_import_tx()
    trigger_processing_transaction AFTER INSERT ON inventory.transactions FOR EACH ROW WHEN (new.tx_type::text = 'processing'::text) EXECUTE FUNCTION inventory.handle_processing_transaction()
    trigger_set_material_type BEFORE INSERT ON inventory.transactions FOR EACH ROW EXECUTE FUNCTION inventory.set_material_type()
Access method: heap
"""
*/
