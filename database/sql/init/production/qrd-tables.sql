-- qrd_010: Production Schedule
-- qrd_011: Individual Distillation Production Record

-- QRD_011 is a child table of QRD_010, as the schedule determines the quantity and data configuration for each production record for that day
-- These table records are "standalone" records, in that they each relate specifically to a single production record for a single day

-- The production schedule table - qrd_011, representing the QRD_010 - will contain a list of records, where each record represents a single distillation run for a single day. Initially, these contain "planned" data, which defines the expected output of the distillation runs for the many QRD_011 records that will be created for that day
-- For each day, the single production schedule record will be used to create the multiple production records that will be used to record the actual distillation data for that day (one for each still that will be used, i.e. Still A, Still B etc.)


-- QRD_010: Production Schedule
CREATE TABLE production.pr_schedule (
	schedule_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	production_date DATE NOT NULL,
	lab_site CHAR(3) NOT NULL CHECK (lab_site IN ('OLD', 'NEW')),
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	UNIQUE (production_date, lab_site)
);
create trigger update_pr_schedule_updated_at
before update on production.pr_schedule
for each row
execute function update_updated_at_column();

-- QRD_011: Individual Distillation Production Record
CREATE TABLE production.pr_distillations (
	dist_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	schedule_id INTEGER NOT NULL REFERENCES pr_schedule(schedule_id),
	still_id INTEGER NOT NULL REFERENCES production.stills (still_id),
	status VARCHAR(20) DEFAULT 'scheduled' -- Example status field: 'scheduled' (initial status after pr_schedule record is created), 'scanned' (after being scanned out of inventory), 'staged' (after being moved into lab and UI form completed by transporter with initials), 'loaded' (after operator loads still and records initials), 'in-progress' (after operator begins distillation and records initials), 'completed', 'cancelled'
	transporter_initials VARCHAR(3) NOT NULL, -- when each stage initials + date trigger the status to next corresponding status. It cannot go to 'loaded' without loader initials and date - this data is the only way to progress the status. And the record can't be updated with final info once it's in 'loaded' stage, thus all initials are effectively not allowed to be NULL.
	transport_date TIMESTAMP,
	-- Current status: 'transported'
	-- Next status: 'staged' (updated after operator transports drum(s), logs their ID(s) and logs his initials - datetime automatic á la `updated_at` table fields)
	-- drums-to-distillations is many-to-many, so the junction table `drums_in_distillation` is used.
	-- also, `transactions` (maybe move to public schema) logs outgoing drums from stock and has a `distillation_id` (dist_id FK) for each scanned drum, so perhaps that could handle the relation as the table ia meant as that which handles all scannings events.
	loader_initials VARCHAR(3),
	load_date TIMESTAMP,
	volume_in NUMERIC(5,2), -- Remove if we don'tactually measure this (not on QRD form, and drums are standardised within small tolerance)
	-- Next status: 'in-progress'
	operator_initials VARCHAR(3),
	start_time TIMESTAMP,
	-- Next status: 'completed'
	end_time TIMESTAMP,
	volume_output NUMERIC(5,2),
);

-- Order Details of expected finihsed goods to be produced from the related distillation from a given still on any day
-- Batch number is a function of the data of production completion, still code, and the grade produced - i.e. informatin directly on the referenced pr_distillation_record (although grade, quantity is not known in advance of the completion of the distillation, so this table isn't going to be a historical record of all distillations produced. It's purpose is to hold the data on the production details in _advance_ of the distillation, so workers know what they are aiming for.

CREATE TABLE production.pr_details (
	detail_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	schedule_id INTEGER NOT NULL REFERENCES pr_schedule(schedule_id),
	dist_id INTEGER NOT NULL REFERENCES pr_distillations(dist_id),
	order_id INTEGER NOT NULL REFERENCES sales.orders(order_id), -- orders has a many-to-one relationship with distillations, as each order can have multiple distillations associated with it (if the order is for a blended product - or simply multiple different SKUs). It holds the data of the order and client details, and the `pr_details` table will hold the data of the production details for each distillation.
);

-- Similar to the pr_details, but this table has the definite, non-changing data of produced batches. It will also serve as the gateway between the `production` and `inventory` schemas - though maybe the `inventory` schema for finished goods may be separate from that for raw materials.
-- The records are created as "pending" or similar, at the moment the production schedule is created and the `pr_detao;s` gets auto-updated with new records from the given schedule. This update triggers the records in `pr_batches` to be created.
CREATE TABLE production.pr_batches (
	batch_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	detail_id INTEGER NOT NULL REFERENCES pr_details(detail_id),
	batch_code CHAR(7), -- Format: "YYMDDSG", where "M" is written as its corresponding alphabetical character (e.g. January = 'A'); where S is the still_code and G is the one-letter grade shorthand (A, B, C, or D)
	-- TODO: Add trigger to generate the batch number once batch is complete and tested for purity and grade
	-- TODO: Add trigger to generate the batch number once batch is complete and tested for purity/grade
	batch_date DATE DEFAULT NULL, -- only set once the batch has been completed
	batch_status VARCHAR(20) NOT NULL CHECK (batch_status IN ('pending', 'completed', 'cancelled')),
	batch_grade VARCHAR(20) DEFAULT NULL,
	batch_purity NUMERIC(5,2) DEFAULT NULL,
	batch_volume NUMERIC(5,2) DEFAULT NULL, -- generally more than the required quanntity in `pr_details`. I.e. if a client orders 100 litres, the batch may be 105 litres, with the extra 5 litres being a buffer for losses in the purification process. Or even a lot more, if one batch will be numerous smaller orders.



);



-- RELATIONS
-- qrd_011_qrd_010_fk

-- Constraints and validations

-- 