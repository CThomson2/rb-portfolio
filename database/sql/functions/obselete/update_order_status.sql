DECLARE
	total_received INT; -- Declare the variable here

BEGIN
	 -- Calculate the total quantity received for the given order
    SELECT COALESCE(SUM(quantity_received), 0)
    INTO total_received
    FROM inventory.deliveries
    WHERE order_id = NEW.order_id;

    -- Update the orders table
    UPDATE inventory.orders 
    SET 
        quantity_received = total_received,
        status = CASE 
            WHEN total_received = quantity THEN 'complete'
            WHEN total_received < quantity THEN 'partial'
            ELSE 'pending'
        END,
        updated_at = CURRENT_TIMESTAMP
    WHERE order_id = NEW.order_id;

	-- Update the new_drums table
    -- Set the status of the first X pending drums for this order to 'available',
    -- where X is the quantity_received in the NEW delivery record.
    UPDATE inventory.new_drums
    SET status = 'available',
        updated_at = CURRENT_TIMESTAMP
    WHERE drum_id IN (
        SELECT drum_id
        FROM inventory.new_drums
        WHERE order_id = NEW.order_id AND status = 'pending'
        ORDER BY drum_id ASC
        LIMIT NEW.quantity_received
    );

    RETURN NEW;
END;


---



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
            SET status = 'pending',
                updated_at = CURRENT_TIMESTAMP
            WHERE order_id = NEW.order_id;
        ELSIF total_received < (
            -- If the received quantity is less than the ordered quantity, set status to 'partial'
            SELECT quantity_ordered
            FROM inventory.orders
            WHERE order_id = NEW.order_id
        ) THEN
            UPDATE inventory.orders
            SET status = 'partial',
                updated_at = CURRENT_TIMESTAMP
            WHERE order_id = NEW.order_id;
        ELSE
            -- If the received quantity meets or exceeds the ordered quantity, set status to 'complete'
            UPDATE inventory.orders
            SET status = 'complete',
                updated_at = CURRENT_TIMESTAMP
            WHERE order_id = NEW.order_id;
        END IF;
    END;
    -- Return the modified row
    RETURN NEW;
END;
