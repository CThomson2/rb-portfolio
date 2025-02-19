-- UPDATE inventory.deliveries
-- SET

SELECT d.drum_id, o.order_id, dy.delivery_id, d.material, o.supplier, dy.batch_code, o.quantity, o.quantity_received, o.status, d.status, d.date_processed FROM inventory.new_drums d
JOIN inventory.orders o ON d.order_id = o.order_id
LEFT JOIN inventory.deliveries dy ON d.order_id = dy.order_id
WHERE d.order_id >= 64
ORDER BY d.status DESC,
	drum_id ASC;