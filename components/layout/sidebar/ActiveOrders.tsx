"use client";

import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import SidebarListItem from "./SidebarListItem";

interface Order {
  order_id: number;
  supplier: string;
  material: string;
  quantity: number;
  quantity_received?: number;
  eta_start?: string;
  eta_end?: string;
  eta_status: "tbc" | "confirmed" | "overdue";
}

export default function ActiveOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch from an API route that returns "pending" orders
    fetch("/api/inventory/orders/active")
      .then(async (res) => {
        if (!res.ok) throw new Error(await res.text());
        return res.json();
      })
      .then((data) => {
        // Process orders to check for overdue status
        const processedOrders = data.map((order: Order) => {
          if (order.eta_status === "confirmed" && order.eta_end) {
            const etaEndDate = new Date(order.eta_end);
            if (etaEndDate < new Date()) {
              return { ...order, eta_status: "overdue" as const };
            }
          }
          return order;
        });
        setOrders(processedOrders);
        setError("");
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div>
      {/* Loading indicator */}
      {isLoading && (
        <div className="flex justify-center py-4">
          <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="rounded-lg border border-red-800/20 bg-red-900/10 p-4">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !error && orders.length === 0 && (
        <div className="rounded-lg border border-gray-700/50 bg-gray-800/30 p-4">
          <p className="text-sm text-gray-400">No active orders</p>
        </div>
      )}

      {/* Orders list */}
      {orders.length > 0 && (
        <div className="space-y-3">
          {orders.map((order) => (
            <SidebarListItem
              key={order.order_id}
              id={order.order_id}
              material={order.material}
              supplier={order.supplier}
              quantity={order.quantity}
              quantityReceived={order.quantity_received}
              isOrder={true}
              eta={
                order.eta_start || order.eta_end
                  ? {
                      startDate: order.eta_start
                        ? new Date(order.eta_start)
                        : undefined,
                      endDate: order.eta_end
                        ? new Date(order.eta_end)
                        : undefined,
                      status: order.eta_status,
                    }
                  : { status: "tbc" }
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
