"use client";

import React, { useState } from "react";
import { queries } from "@/database/repositories/orders/queries";
import { BentoGrid } from "@/components/ui/BentoGrid";
import { useMutation, useQuery } from "@tanstack/react-query";
import { NewOrder, OrderGetResponse } from "@/types/database/orders";
import { SortingState } from "@tanstack/react-table";
import Link from "next/link";
import { ActionButton, SearchBar } from "@/components/shared/table";

const filterOptions = [
  { label: "All", value: "all" },
  { label: "By Material", value: "material" },
  { label: "By Supplier", value: "supplier" },
  { label: "By Status", value: "delivery_status" },
];

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
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["orders", pageIndex, pageSize],
    queryFn: async () => {
      const response = await fetch(
        `/api/inventory/orders?page=${pageIndex + 1}&limit=${pageSize}`
      );
      if (!response.ok) throw new Error("Failed to fetch orders");
      const data: OrderGetResponse = await response.json();
      return {
        rows: data.orders,
        total: data.total,
      };
    },
    staleTime: 30000,
  });

  const mutation = useMutation<OrderGetResponse, Error, NewOrder>({
    mutationFn: async (newOrder) => {
      const response = await fetch("/api/inventory/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder),
      });
      if (!response.ok) throw new Error("Failed to create order");
      return response.json();
    },
    onSuccess: () => {
      refetch(); // Refresh data after successful insertion
    },
  });

  const handleAddOrder = (orderData: NewOrder) => {
    console.log("Attempting to add order:", orderData);
    mutation.mutate(orderData, {
      onSuccess: (data) => {
        console.log("Order added successfully:", data);
      },
      onError: (error) => {
        console.error("Failed to add order:", error);
      },
      onSettled: (data, error) => {
        console.log("Mutation settled:", { data, error });
      },
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="space-y-4">
      <div className="relative flex flex-col md:flex-row items-center justify-between px-8 py-8 bg-slate-700 rounded-md">
        <div className="flex flex-col md:flex-row items-center w-full md:w-auto">
          <div className="mb-4 md:mb-0 md:mr-4">
            <SearchBar
              filterOptions={filterOptions}
              selectedFilter={selectedFilter}
              onFilterChange={setSelectedFilter}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </div>
          {/* <ActionButton text="Manage Inventory" href="/inventory/drums/new" /> */}
          {/* Form to add a new order */}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            type="button"
            onClick={() =>
              handleAddOrder({
                supplier: "New Supplier",
                material: "New Material",
                quantity: 10,
              })
            }
          >
            Add Order
          </button>
        </div>
        <div className="flex-row gap-4 hidden lg:flex">
          <Link href="/inventory/transactions" className="mx-auto">
            <button className="flex flex-col items-center px-6 py-3 bg-slate-600 rounded-md hover:bg-slate-500 transition-colors">
              <span className="text-xs text-gray-300">Go to</span>
              <span className="font-medium">Transactions</span>
            </button>
          </Link>
          <Link href="/products" className="mx-auto">
            <button className="flex flex-col items-center px-6 py-3 bg-slate-600 rounded-md hover:bg-slate-500 transition-colors">
              <span className="text-xs text-gray-300">Go to</span>
              <span className="font-medium">Products</span>
            </button>
          </Link>
        </div>
      </div>

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
                  <strong>Ordered:</strong> {order.quantity}
                </p>
                <p>
                  <strong>Received:</strong> {order.quantity_received || 0}
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
                  Ordered on:{" "}
                  {order.date_ordered
                    ? new Date(order.date_ordered).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>
          ))}
        </BentoGrid>
      </div>
    </div>
  );
};

export default OrdersGrid;
