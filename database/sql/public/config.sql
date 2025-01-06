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