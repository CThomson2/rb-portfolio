CREATE TABLE production.labs (
    lab_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    lab_name VARCHAR(100) NOT NULL,
    lab_site CHAR(3) NOT NULL CHECK (lab_site IN ('OLD', 'NEW')),
    description TEXT
);

INSERT INTO production.labs (
    lab_name, lab_site, description
)
VALUES
('OS Main Lab', 'OLD', 'Old Site A-F Hydrocarbons (A - F)'),
('CS2 Lab', 'OLD', 'Old Site CS2 Outhouse (G)'),
('NS Main Lab', 'NEW', 'High-power Solvents Lab (M - S)');
('NS Water Lab', 'NEW', 'Water Purification (W) and Acetic Acid (T) Lab');


CREATE TABLE production.stills (
	still_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	still_code CHAR(1) NOT NULL UNIQUE,
	max_capacity NUMERIC(2,1) NOT NULL,
    power_rating_kw INTEGER NOT NULL,
    lab_id INTEGER NOT NULL REFERENCES production.labs(lab_id),
    is_vacuum BOOLEAN NOT NULL,
    is_operational BOOLEAN NOT NULL,
	description TEXT
);

INSERT INTO production.stills (
    still_code, power_rating_kw, max_capacity, lab_id, is_vacuum, is_operational, description
)
VALUES
('A', 18, 1, 1, false, true, 'First Acetonitrile Process'),
('B', 18, 1, 1, false, true, 'Second Acetonitrile Process'),
('C', 18, 1, 1, false, true, 'Alkanes'),
('D', 9, 1, 1, false, true, 'Ethers, Alcohols, Flammables'),
('E', 9, 1, 1, false, true, 'Ethers, Alcohols, Flammables'),
('F', 9, 1, 1, false, true, 'Pentane'),
('G', 9, 1, 2, false, true, 'Isolated for CS2'),
('M', 27, 2.5, 3, false, true, 'Main Methanol'),
('N', 27, 1, 3, false, true, 'High-power Solvents'),
('P', 27, 1, 3, false, false, 'OOC (temporarily out of service)'),
('Q', 27, 1, 3, false, true, 'Ketones, High-boil Solvents'),
('R', 27, 1, 3, true, true, 'Ketones, High-boil Solvents'),
('S', 27, 2.5, 3, false, true, 'Chlorinated Solvents'),
('T', 27, 1, 4, true, true, 'Carboxylic Acids'),
('W', 27, 1, 4, false, true, 'Three-stage Water Still');


CREATE TABLE production.operators (
    operator_id INTERGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    initials VARCHAR(3) NOT NULL UNIQUE,
    middle_names VARCHAR(100),
);

CREATE TABLE production.operators_work_labs (
    operator_id INTEGER NOT NULL REFERENCES production.operators(operator_id),
    lab_id INTEGER NOT NULL REFERENCES production.labs(lab_id),
    PRIMARY KEY (operator_id, lab_id)
);

INSERT INTO production.operators (
    first_name, last_name, initials
)
VALUES
('Colin', 'Kerr', 'CK'),
('Slawik', 'Knapik', 'SK'),
('Alistair', 'Nottman', 'AN'),
('Ally', 'D___', 'AD'),
('James', 'Doherty', 'JD'),
('Bogdan', 'O___', 'BO');