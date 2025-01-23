CREATE OR REPLACE FUNCTION inventory.set_material_type()
RETURNS trigger AS
$$
BEGIN
    -- Set material based on which TX source ID is not null
    NEW.material := CASE
        -- Fetch material from orders table via deliveries
        WHEN NEW.delivery_id IS NOT NULL THEN
            (
                SELECT o.material
                FROM inventory.deliveries d
                JOIN inventory.orders o ON d.order_id = o.order_id
                WHERE d.delivery_id = NEW.delivery_id
            )
        -- Fetch material directly from new_drums table
        WHEN NEW.drum_id IS NOT NULL THEN
            (
                SELECT material
                FROM inventory.new_drums
                WHERE drum_id = NEW.drum_id
            )
        -- Fetch material directly from repro_drums table
        WHEN NEW.repro_id IS NOT NULL THEN
            (
                SELECT material
                FROM inventory.repro_drums
                WHERE repro_drum_id = NEW.repro_id
            )
    END;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_material_type
BEFORE INSERT ON inventory.transactions
FOR EACH ROW
EXECUTE FUNCTION inventory.set_material_type();