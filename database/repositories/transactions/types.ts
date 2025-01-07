export interface BaseTransaction {
  tx_id: string;
  tx_type: string;
  direction: string;
  tx_date: string;
  material: string;
  tx_notes: string;
  import_id: string;
  drum_id: string;
  repro_id: string;
}

export interface Transaction extends BaseTransaction {
  delivery_id: string;
  batch_code: string;
}
