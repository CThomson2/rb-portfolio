import { OrderStatus } from "@/database/repositories/shared/types";

export interface NewOrder {
  supplier: string;
  material: string;
  quantity: number;
  notes?: string;
}

export interface OrderGridItem {
  order_id: number;
  supplier: string;
  material: string;
  quantity: number;
  date_ordered: string;
  quantity_received: number;
  delivery_status: OrderStatus;
}

export interface Order {
  order_id: number;
  supplier: string;
  material: string;
  quantity: number;
  date_ordered?: string;
  quantity_received: number;
  delivery_status: OrderStatus;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface OrderQueryParams {
  page: number;
  limit: number;
  sortField?: keyof Order;
  sortOrder?: "asc" | "desc";
}

export interface OrderResponse {
  orders: Order[];
  total: number;
}
