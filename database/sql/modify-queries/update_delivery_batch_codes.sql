UPDATE inventory.deliveries d
SET batch_code = t.batch_code
FROM inventory.transactions t
WHERE d.delivery_id = t.delivery_id
	AND t.batch_code IS NOT NULL
	AND d.delivery_id BETWEEN 46;