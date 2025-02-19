-- DELETE FROM inventory.transactions
-- WHERE tx_id >= 1070
-- 	AND tx_date = '2025-02-18';

-- DELETE FROM inventory.deliveries
-- WHERE deliveries.delivery_id = 76;

-- DELETE FROM inventory.orders
-- WHERE supplier = 'Ineos'
-- 	AND order_id IN (85, 91);

SELECT * FROM inventory.orders
ORDER BY order_id DESC;