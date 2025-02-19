import type { OrderStatusType } from "@/types/constant/inventory/orders";

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
  status: OrderStatusType;
  po_number?: string | null;
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
  status: OrderStatusType;
  eta_start?: Date | string | null;
  eta_end?: Date | string | null;
  eta_status?: "tbc" | "confirmed" | "overdue";
  po_number?: string | null;
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
  po_number: string | null;
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
  status: string;
  po_number: string | null;
}

export interface OrderPostResponse extends OrderFormData {
  drumIds: number[];
}

export interface OrderPostRequest extends OrderFormData {
  drumIds: number[];
  status_code: 200 | 201 | 400 | 404 | 500;
}
