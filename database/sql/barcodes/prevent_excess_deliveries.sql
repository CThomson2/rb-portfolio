CREATE OR REPLACE FUNCTION inventory.prevent_excess_deliveries()
RETURNS trigger AS
$$
DECLARE
    total_received       INT;
    order_quantity       INT;
    delivery_status      TEXT;
    quantity_remaining   INT;
    existing_import_tx   INT;
BEGIN
    -- Only run if this is an import transaction
    IF NEW.tx_type = 'import' THEN

        /*
         1) Check if this drum has already been imported.
            We look for any transaction with the same drum_id and tx_type = 'import'.
            If found, raise an error to prevent duplicates.
        */
        SELECT tx_id
        INTO existing_import_tx
        FROM inventory.transactions
        WHERE drum_id = NEW.drum_id
          AND tx_type = 'import'
        LIMIT 1;

        IF existing_import_tx IS NOT NULL THEN
            RAISE EXCEPTION 'Drum with ID % has already been imported.', NEW.drum_id;
        END IF;

        /*
         2) Gather order info: total_received, order_quantity, and status
         */
        SELECT COALESCE(SUM(d.quantity_received), 0) AS total_received,
               o.quantity AS order_quantity,
               o.delivery_status AS delivery_status
        INTO total_received, order_quantity, delivery_status
        FROM inventory.orders o
        LEFT JOIN inventory.deliveries d ON o.order_id = d.order_id
        WHERE o.order_id = NEW.order_id
        GROUP BY o.quantity, o.delivery_status;

        IF delivery_status = 'complete' THEN
            RAISE EXCEPTION 'Cannot add new deliveries. The order is already complete.';
        END IF;

        IF order_quantity IS NULL OR order_quantity = 0 THEN
            RAISE EXCEPTION 'Invalid order quantity or order not found for order_id = %', NEW.order_id;
        END IF;

        -- quantity_remaining = how many more we can receive before hitting the order limit
        quantity_remaining := order_quantity - total_received;

        /*
         3) We might not have a "quantity_received" column directly in NEW, because it's an import transaction row,
            not a deliveries row. We typically add +1 for each import transaction. So let's define that logic:
        */
        IF (total_received + 1) > order_quantity THEN
            RAISE EXCEPTION 'Cannot import drum. Quantity received would exceed the order''s limit. Quantity remaining: %', quantity_remaining;
        END IF;

    END IF;

    -- If checks pass or tx_type != 'import', allow insertion
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER prevent_excess_deliveries
BEFORE INSERT ON inventory.transactions
FOR EACH ROW
EXECUTE FUNCTION inventory.prevent_excess_deliveries();