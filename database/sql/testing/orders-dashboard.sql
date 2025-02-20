WITH
    MaterialStock AS (
        SELECT
            nd.material,
            COUNT(*) as current_stock
        FROM
            inventory.new_drums nd
        WHERE
            nd.status = 'available'
        GROUP BY
            nd.material
    )
SELECT
    rm.chemical_group,
    COALESCE(SUM(ms.current_stock), 0) as total_stock,
    COUNT(DISTINCT rm.name) as material_count,
    jsonb_agg (
        jsonb_build_object (
            'name',
            rm.name,
            'stock',
            COALESCE(ms.current_stock, 0),
            'cas_number',
            rm.cas_number
        )
    ) as materials
FROM
    public.raw_materials rm
    LEFT JOIN MaterialStock ms ON ms.material = rm.name
GROUP BY
    rm.chemical_group
ORDER BY
    total_stock DESC