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