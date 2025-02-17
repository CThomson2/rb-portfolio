UPDATE inventory.transactions
SET
    tx_notes = 'Univar - H16895/92 - 25A03MA'
WHERE
    tx_id IN (631, 632);

SELECT
    tx_id,
    tx_type,
    tx_date,
    material,
    drum_id,
    tx_notes,
    direction,
    repro_id,
    delivery_id
FROM
    inventory.transactions
WHERE
    material = 'Methanol'
ORDER BY
    -- tx_id DESC,
    tx_date DESC;

--
-- SELECT * FROM inventory.new_drums WHERE status = 'available' AND material_type IN ('THF', 'Tet%furan');
-- UPDATE inventory.new_drums
-- SET material = 'Ethanol'
-- WHERE material LIKE 'Ethanol%';
-- AND order_id = 36
-- AND status = 'processed'
-- AND date_processed = '2025-01-10';
-- SELECT drum_id, order_id, material, date_processed, status, updated_at FROM inventory.new_drums 
SELECT
    *
FROM
    inventory.new_drums
    -- WHERE material LIKE 'Ethanol%'
WHERE
    order_id = 1
    -- AND status = 'available'
    -- WHERE import_id IS NOT NULL
ORDER BY
    -- updated_at DESC,
    drum_id DESC
LIMIT
    25;

-- Select the two Methanol drums with the lowest IDs of those with status: "available".
-- INSERT INTO inventory.transactions (tx_type, tx_date, material, drum_id);
-- VALUES
-- ('processing', '2025-01-10', 'Methanol')
--
-- Step. 1 Select the active/available drum with the lowest ID to emulate FIFO logistics
WITH
    selected_drums AS (
        SELECT
            material,
            drum_id
        FROM
            inventory.new_drums
        WHERE
            material = 'Ethanol'
            AND status = 'available'
        ORDER BY
            1 ASC
        LIMIT
            1
    )
    -- Step 2. Insert a transaction for the selected drum and complete other data inputs
INSERT INTO
    inventory.transactions (tx_type, tx_date, material, drum_id, tx_notes)
SELECT
    'processing',
    '2025-01-09',
    'Ethanol',
    drum_id,
    'Kimia - H17025 - 25A09QA'
FROM
    selected_drums;

--
INSERT INTO
    inventory.deliveries (
        order_id,
        quantity_received,
        date_received,
        batch_code
    )
VALUES
    (47, 11, '2024-11-14', '24/1933/006');

SELECT
    *
FROM
    inventory.deliveries
ORDER BY
    delivery_id DESC;

--
-- orders
-- reset quantity_received to 0 for test records
UPDATE inventory.orders
SET
    quantity_received = 0
WHERE
    order_id IN ();

-- data inserted via UI form, which sends a POST request to the server and INSERTS the data into the orders table
SELECT
    order_id,
    supplier,
    material,
    quantity,
    date_ordered,
    quantity_received,
    delivery_status
FROM
    inventory.orders
ORDER BY
    order_id DESC;

-- new_drums
SELECT
    drum_id,
    material,
    status,
    order_id
FROM
    inventory.new_drums
ORDER BY
    created_at DESC;

-- deliveries
INSERT INTO
    inventory.deliveries (
        order_id,
        quantity_received,
        date_received,
        batch_code
    )
VALUES
    (48, 2, CURRENT_DATE, 'TEST-PARTIAL-EXCEEDS');

SELECT
    delivery_id,
    order_id,
    quantity_received,
    date_received,
    batch_code
FROM
    inventory.deliveries
ORDER BY
    delivery_id DESC;


---


SELECT 
	o.order_id, o.material, o.supplier, d.delivery_id, o.quantity, d.quantity_received, o.date_ordered, d.date_received
FROM
	inventory.deliveries d
LEFT JOIN
	inventory.orders o
ON
	d.order_id = o.order_id
ORDER BY order_id DESC;

--

-- DELETE FROM inventory.orders
-- WHERE order_id >= 50;
SELECT * FROM inventory.orders
ORDER BY order_id DESC;

--

SELECT * FROM inventory.new_drums
ORDER BY drum_id DESC;

-- SELECT * FROM inventory.transactions
-- ORDER BY tx_id DESC;
-- SELECT MAX(repro_drum_id) FROM inventory.repro_drums;