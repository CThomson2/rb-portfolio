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
        setOrders(data);
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
            />
          ))}
        </div>
      )}
    </div>
  );
}
