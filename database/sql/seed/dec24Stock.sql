INSERT INTO
    inventory.new_drums (order_id, material_type)
VALUES
    (1, 'Chlorobenzene'),
SELECT
    SUM(quantity)
FROM
    inventory.orders
OFFSET
    1;