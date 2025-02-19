-- Orders and Deliveries first (as you mentioned)
CREATE TABLE
    public.orders (
        order_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        supplier VARCHAR(100) NOT NULL,
        material VARCHAR(100) NOT NULL,
        quantity INTEGER NOT NULL,
        quantity_received INTEGER NOT NULL DEFAULT 0,
        date_ordered DATE NOT NULL DEFAULT CURRENT_DATE,
        status VARCHAR(20) NOT NULL DEFAULT 'pending',
        notes TEXT,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT valid_material FOREIGN KEY (material) REFERENCES raw_materials (name),
        CONSTRAINT valid_status CHECK (
            status IN ('pending', 'partial delivery', 'fulfilled')
        )
    );

CREATE TABLE
    public.deliveries (
        delivery_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        order_id INTEGER REFERENCES orders (order_id),
        quantity_received INTEGER NOT NULL,
        date_received DATE NOT NULL DEFAULT CURRENT_DATE,
        batch_code VARCHAR(50),
        location VARCHAR(15),
        notes TEXT,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT unique_order_batch UNIQUE (order_id, batch_code),
        CONSTRAINT valid_location CHECK (location IN ('old-site', 'new-site'))
    );


-- Create function that automatically updates order status when deliveries change
-- This function:
-- 1. Recalculates total quantity_received by summing all deliveries
-- 2. Updates status based on received vs ordered quantity:
--    - 'complete' when all ordered quantity received
--    - 'partial' when some quantity received
--    - keeps current status otherwise
-- 3. Updates the order's updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_order_status()
RETURNS TRIGGER AS $$
BEGIN
    -- Update quantity_received in orders
    UPDATE public.orders 
    SET quantity_received = (
        SELECT COALESCE(SUM(quantity_received), 0)
        FROM public.deliveries
        WHERE order_id = NEW.order_id
    ),
    status = CASE 
        WHEN quantity_received = quantity THEN 'complete'
        WHEN quantity_received < quantity THEN 'partial'
        ELSE status
    END,
    updated_at = CURRENT_TIMESTAMP
    WHERE order_id = NEW.order_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger that runs the update function after any insert/update on deliveries
-- This ensures order status stays in sync with its deliveries automatically
CREATE TRIGGER trigger_update_order_status
AFTER INSERT OR UPDATE ON public.deliveries
FOR EACH ROW
EXECUTE FUNCTION public.update_order_status();