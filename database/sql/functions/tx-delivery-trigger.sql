CREATE OR REPLACE FUNCTION inventory.handle_import_transaction()
RETURNS trigger AS
$$
DECLARE
    existing_delivery_id INT;
    current_total_received INT;
    order_qty INT;
BEGIN
    IF NEW.tx_type = 'import' THEN

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
            SET delivery_status = 'complete',
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

CREATE TRIGGER handle_import_transaction
AFTER INSERT ON inventory.transactions
FOR EACH ROW
WHEN (NEW.tx_type = 'import')
EXECUTE FUNCTION inventory.handle_import_transaction();