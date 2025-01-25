CREATE OR REPLACE FUNCTION inventory.update_order_status()
RETURNS trigger AS
$$

DECLARE
    total_drums INT;
    available_drums INT;
BEGIN
    -- Calculate the total number of drums for the order
    SELECT COUNT(*)
    INTO total_drums
    FROM inventory.new_drums
    WHERE order_id = NEW.order_id;

    -- Calculate the number of drums with status 'available'
    SELECT COUNT(*)
    INTO available_drums
    FROM inventory.new_drums
    WHERE order_id = NEW.order_id AND status = 'available';

    -- Update the order status based on the drum counts
    IF available_drums = 0 THEN
        UPDATE inventory.orders
        SET delivery_status = 'pending',
            updated_at = CURRENT_TIMESTAMP
        WHERE order_id = NEW.order_id;
    ELSIF available_drums < total_drums THEN
        UPDATE inventory.orders
        SET delivery_status = 'partial',
            updated_at = CURRENT_TIMESTAMP
        WHERE order_id = NEW.order_id;
    ELSE
        UPDATE inventory.orders
        SET delivery_status = 'complete',
            updated_at = CURRENT_TIMESTAMP
        WHERE order_id = NEW.order_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_order_status
AFTER INSERT ON inventory.transactions
FOR EACH ROW
EXECUTE FUNCTION inventory.update_order_status();