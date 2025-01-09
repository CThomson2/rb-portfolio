CREATE OR REPLACE FUNCTION inventory.update_order_status()
RETURNS TRIGGER AS $$
BEGIN
    -- Declare a variable to store the total quantity received for the order
    DECLARE total_received INT;
    BEGIN
        -- Calculate the total quantity received for the current order
        SELECT COALESCE(SUM(quantity_received), 0)
        INTO total_received
        FROM inventory.deliveries
        WHERE order_id = NEW.order_id;

        -- Update the order status based on the total quantity received
        IF total_received = 0 THEN
            -- If no quantity has been received, set the order status to 'pending'
            UPDATE inventory.orders
            SET delivery_status = 'pending',
                updated_at = CURRENT_TIMESTAMP
            WHERE order_id = NEW.order_id;
        ELSIF total_received < (
            -- If the received quantity is less than the ordered quantity, set status to 'partial'
            SELECT quantity
            FROM inventory.orders
            WHERE order_id = NEW.order_id
        ) THEN
            UPDATE inventory.orders
            SET delivery_status = 'partial',
                updated_at = CURRENT_TIMESTAMP
            WHERE order_id = NEW.order_id;
        ELSE
            -- If the received quantity meets or exceeds the ordered quantity, set status to 'complete'
            UPDATE inventory.orders
            SET delivery_status = 'complete',
                updated_at = CURRENT_TIMESTAMP
            WHERE order_id = NEW.order_id;
        END IF;
    END;
    -- Return the modified row
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_order_status
AFTER INSERT OR UPDATE ON inventory.deliveries
FOR EACH ROW
EXECUTE FUNCTION inventory.update_order_status();

---

CREATE OR REPLACE FUNCTION inventory.update_order_delivery_status()
RETURNS TRIGGER AS $$
BEGIN
    -- Update quantity_received in orders
    UPDATE inventory.orders 
    SET quantity_received = (
        SELECT COALESCE(SUM(quantity_received), 0)
        FROM inventory.deliveries
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

CREATE TRIGGER trigger_update_order_delivery_status
AFTER INSERT OR UPDATE ON inventory.deliveries
FOR EACH ROW
EXECUTE FUNCTION inventory.update_order_delivery_status();