"use client";

import React, { useState } from "react";
import { queries } from "@/database/repositories/orders/queries";
import { BentoGrid } from "@/components/ui/BentoGrid";
import { useQuery } from "@tanstack/react-query";
import { OrderResponse } from "@/types/database/orders";
import { SortingState } from "@tanstack/react-table";

const OrdersGrid = () => {
  const [sorting, setSorting] = useState<SortingState>([
    { id: "order_id", desc: true },
  ]);
  const [rowSelection, setRowSelection] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(50);

  // Fetch orders from the API
  const { data, isLoading, error } = useQuery({
    queryKey: ["orders", pageIndex, pageSize],
    queryFn: async () => {
      const response = await fetch(
        `/api/inventory/orders?page=${pageIndex + 1}&limit=${pageSize}`
      );
      if (!response.ok) throw new Error("Failed to fetch orders");
      const data: OrderResponse = await response.json();
      return {
        rows: data.orders,
        total: data.total,
      };
    },
    staleTime: 30000,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <BentoGrid>
        {data?.rows.map((order) => (
          <div
            key={order.order_id}
            className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="mb-2">
              <h2 className="text-lg font-semibold text-secondary">
                {order.supplier}
              </h2>
              <p className="text-sm text-gray-500">{order.material}</p>
            </div>
            <div className="mb-2 text-secondary">
              <p>
                <strong>Quantity Ordered:</strong> {order.quantity}
              </p>
              <p>
                <strong>Quantity Received:</strong>{" "}
                {order.quantity_received || 0}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`${
                    order.delivery_status === "complete"
                      ? "text-green-600"
                      : order.delivery_status === "partial"
                      ? "text-yellow-600"
                      : "text-gray-600"
                  } font-medium`}
                >
                  {order.delivery_status}
                </span>
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">
                Ordered on: {new Date(order.date_ordered).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </BentoGrid>
    </div>
  );
};

export default OrdersGrid;
