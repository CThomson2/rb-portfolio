CREATE OR REPLACE FUNCTION inventory.handle_import_transaction()
RETURNS trigger AS
$$
DECLARE
    existing_delivery_id INT;
    current_total_received INT;
    order_qty INT;
BEGIN
    IF NEW.tx_type = 'intake' THEN

        --------------------------------------------------------
        -- 1) Find or Create Delivery row
        --------------------------------------------------------
        SELECT delivery_id
        INTO existing_delivery_id
        FROM inventory.deliveries
        WHERE order_id = NEW.order_id
          AND is_finalised = false
        LIMIT 1;

        IF existing_delivery_id IS NULL THEN
            INSERT INTO inventory.deliveries (order_id, quantity_received, is_finalised, created_at)
            VALUES (NEW.order_id, 1, false, CURRENT_TIMESTAMP)
            RETURNING delivery_id INTO existing_delivery_id;
        ELSE
            UPDATE inventory.deliveries
            SET quantity_received = quantity_received + 1,
                updated_at = CURRENT_TIMESTAMP
            WHERE delivery_id = existing_delivery_id;
        END IF;

        --------------------------------------------------------
        -- 2) Update Orders (increment quantity_received)
        --------------------------------------------------------
        UPDATE inventory.orders
        SET quantity_received = quantity_received + 1,
            updated_at = CURRENT_TIMESTAMP
        WHERE order_id = NEW.order_id
        RETURNING quantity_received, quantity INTO current_total_received, order_qty;

        --------------------------------------------------------
        -- 3) If we have a known drum_id, set the drum to 'available'
        --------------------------------------------------------
        IF NEW.drum_id IS NOT NULL THEN
            UPDATE inventory.new_drums
            SET status = 'available',
                updated_at = CURRENT_TIMESTAMP
            WHERE drum_id = NEW.drum_id;
        END IF;

        --------------------------------------------------------
        -- 4) If total_received == order_quantity => finalize
        --------------------------------------------------------
        IF current_total_received = order_qty THEN
            UPDATE inventory.deliveries
            SET is_finalised = true,
                updated_at = CURRENT_TIMESTAMP
            WHERE delivery_id = existing_delivery_id;

            UPDATE inventory.orders
            SET status = 'complete',
                updated_at = CURRENT_TIMESTAMP
            WHERE order_id = NEW.order_id;
        END IF;

        --------------------------------------------------------
        -- 5) Link the transaction to the chosen delivery_id
        --------------------------------------------------------
        UPDATE inventory.transactions
        SET delivery_id = existing_delivery_id
        WHERE tx_id = NEW.tx_id;

    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER handle_intake_transaction
AFTER INSERT OR UPDATE ON inventory.transactions
FOR EACH ROW
WHEN (NEW.tx_type = 'intake')
EXECUTE FUNCTION inventory.handle_intake_transaction();

--------------------------------------------------------
-- Handle Disposal/Loss transactions
-- Find drum ID in `new_drums` table
-- Update `status` to `disposed` or `lost`
-- Update `updated_at`
--------------------------------------------------------

CREATE OR REPLACE FUNCTION inventory.handle_disposal_loss_transaction()
RETURNS trigger AS
$$
DECLARE
    drum_id INT;
BEGIN
    IF NEW.tx_type IN ('disposed', 'lost') THEN
        drum_id := NEW.drum_id;
        IF drum_id IS NOT NULL THEN
            UPDATE inventory.new_drums
            SET status = NEW.tx_type,
                updated_at = CURRENT_TIMESTAMP
            WHERE drum_id = drum_id;
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER handle_disposal_loss_scan
AFTER INSERT OR UPDATE ON inventory.transactions
FOR EACH ROW
WHEN (NEW.tx_type = 'disposed' OR NEW.tx_type = 'lost')
EXECUTE FUNCTION inventory.handle_disposal_loss_transaction();

--------------------------------------------------------
-- Handle Processed transactions
-- Find drum ID in `new_drums` table
-- Update `status` to `processed`
-- Update `updated_at`
--------------------------------------------------------
CREATE OR REPLACE FUNCTION inventory.handle_processed_transaction()
RETURNS trigger AS
$$
DECLARE
    drum_id INT;
BEGIN
    -- Check if the transaction type is 'processed'
    IF NEW.tx_type = 'processed' THEN
        -- Update the corresponding drum in the new_drums table
        UPDATE inventory.new_drums
        SET 
            status = CASE 
                        WHEN status <> 'pending' THEN 'processed'
                        ELSE status
                     END,
            date_processed = CASE 
                                WHEN status <> 'pending' THEN NEW.tx_date
                                ELSE NULL
                             END,
            updated_at = CASE 
                            WHEN status <> 'pending' THEN CURRENT_TIMESTAMP
                            ELSE updated_at
                         END
        WHERE drum_id = NEW.drum_id;    -- Match the source drum
    END IF;

    -- Return the newly inserted row in the transactions table
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_processing_tx ON inventory.transactions;
CREATE TRIGGER handle_processed_scan
AFTER INSERT OR UPDATE ON inventory.transactions
FOR EACH ROW
WHEN (NEW.tx_type = 'processed')
EXECUTE FUNCTION inventory.handle_processed_transaction();
