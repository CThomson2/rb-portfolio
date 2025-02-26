INSERT INTO
    inventory.orders (supplier, material, quantity, quantity_received)
VALUES
    -- Alkanes
    ('2024 EOY Stock', 'Pentane', 47, 47),
    ('2024 EOY Stock', 'Isohexane', 6, 6),
    ('2024 EOY Stock', 'Hexane 95%', 1, 1),
    ('2024 EOY Stock', 'Hexane 99%', 50, 50),
    ('2024 EOY Stock', 'Heptane 95%', 30, 30),
    ('2024 EOY Stock', 'Cyclohexane', 4, 4),
    ('2024 EOY Stock', 'Isopentane', 3, 3),
    ('2024 EOY Stock', 'Cyclopentane', 1, 1),
    ('2024 EOY Stock', 'Petroleum Spirit', 16, 16),
    ('2024 EOY Stock', 'Nonane', 1, 1),
    ('2024 EOY Stock', 'White Spirit', 2, 2),
    -- Halogenated Chlorinates
    ('2024 EOY Stock', 'Toluene', 6, 6),
    -- Other Hydrocarbons
    ('2024 EOY Stock', '1,4-Dioxane', 1, 1),
    ('2024 EOY Stock', '1,2-Dichlorobenzene', 6, 6),
    ('2024 EOY Stock', '1.1.2', 2, 2),
    ('2024 EOY Stock', 'Acetic Acid', 14, 14),
    ('2024 EOY Stock', 'Acetone', 24, 24),
    ('2024 EOY Stock', 'Acetonitrile', 87, 87),
    ('2024 EOY Stock', 'Butyl Acetate', 2, 2),
    ('2024 EOY Stock', 'Caustic Soda', 1, 1),
    ('2024 EOY Stock', 'CS2', 30, 30),
    ('2024 EOY Stock', 'Collidine', 1, 1),
    ('2024 EOY Stock', 'Dichloromethane', 24, 24),
    ('2024 EOY Stock', 'Diethyl Ether', 2, 2),
    ('2024 EOY Stock', 'DMAC', 2, 2),
    ('2024 EOY Stock', 'DMF', 2, 2),
    ('2024 EOY Stock', 'DMSO', 3, 3),
    ('2024 EOY Stock', 'Ethyl Acetate', 13, 13),
    ('2024 EOY Stock', 'Ethyl Benzene', 1, 1),
    ('2024 EOY Stock', 'Isopropanol', 5, 5),
    ('2024 EOY Stock', 'Isobutanol', 2, 2),
    ('2024 EOY Stock', 'Lutidine', 1, 1),
    ('2024 EOY Stock', 'MEK', 2, 2),
    ('2024 EOY Stock', 'Methanol', 34, 34),
    ('2024 EOY Stock', 'Methyl Acetate', 1, 1),
    ('2024 EOY Stock', 'Methyl Formate', 3, 3),
    ('2024 EOY Stock', 'MTBE', 10, 10),
    ('2024 EOY Stock', 'n-Butanol', 7, 7),
    ('2024 EOY Stock', 'Perchloroethylene', 3, 3),
    ('2024 EOY Stock', 'Phenol', 1, 1),
    ('2024 EOY Stock', 'Piperidine', 2, 2),
    ('2024 EOY Stock', 'Pyridine', 50, 50),
    ('2024 EOY Stock', 'Tetrahydrofuran', 3, 3),
    ('2024 EOY Stock', 'T-Butanol', 3, 3);

-- REPRO INVENTORY
INSERT INTO
    inventory.repro_drums (material_type, current_volume)
VALUES
    ('Hexane 99%', 200),
    ('Hexane 99%', 200),
    --
    ('Heptane 95%', 200),
    ('Heptane 95%', 200),
    ('Heptane 95%', 200),
    ('Heptane 95%', 200),
    ('Heptane 95%', 200),
    ('Heptane 95%', 200),
    --
    ('Heptane', 200),
    ('Heptane', 200),
    ('Heptane', 200),
    ('Heptane', 200),
    ('Heptane', 200),
    ('Heptane', 200),
    ('Heptane', 200),
    ('Heptane', 200),
    ('Heptane', 200),
    ('Heptane', 200),
    ('Heptane', 200),
    ('Heptane', 200),
    ('Heptane', 200),
    ('Heptane', 200),
    ('Heptane', 200),
    --
    ('Cyclohexane', 200),
    ('Cyclohexane', 200),
    ('Cyclohexane', 200),
    --
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    ('Isooctane 95%', 200),
    --
    ('Isopentane', 100),
    --
    ('Petroleum Spirit', 200),
    --
    ('Decane', 200),
    ('Decane', 200),
    --
    ('Nonane', 200),
    --
    ('White Spirit', 200),
    --
    ('Toluene', 200),
    --
    ('1,4-Dioxane', 200),
    ('1,4-Dioxane', 200),
    ('1,4-Dioxane', 200),
    ('1,4-Dioxane', 200),
    ('1,4-Dioxane', 200),
    ('1,4-Dioxane', 200),
    ('1,4-Dioxane', 200),
    ('1,4-Dioxane', 200),
    --
    ('2-Methoxyethanol', 200),
    --
    ('Acetic Acid', 200),
    ('Acetic Acid', 200),
    ('Acetic Acid', 200),
    ('Acetic Acid', 200),
    ('Acetic Acid', 200),
    --
    ('Acetone', 200),
    --
    ('Acetonitrile', 200),
    ('Acetonitrile', 200),
    ('Acetonitrile', 200),
    ('Acetonitrile', 200),
    ('Acetonitrile', 200),
    ('Acetonitrile', 200),
    ('Acetonitrile', 200),
    ('Acetonitrile', 200),
    --
    ('Butyl Acetate', 200),
    --
    ('CS2', 200),
    ('CS2', 200),
    ('CS2', 200),
    --
    ('Dichloromethane', 200),
    ('Dichloromethane', 200),
    ('Dichloromethane', 200),
    ('Dichloromethane', 200),
    ('Dichloromethane', 200),
    ('Dichloromethane', 200),
    ('Dichloromethane', 200),
    ('Dichloromethane', 200),
    ('Dichloromethane', 200),
    ('Dichloromethane', 200),
    --
    ('Diethyl Ether', 200),
    --
    ('DMAC', 200),
    ('DMAC', 200),
    ('DMAC', 200),
    --
    ('DMF', 200),
    ('DMF', 200),
    ('DMF', 200),
    ('DMF', 200),
    --
    ('DMSO', 100),
    --
    ('Ethyl Acetate', 200),
    ('Ethyl Acetate', 200),
    ('Ethyl Acetate', 200),
    ('Ethyl Acetate', 200),
    --
    ('Isopropanol', 200),
    ('Isopropanol', 200),
    ('Isopropanol', 200),
    ('Isopropanol', 200),
    ('Isopropanol', 200),
    ('Isopropanol', 200),
    --
    ('Isobutanol', 200),
    ('Isobutanol', 200),
    ('Isobutanol', 200),
    ('Isobutanol', 200),
    --
    ('MEK', 200),
    --
    ('Methanol', 200),
    ('Methanol', 200),
    ('Methanol', 200),
    ('Methanol', 200),
    ('Methanol', 200),
    ('Methanol', 200),
    ('Methanol', 200),
    --
    ('MIBK', 200),
    ('MIBK', 200),
    ('MIBK', 200),
    ('MIBK', 200),
    ('MIBK', 200),
    ('MIBK', 200),
    ('MIBK', 200),
    --
    ('MTBE', 200),
    --
    ('n-Butanol', 200),
    ('n-Butanol', 200),
    ('n-Butanol', 200),
    ('n-Butanol', 200),
    ('n-Butanol', 200),
    ('n-Butanol', 200),
    ('n-Butanol', 200),
    ('n-Butanol', 200),
    ('n-Butanol', 200),
    ('n-Butanol', 200),
    ('n-Butanol', 200),
    ('n-Butanol', 200),
    ('n-Butanol', 200),
    ('n-Butanol', 200),
    ('n-Butanol', 200),
    ('n-Butanol', 200),
    ('n-Butanol', 200),
    --
    ('NMP', 200),
    ('NMP', 200),
    ('NMP', 200),
    ('NMP', 200),
    ('NMP', 200),
    ('NMP', 200),
    ('NMP', 200),
    ('NMP', 200),
    --
    ('Octanol', 200),
    --
    ('Pyridine', 200),
    ('Pyridine', 200),
    ('Pyridine', 200),
    ('Pyridine', 200),
    ('Pyridine', 200),
    ('Pyridine', 200),
    ('Pyridine', 200),
    ('Pyridine', 200),
    ('Pyridine', 200),
    ('Pyridine', 200),
    ('Pyridine', 200),
    ('Pyridine', 200),
    ('Pyridine', 200),
    ('Pyridine', 200),
    ('Pyridine', 200),
    --
    ('Tetrahydrofuran', 200),
    ('Tetrahydrofuran', 200),
    ('Tetrahydrofuran', 200);

-- INSERT INTO inventory.new_drums (order_id, material_type) 
-- VALUES (1, '1.1.2'),
-- (1, '1.1.2'),
-- -- 6
-- (1, '1,2-Dichlorobenzene'),
-- (1, '1,2-Dichlorobenzene'),
-- (1, '1,2-Dichlorobenzene'),
-- (1, '1,2-Dichlorobenzene'),
-- (1, '1,2-Dichlorobenzene'),
-- (1, '1,2-Dichlorobenzene'),
-- -- 12 Acetic Acid
-- (1, 'Acetic Acid'),
-- (1, 'Acetic Acid'),
-- (1, 'Acetic Acid'),
-- (1, 'Acetic Acid'),
-- (1, 'Acetic Acid'),
-- (1, 'Acetic Acid'),
-- (1, 'Acetic Acid'),
-- (1, 'Acetic Acid'),
-- (1, 'Acetic Acid'),
-- (1, 'Acetic Acid'),
-- (1, 'Acetic Acid'),
-- (1, 'Acetic Acid'),
-- -- 2 Acetic Anhydride
-- (1, 'Acetic Anhydride'),
-- (1, 'Acetic Anhydride'),
-- -- 21 Acetone
-- (1, 'Acetone'),
-- (1, 'Acetone'),
-- (1, 'Acetone'),
-- (1, 'Acetone'),
-- (1, 'Acetone'),
-- (1, 'Acetone'),
-- (1, 'Acetone'),
-- (1, 'Acetone'),
-- (1, 'Acetone'),
-- (1, 'Acetone'),
-- (1, 'Acetone'),
-- (1, 'Acetone'),
-- (1, 'Acetone'),
-- (1, 'Acetone'),
-- (1, 'Acetone'),
-- (1, 'Acetone'),
-- (1, 'Acetone'),
-- (1, 'Acetone'),
-- (1, 'Acetone'),
-- (1, 'Acetone'),
-- (1, 'Acetone'),
-- -- 78 Acetonitrile
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- (1, 'Acetonitrile'),
-- -- 3 Butyl Acetate
-- (1, 'Butyl Acetate'),
-- (1, 'Butyl Acetate'),
-- (1, 'Butyl Acetate'),
-- -- 2 Caustic Soda
-- (1, 'Caustic Soda'),
-- (1, 'Caustic Soda'),
-- -- 1 Chlorobenzene
-- (1, 'Chlorobenzene'),
-- -- 24 CS2
-- (1, 'CS2'),
-- (1, 'CS2'),
-- (1, 'CS2'),
-- (1, 'CS2'),
-- (1, 'CS2'),
-- (1, 'CS2'),
-- (1, 'CS2'),
-- (1, 'CS2'),
-- (1, 'CS2'),
-- (1, 'CS2'),
-- (1, 'CS2'),
-- (1, 'CS2'),
-- (1, 'CS2'),
-- (1, 'CS2'),
-- (1, 'CS2'),
-- (1, 'CS2'),
-- (1, 'CS2'),
-- (1, 'CS2'),
-- (1, 'CS2'),
-- (1, 'CS2'),
-- (1, 'CS2'),
-- (1, 'CS2'),
-- (1, 'CS2'),
-- (1, 'CS2'),
-- -- 1 Dichloroethane
-- (1, 'Dichloroethane'),
-- --