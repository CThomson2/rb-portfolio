import { OrderStatus } from "../../database/repositories/shared/types";

export interface OrderCreate {
  supplier: string;
  material: string;
  quantity: number;
  notes?: string;
}

export interface Order {
  order_id: string;
  supplier: string;
  material: string;
  quantity: number;
  quantity_received: number;
  status: OrderStatus;
  notes?: string;
  created_at: string;
  updated_at: string;
}
