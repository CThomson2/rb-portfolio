"use client";

import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import SidebarListItem from "./SidebarListItem";
<<<<<<< HEAD
import type { Order } from "@/types/database/orders";
=======
import type { Order, OrderETAStatus } from "@/types/database/inventory/orders";
>>>>>>> lint/production-build

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
<<<<<<< HEAD
      .then((data) => {
        // Process orders to check for overdue status
        const processedOrders = data.map((order: Order) => {
          let etaStatus = order.eta_status;

          // Check for overdue status
          if (etaStatus === "confirmed" && order.eta_end) {
            const etaEndDate = new Date(order.eta_end);
            if (etaEndDate < new Date()) {
              etaStatus = "overdue";
            }
          }

          return {
            ...order,
            eta_status: etaStatus,
          };
        });
        setOrders(processedOrders);
        setError("");
=======
      .then((orders: Order[]) => {
        setOrders(orders);
>>>>>>> lint/production-build
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-4">
        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-sm text-red-400">
        Error loading orders: {error}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {orders.map((order) => (
        <SidebarListItem
          key={order.order_id}
          id={order.order_id}
          material={order.material}
          supplier={order.supplier}
          quantity={order.quantity}
          quantityReceived={order.quantity_received}
          isOrder={true}
          eta={{
            startDate: order.eta_start ? new Date(order.eta_start) : undefined,
            endDate: order.eta_end ? new Date(order.eta_end) : undefined,
<<<<<<< HEAD
            status: order.eta_status,
=======
            status: order.eta_status ?? "tbc",
>>>>>>> lint/production-build
          }}
        />
      ))}
      {orders.length === 0 && (
        <div className="p-4 text-sm text-gray-400">No active orders</div>
      )}
    </div>
  );
}
