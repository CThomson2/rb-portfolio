"use client";

import { useEffect, useState, useCallback } from "react";
import { BaseWidget } from "./BaseWidget";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import type { Order } from "@/types/database/inventory/orders";
import debounce from "lodash/debounce";

interface OrderStatus {
  label: string;
  value: string;
  className: string;
}

const orderStatuses: Record<string, OrderStatus> = {
  pending: {
    label: "Pending",
    value: "pending",
    className: "bg-yellow-100 text-yellow-700",
  },
  partial: {
    label: "Partial",
    value: "partial",
    className: "bg-blue-100 text-blue-700",
  },
  complete: {
    label: "Complete",
    value: "complete",
    className: "bg-green-100 text-green-700",
  },
};

function OrderStatusBadge({ status }: { status: string }) {
  const statusConfig = orderStatuses[status] || {
    label: status.charAt(0).toUpperCase() + status.slice(1),
    value: status,
    className: "bg-gray-100 text-gray-700",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
        statusConfig.className
      )}
    >
      {statusConfig.label}
    </span>
  );
}

interface RecentOrdersWidgetProps {
  id: string;
}

/**
 * Widget that displays a list of recent orders with their status
 *
 * Features:
 * - Shows supplier name and order ID
 * - Color-coded status badges
 * - Order quantity and date
 * - Responsive layout that works on all screen sizes
 */
export function RecentOrdersWidget({ id }: RecentOrdersWidgetProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState("");

  // Memoize fetchOrders
  const fetchOrders = useCallback(async (searchTerm?: string) => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();
      if (searchTerm) {
        // Try to match against both supplier and material
        params.append("q", searchTerm);
      }

      const response = await fetch(`/api/inventory/orders/recent?${params}`);
      if (!response.ok) throw new Error("Failed to fetch orders");

      const data = await response.json();
      setOrders(data.orders);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch orders");
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  }, []); // Empty deps array since state setters are stable

  // Memoize debouncedFetch with fetchOrders as dependency
  const debouncedFetch = useCallback(
    (searchTerm: string) => {
      const debouncedFn = debounce((term: string) => {
        fetchOrders(term);
      }, 300);
      debouncedFn(searchTerm);
      return () => debouncedFn.cancel();
    },
    [fetchOrders]
  );

  // Now it's safe to include fetchOrders in useEffect deps
  useEffect(() => {
    fetchOrders();
    // Cleanup debounced function on unmount
    return () => {
      debouncedFetch("");
    };
  }, [fetchOrders, debouncedFetch]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilter(value);
    debouncedFetch(value);
  };

  return (
    <BaseWidget id={id} title="Recent Orders">
      <div className="space-y-4">
        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search by supplier or material..."
            value={filter}
            onChange={handleSearch}
            className="w-full rounded-md border border-input pl-8 pr-2 py-2 text-sm 
              bg-background ring-offset-background placeholder:text-muted-foreground 
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        {isLoading ? (
          <div className="text-center py-4 text-muted-foreground">
            Loading...
          </div>
        ) : error ? (
          <div className="text-center py-4 text-red-500">{error}</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">
            No orders found
          </div>
        ) : (
          <div className="rounded-md border">
            <div className="divide-y">
              {orders.map((order) => (
                <div
                  key={order.order_id}
                  className="flex items-center justify-between p-4"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{order.material}</p>
                    <p className="text-xs text-muted-foreground">
                      {order.supplier}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <OrderStatusBadge status={order.status} />
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {order.quantity_received}/{order.quantity}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {order.date_ordered
                          ? new Date(order.date_ordered).toLocaleDateString()
                          : "No date"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </BaseWidget>
  );
}
