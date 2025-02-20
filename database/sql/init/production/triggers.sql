CREATE OR REPLACE FUNCTION update_pr_status()
RETURNS TRIGGER AS $$
DECLARE
    current_status VARCHAR(20);
    is_scheduled BOOLEAN;
BEGIN
    -- Check if the record in `transactions` with `NEW.dist_id` has a status of `scheduled`, or does not yet exist at time of scanning
    -- When a unit of stock is scanned, updating transactions, and has a `tx_type` of `processing`,
    --   then the record will also have a `dist_id` (foreign key and non-null constraint for processing
    --   `processing` transactions).
    -- This should either:
    --  A) update the existing record in `pr_distillations` with PK dist_id = NEW.dist_id, if it does exist (IF count of records WHERE (PK dist_id = NEW.dist_id  status = 'scheduled') = 1, which is the case if the `pr_schedule` table was created before the drum was scanned
    --  B) create a new record in `pr_distillations`, if it doesn't yet exist (IF count of records WHEREE( (PK dist_id = NEW.dist_id = 0)
    -- Generally, we want the record to already exist prior to scanning, to maintain data integrity, as well as ensure that all drums removed from inventory are known to the database as drums scheduled for processing via the `pr_schedules` table
    IF NEW.status = 'processing' THEN
        -- Check if the record in `pr_distillations` has been created already (i.e. by the external trigger function defined on `pr_schedules`)
        -- SELECT EXISTS returns true/false, so we can use it to check if the record exists (as a PK check can only return max. 1 row)
        SELECT EXISTS (
            SELECT 1 
            FROM production.pr_distillations
            WHERE dist_id = NEW.dist_id
            AND status = 'scheduled'
        ) INTO is_scheduled;

        IF is_scheduled THEN
            UPDATE production.pr_distillations
            SET status = 'scanned'
            WHERE dist_id = NEW.dist_id;
        -- If the record does not exist, then we need to create a new one with status `scanned`
        -- However this is not ideal as we don't have any information about the record (which would be the case if it has been craeted from its parent table `pr_schedules`. If a drum is scanned for processing without the database `expecting` it, )
        ELSE
            -- INSERT INTO production.pr_distillations (dist_id, status)
        END IF;

        
        -- Update declared `current_status` variable with

        IF current_status = 1 THEN
            UPDATE production.pr_distillations

        ELSE
            INSERT INTO production.pr_distillations (dist_id, status)
            VALUES (NEW.dist_id, 'processing');
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_pr_status_trigger
AFTER INSERT OR UPDATE ON inventory.transactions
FOR EACH ROW
EXECUTE FUNCTION update_pr_status();