"use client";

import React, { useState } from "react";
import { queries } from "@/database/repositories/orders/queries";
import { BentoGrid } from "@/components/ui/BentoGrid";
import { useMutation, useQuery } from "@tanstack/react-query";
import { SortingState } from "@tanstack/react-table";
import Link from "next/link";
import { ActionButton, SearchBar } from "@/components/shared/table";
import { GridModal } from "./GridModal";
import type { Order, OrderGetResponse } from "@/types/database/orders";

const filterOptions = [
  { label: "All", value: "all" },
  { label: "By Material", value: "material" },
  { label: "By Supplier", value: "supplier" },
  { label: "By Status", value: "delivery_status" },
];

const OrdersGrid = () => {
  // State for table sorting - currently unused but could be used for client-side sorting
  const [sorting, setSorting] = useState<SortingState>([
    { id: "order_id", desc: true },
  ]);

  // State for row selection - currently unused but could enable multi-select functionality
  const [rowSelection, setRowSelection] = useState({});

  // States for filtering - currently only used by SearchBar component
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Pagination states - actively used by useQuery to fetch paginated data
  // These values are included in the queryKey array, so when they change,
  // useQuery will automatically refetch with the new pagination parameters
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(50);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * TanStack Query Hook
   *
   * useQuery is a hook that manages server state including:
   * - Fetching data
   * - Caching results
   * - Refetching when needed
   * - Loading/error states
   *
   * Key Props:
   * - queryKey: Unique identifier for this query, used for caching/refetching
   *   Including pageIndex/pageSize means query will refetch when these change
   *
   * - queryFn: Async function that fetches the data
   *   Uses pagination params from state to fetch correct page
   *
   * - staleTime: How long data is considered fresh (30 seconds)
   *   After this time, data may be refetched if component remounts
   *
   * Returns:
   * - data: The fetched data
   * - isLoading: Loading state
   * - error: Any error that occurred
   * - refetch: Function to manually trigger a refetch
   */
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

  /*
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
  */

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
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
          <Link
            href="/inventory/orders/create"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Add Order
          </Link>
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
              onClick={() => handleOrderClick(order)}
              className="p-4 bg-slate-800 rounded-lg border border-slate-700 shadow-md 
                hover:bg-slate-700/80 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] 
                hover:border-slate-600 transition-all duration-200 cursor-pointer"
            >
              <div className="mb-2">
                <h2 className="text-lg font-semibold text-white">
                  {order.supplier}
                </h2>
                <p className="text-sm text-slate-400">{order.material}</p>
              </div>
              <div className="mb-2 text-white">
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
                        ? "text-green-400"
                        : order.delivery_status === "partial"
                        ? "text-yellow-400"
                        : "text-slate-300"
                    } font-medium`}
                  >
                    {order.delivery_status}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-400">
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

      <GridModal
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default OrdersGrid;
