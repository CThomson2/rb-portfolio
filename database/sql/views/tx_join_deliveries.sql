SELECT tx_id, tx_type, tx_date, t.batch_code, material, direction, drum_id, t.delivery_id, t.order_id, d.batch_code AS "`deliveries` batch_code"
FROM inventory.transactions t
LEFT JOIN inventory.deliveries d
ON d.delivery_id = t.delivery_id
WHERE tx_type LIKE 'imp%'
-- WHERE drum_id >= 7824
-- WHERE t.batch_code IS NOT NULL
ORDER BY tx_id DESC;
	 -- drum_id ASC,
	-- tx_id DESC;