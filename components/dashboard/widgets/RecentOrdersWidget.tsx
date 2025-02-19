"use client";

import { BaseWidget } from "./BaseWidget";
import { cn } from "@/lib/utils";
import type { Order as OrderRecord } from "@/types/database/inventory/orders";

/**
 * Represents an order in the system
 */
interface Order {
  /** Unique order identifier */
  id: number;
  /** Purchase order number */
  po_number: string;
  /** Name of the supplier */
  supplier: string;
  /** Material ordered */
  material: string;
  /** Current status of the order */
  status: "pending" | "processing" | "completed" | "shipped";
  /** Total order amount with currency symbol */
  amount: string;
  /** Date the order was placed */
  date: string;
}

/**
 * Mock order data for demonstration
 * In a real app, this would come from an API/database
 */
const orders: Order[] = [
  {
    id: 1,
    po_number: "ORD-001",
    supplier: "Acme Labs",
    material: "Hexane",
    status: "shipped",
    amount: "$2,400",
    date: "2024-02-19",
  },
  {
    id: 2,
    po_number: "ORD-002",
    supplier: "BioTech Inc",
    material: "Methanol",
    status: "processing",
    amount: "$1,800",
    date: "2024-02-18",
  },
  {
    id: 3,
    po_number: "ORD-003",
    supplier: "ChemCorp",
    material: "Isopropanol",
    status: "pending",
    amount: "$3,200",
    date: "2024-02-18",
  },
];

/**
 * Displays a status badge with appropriate color coding based on order status
 */
function OrderStatus({ status }: { status: Order["status"] }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
        {
          "bg-green-100 text-green-700": status === "shipped",
          "bg-blue-100 text-blue-700": status === "processing",
          "bg-yellow-100 text-yellow-700": status === "pending",
          "bg-gray-100 text-gray-700": status === "completed",
        }
      )}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

/**
 * Widget that displays a list of recent orders with their status
 *
 * Features:
 * - Shows customer name and order ID
 * - Color-coded status badges
 * - Order amount and date
 * - Responsive layout that works on all screen sizes
 */
export function RecentOrdersWidget() {
  return (
    <BaseWidget title="Recent Orders">
      <div className="space-y-4">
        <div className="rounded-md border">
          <div className="divide-y">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4"
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium">{order.supplier}</p>
                  <p className="text-xs text-muted-foreground">{order.id}</p>
                </div>
                <div className="flex items-center gap-4">
                  <OrderStatus status={order.status} />
                  <div className="text-right">
                    <p className="text-sm font-medium">{order.amount}</p>
                    <p className="text-xs text-muted-foreground">
                      {order.date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BaseWidget>
  );
}
