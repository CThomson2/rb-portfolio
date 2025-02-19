-- CREATE OR REPLACE FUNCTION inventory.update_order_status()
-- RETURNS TRIGGER AS $$
-- BEGIN
--     -- Declare a variable to store the total quantity received for the order
--     DECLARE total_received INT;
--     BEGIN
--         -- Calculate the total quantity received for the current order
--         SELECT COALESCE(SUM(quantity_received), 0)
--         INTO total_received
--         FROM inventory.deliveries
--         WHERE order_id = NEW.order_id;

--         -- Update the order status based on the total quantity received
--         IF total_received = 0 THEN
--             -- If no quantity has been received, set the order status to 'pending'
--             UPDATE inventory.orders
--             SET status = 'pending',
--                 updated_at = CURRENT_TIMESTAMP
--             WHERE order_id = NEW.order_id;
--         ELSIF total_received < (
--             -- If the received quantity is less than the ordered quantity, set status to 'partial'
--             SELECT quantity
--             FROM inventory.orders
--             WHERE order_id = NEW.order_id
--         ) THEN
--             UPDATE inventory.orders
--             SET status = 'partial',
--                 updated_at = CURRENT_TIMESTAMP
--             WHERE order_id = NEW.order_id;
--         ELSE
--             -- If the received quantity meets or exceeds the ordered quantity, set status to 'complete'
--             UPDATE inventory.orders
--             SET status = 'complete',
--                 updated_at = CURRENT_TIMESTAMP
--             WHERE order_id = NEW.order_id;
--         END IF;
--     END;
--     -- Return the modified row
-- $$ LANGUAGE plpgsql;

-- CREATE TRIGGER trigger_update_order_status
-- AFTER INSERT OR UPDATE ON inventory.deliveries
-- FOR EACH ROW
-- EXECUTE FUNCTION inventory.update_order_status();

/*
1. TRIGGER FUNCTIONS
- Trigger Functions: Automatically execute in response to database events (INSERT, UPDATE, DELETE). Perfect for enforcing data integrity rules.
- Trigger Events: INSERT, UPDATE, DELETE.
- Trigger Timing: BEFORE, AFTER, INSTEAD OF.
- Trigger Scope: ROW, STATEMENT.
- Trigger Condition: WHEN clause.
- Trigger Order: ORDER BY clause.
- Trigger Body: DECLARE, BEGIN, END, RETURN.

2. STANDARD SQL FUNCTIONS
- Standard SQL Functions: Return values and are called explicitly. Best for calculations or data retrieval.
- Function Types: Scalar, Aggregate, Window, Table.
- Function Scope: GLOBAL, LOCAL.
- Function Body: DECLARE, BEGIN, END, RETURN.
- Function Parameters: IN, OUT, INOUT.
- Function Return Types: Scalar, Table.
- Function Execution: SELECT, INSERT, UPDATE, DELETE.

3. STORED PROCEDURES
- Stored Procedures: Execute a series of operations, can commit/rollback transactions, typically used for complex business logic that modifies multiple tables.
- Execution: CALL.
- Parameters: IN, OUT, INOUT.
- Scope: GLOBAL, LOCAL.
- Body: DECLARE, BEGIN, END, RETURN.

*/


/*
This trigger function automatically updates the order and drum statuses when deliveries are made.

When a delivery is recorded (INSERT) or modified (UPDATE):
1. Calculates the total quantity received for the order across all deliveries
2. Updates the order's delivery status based on received vs ordered quantity:
   - 'complete' if received equals ordered quantity
   - 'partial' if received is less than ordered
   - 'pending' if no deliveries
3. Updates the status of drums associated with this order from 'pending' to 'available'
   based on the quantity received in this delivery

Tables affected:
- inventory.deliveries (trigger source)
- inventory.orders (updates quantity_received and status)
- inventory.new_drums (updates drum status)
*/

CREATE OR REPLACE FUNCTION inventory.update_order_status()
RETURNS TRIGGER AS $$
DECLARE total_received INT; -- Declare the variable here
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
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_order_status
AFTER INSERT OR UPDATE ON inventory.deliveries
FOR EACH ROW
EXECUTE FUNCTION inventory.update_order_status();

--

-- CREATE OR REPLACE FUNCTION inventory.update_order_status()
-- RETURNS TRIGGER AS $$
-- BEGIN
--     -- Update quantity_received in orders
--     UPDATE inventory.orders 
--     SET quantity_received = (
--         SELECT COALESCE(SUM(quantity_received), 0)
--         FROM inventory.deliveries
--         WHERE order_id = NEW.order_id
--     ),
--     status = CASE 
--         WHEN quantity_received = quantity THEN 'complete'
--         WHEN quantity_received < quantity THEN 'partial'
--         ELSE status
--     END,
--     updated_at = CURRENT_TIMESTAMP
--     WHERE order_id = NEW.order_id;
    
--     RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;

-- CREATE TRIGGER trigger_update_order_status
-- AFTER INSERT OR UPDATE ON inventory.deliveries
-- FOR EACH ROW
-- EXECUTE FUNCTION inventory.update_order_status();

/*
This is a trigger function on the deliveries table to enforce the following constraints:

1.	Ensure quantity_received does not exceed the quantity field in the related orders record.

2.	Prevent new deliveries records from being created when the status of the corresponding orders record is complete.
*/

CREATE OR REPLACE FUNCTION prevent_excess_deliveries()
RETURNS TRIGGER AS $$
DECLARE
    total_received INT;
    order_quantity INT;
    status TEXT;
    quantity_remaining INT;
BEGIN
    -- Get the current total received and order details
    SELECT COALESCE(SUM(d.quantity_received), 0) AS total_received,
        o.quantity AS order_quantity,
        o.status AS status
    INTO
        total_received,
        order_quantity,
        status
    FROM
        inventory.orders o
    LEFT JOIN
        inventory.deliveries d
    ON
        o.order_id = d.order_id
    WHERE
        o.order_id = NEW.order_id
    GROUP BY o.quantity, o.status;

    -- Calculate the quantity remaining to be delivered
    quantity_remaining := order_quantity - total_received;

    -- Check if the order is already complete
    IF status = 'complete' THEN
        RAISE EXCEPTION 'Cannot add new deliveries. The order has been completely fulfilled.';
    END IF;

    -- Check if the new delivery would exceed the ordered quantity
    IF (total_received + NEW.quantity_received) > order_quantity THEN
        RAISE EXCEPTION 'Cannot add new delivery. Quantity received would exceed the order quantity. Quantity yet to be delivered: %', quantity_remaining;
    END IF;

    -- If everything is valid, allow the insertion
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Attach the trigger to the `deliveries` table
CREATE TRIGGER validate_delivery_insert
BEFORE INSERT ON inventory.deliveries
FOR EACH ROW
EXECUTE FUNCTION prevent_excess_deliveries();

--
ALTER TABLE inventory.new_drums
ADD CONSTRAINT check_complete_order_drums_status
CHECK (
    status IN ('available', 'scheduled', 'processed') OR
    NOT EXISTS (
        SELECT 1
        FROM inventory.orders
        WHERE orders.order_id = new_drums.order_id AND status = 'complete'
    )
);

/*
03/01/2025	Methanol Univar	H16895/92	25A03MA
03/01/2025	Ethanol Repro	R3912	25A03QA
03/01/2025	TCB 30LT ONLY	R4019	25A06RC
03/01/2025	CS2 Promo	H16256	25A03GB
03/01/2025	Aceto ICC	H16281	25A03AA
06/01/2025	Pentane caldic	H16782	25A07FC
06/01/2025	Acetone Univar	H17134/35	25A06SA
06/01/2025	Acetic Acid Univar	H17045	25A07RC
07/01/2025	Aceto ICC	H16529	25A07BC
07/01/2025	DCM Inovyn	H16991/88	25A07SA
07/01/2025	Methanol Univar	H16894/93/98	25A07MA
07/01/2025	Methanol Kimia	H16899	25A07NC
07/01/2025	THF Nan-Ya	H16458	25A07DA
08/01/2025	Methanol Kimia	H16901	25A08NA
08/01/2025	Methanol Univar	H16897/96	25A08MA
08/01/2025	DCM Inovyn	H16990/89	25A08SA
08/01/2025	Acetic Acid Univar	H17047	25A08RC
08/01/2025	Aceto ICC	H16531	25A08BC
08/01/2025	Pentane Caldic	H16784	25A08EC
08/01/2025	Pentane Caldic	H16785	25A08FC
09/01/2025	Pentane Caldic	H16788	25A09FC
09/01/2025	Aceto ICC	H16530	25A09BA
09/01/2025	Acetic Acid	H17048	25A09RC
09/01/2025	CS2 Promo	H16249	25A09GB
09/01/2025	Methanol Univar	H16900/02/03	25A09MA
09/01/2025	Methanol Kimia	H16907	25A09NA
09/01/2025	Ethanol Kimia	H17025	25A09QA
*/