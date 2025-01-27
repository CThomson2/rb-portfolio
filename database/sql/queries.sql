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