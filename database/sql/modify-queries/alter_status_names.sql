ALTER TABLE inventory.transactions 
DROP COLUMN direction;

ALTER TABLE inventory.transactions 
ADD COLUMN direction text GENERATED ALWAYS AS (
  CASE tx_type
    WHEN 'intake'::text THEN 'IN'::text    -- Initial entry to inventory
    WHEN 'scheduled'::text THEN NULL::text  -- Preparation for processing
    WHEN 'loaded'::text THEN 'OUT'::text    -- Actually leaving inventory
    WHEN 'processed'::text THEN NULL::text  -- Already out of inventory
    WHEN 'failed'::text THEN 'IN'::text     -- Returns to inventory for reprocessing
    WHEN 'requeued'::text THEN 'IN'::text   -- Returns to inventory for next stage
    WHEN 'disposed'::text THEN 'OUT'::text  -- Final removal from inventory
    WHEN 'lost'::text THEN 'OUT'::text      -- Final removal from inventory
    WHEN 'cancelled'::text THEN NULL::text  -- Invalid scan, no inventory effect
    ELSE NULL::text
  END
) STORED;