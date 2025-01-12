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
  notes?: string;
  created_at?: string;
  updated_at?: string;
  quantity_received: number;
  delivery_status: OrderStatus;
}

export interface OrderQueryParams {
  page: number;
  limit: number;
  sortField?: keyof Order;
  sortOrder?: "asc" | "desc";
}

export interface OrderGetResponse {
  orders: Order[];
  total: number;
}

export interface OrderPostParams {
  supplier: string;
  material: string;
  quantity: number;
}
export interface OrderPostResponse {
  order_id: number;
  supplier: string;
  material: string;
  quantity: number;
  date_ordered: Date | null;
  notes: string | null;
  created_at: Date | null;
  updated_at: Date | null;
  quantity_received: number;
  delivery_status: string;
}
