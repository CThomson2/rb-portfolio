ALTER TABLE inventory.orders
ADD COLUMN eta_start DATE,
ADD COLUMN eta_end DATE,
ADD CONSTRAINT eta_dates_valid CHECK (eta_end >= eta_start),
ADD CONSTRAINT eta_end_requires_start CHECK ((eta_start IS NULL AND eta_end IS NULL) OR 
                                           (eta_start IS NOT NULL AND eta_end IS NOT NULL));

