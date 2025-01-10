// types/database/inventory.ts
import { DRUM_LOCATION, DRUM_STATUS } from "@/types/enums/drums";

// Base type that matches the SQL/Prisma schema
export interface NewDrumBase {
  drum_id: number;
  material: string;
  date_processed: Date | null;
  status: DRUM_STATUS;
  location: DRUM_LOCATION;
  created_at: Date | null;
  updated_at: Date | null;
  order_id: number | null;
}

// Extended type that includes related data from the orders table
export interface NewDrum extends Omit<NewDrumBase, "order_id"> {
  order_id?: number;
  supplier?: string;
  date_ordered?: Date | null;
}

// Type for the API response
export interface DrumsResponse {
  drums: NewDrum[];
  total: number;
}

// Type for the query parameters
export interface DrumQueryParams {
  page: number;
  limit: number;
  sortField?: keyof NewDrum;
  sortOrder?: "asc" | "desc";
  status?: DRUM_STATUS;
}
