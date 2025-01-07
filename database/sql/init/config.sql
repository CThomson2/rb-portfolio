-- Modify orders table to track delivery status by adding:
-- 1. quantity_received: tracks total quantity received across all deliveries for this order
-- 2. delivery_status: tracks overall delivery status ('pending', 'partial', 'complete')
-- Note: character varying is the standard SQL type name, VARCHAR is an alias
ALTER TABLE inventory.orders 
ADD COLUMN quantity_received integer DEFAULT 0,
ADD COLUMN delivery_status character varying(20) 
    DEFAULT 'pending'::character varying 
    CHECK (delivery_status IN ('pending', 'partial', 'complete'));

-- Create deliveries table to track individual delivery records for orders
-- Each delivery record contains:
-- - delivery_id: unique auto-incrementing identifier
-- - order_id: references the parent order
-- - quantity_received: amount received in this delivery
-- - date_received: when delivery was received (defaults to current date)
-- - batch_code: manufacturer's batch code for traceability
-- - location: where items were delivered to
-- - delivery_notes: any additional notes about the delivery
-- - created_at/updated_at: audit timestamps
CREATE TABLE inventory.deliveries (
    delivery_id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    order_id integer REFERENCES inventory.orders(order_id),
    quantity_received integer NOT NULL,
    date_received date NOT NULL DEFAULT CURRENT_DATE,
    batch_code character varying(50),
    location character varying(15),
    delivery_notes text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_quantity CHECK (quantity_received > 0)
);

-- Create function that automatically updates order status when deliveries change
-- This function:
-- 1. Recalculates total quantity_received by summing all deliveries
-- 2. Updates delivery_status based on received vs ordered quantity:
--    - 'complete' when all ordered quantity received
--    - 'partial' when some quantity received
--    - keeps current status otherwise
-- 3. Updates the order's updated_at timestamp
CREATE OR REPLACE FUNCTION inventory.update_order_delivery_status()
RETURNS TRIGGER AS $$
BEGIN
    -- Update quantity_received in orders
    UPDATE public.orders 
    SET quantity_received = (
        SELECT COALESCE(SUM(quantity_received), 0)
        FROM public.deliveries
        WHERE order_id = NEW.order_id
    ),
    delivery_status = CASE 
        WHEN quantity_received = quantity THEN 'complete'
        WHEN quantity_received < quantity THEN 'partial'
        ELSE delivery_status
    END,
    updated_at = CURRENT_TIMESTAMP
    WHERE order_id = NEW.order_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger that runs the update function after any insert/update on deliveries
-- This ensures order status stays in sync with its deliveries automatically
CREATE TRIGGER trigger_update_order_delivery_status
AFTER INSERT OR UPDATE ON public.deliveries
FOR EACH ROW
EXECUTE FUNCTION public.update_order_delivery_status();

---

CREATE OR REPLACE FUNCTION public.handle_import_transaction()
RETURNS TRIGGER AS $$
BEGIN
    -- Insert multiple new drum records using generate_series()
    -- For each number from 1 to import.quantity, create a new drum record
    -- All drums get the same import_id and material_type from the import record
    INSERT INTO public.new_drums (order_id, material_type)
    SELECT
        NEW.order_id,
        i.material_type
    FROM
        public.imports i,
        generate_series(1, i.quantity) AS drum_count -- Creates N rows where N = import quantity
    WHERE
        i.import_id = NEW.import_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_handle_import_transaction
AFTER INSERT ON public.transactions
FOR EACH ROW
EXECUTE FUNCTION public.handle_import_transaction();

---

CREATE OR REPLACE FUNCTION public.handle_disposal_loss_transaction()
RETURNS TRIGGER AS $$
BEGIN
    -- On rare occasion of stock disposal or loss, remove the source drum or repro drum
    IF NEW.drum_id IS NOT NULL THEN
        DELETE FROM inventory.new_drums
        WHERE drum_id = NEW.drum_id;
    ELSIF NEW.repro_source_id IS NOT NULL THEN
        DELETE FROM inventory.repro_drums
        WHERE repro_drum_id = NEW.repro_source_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_handle_disposal_loss_transaction
AFTER INSERT ON public.transactions
FOR EACH ROW
EXECUTE FUNCTION public.handle_disposal_loss_transaction();

---

CREATE OR REPLACE FUNCTION public.handle_processing_transaction()
RETURNS TRIGGER AS $$
BEGIN
    -- On processing, remove the source drum
    IF NEW.tx_type = 'processing' THEN
        -- Update the corresponding new_drums record to set status to 'processed'    
        UPDATE public.new_drums
        SET status = 'processed',
            date_processed = NEW.tx_date,
            updated_at = CURRENT_TIMESTAMP
        WHERE drum_id = NEW.drum_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_handle_processing_transaction
AFTER INSERT ON public.transactions
FOR EACH ROW
EXECUTE FUNCTION public.handle_processing_transaction();

---

CREATE OR REPLACE FUNCTION public.set_material_type()
RETURNS TRIGGER AS $$
BEGIN
    -- Set material_type based on which drum source ID is not null
    NEW.material_type := CASE
        WHEN NEW.import_id IS NOT NULL THEN
            (SELECT material_type FROM public.imports WHERE import_id = NEW.import_id)
        WHEN NEW.drum_id IS NOT NULL THEN
            (SELECT material_type FROM public.new_drums WHERE drum_id = NEW.drum_id)
        WHEN NEW.repro_source_id IS NOT NULL THEN
            (SELECT material_type FROM public.repro_drums WHERE repro_drum_id = NEW.repro_source_id)
    END;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_material_type
AFTER INSERT ON public.transactions
FOR EACH ROW
EXECUTE FUNCTION public.set_material_type();
