import type { OrderStatusType } from "@/types/constant/orders";

export interface NewOrder {
  supplier: string;
  material: string;
  quantity: number;
  notes?: string;
  date_ordered?: string;
}

export interface OrderGridItem {
  order_id: number;
  supplier: string;
  material: string;
  quantity: number;
  date_ordered: string;
  quantity_received: number;
  delivery_status: OrderStatusType;
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
  delivery_status: OrderStatusType;
  eta_start?: string;
  eta_end?: string;
  eta_status: "tbc" | "confirmed" | "overdue";
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
export interface OrderFormData {
  order_id: number;
  supplier: string;
  material: string;
  quantity: number;
  date_ordered: Date | string | null;
  notes: string | null;
  created_at: Date | string | null;
  updated_at: Date | string | null;
  quantity_received: number;
  delivery_status: string;
}

export interface OrderPostResponse extends OrderFormData {
  drumIds: number[];
}

export interface OrderPostRequest extends OrderFormData {
  drumIds: number[];
  status: 200 | 201 | 400 | 404 | 500;
}
