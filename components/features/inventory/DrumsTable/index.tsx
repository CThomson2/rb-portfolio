// components/features/inventory/DrumsTable/index.tsx
"use client";

/**
 * DrumsTable Component
 *
 * A real-time table displaying drum inventory data with filtering, sorting and SSE updates.
 *
 * Key Features:
 * 1. Server-Sent Events (SSE) for real-time updates:
 *    - Connects to /api/drums/sse endpoint
 *    - Listens for 'drumStatus' events containing {drumId, newStatus}
 *    - Automatically updates table data when drum statuses change
 *
 * 2. Status Filtering:
 *    - Uses StatusFilter component from shared/table/ux/StatusFilter.tsx
 *    - Status checkboxes rendered in column header via columns.tsx
 *    - Selected statuses passed to API via query params
 *    - Updates query when statuses change to refetch filtered data
 *
 * 3. Pagination & Sorting:
 *    - Manual server-side pagination
 *    - Configurable page size
 *    - Column sorting with SortableColumn component
 */

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  SortingState,
  flexRender,
} from "@tanstack/react-table";
import { createColumns } from "./columns";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/Table";
import { TableHeader } from "@/components/shared/table";
import { TableFooter } from "@/components/shared/table";
import { SearchBar } from "@/components/shared/table";
import { ActionButton } from "@/components/shared/table";
import type { DrumsResponse } from "@/types/database/drums";
import { DrumStatus, DrumStatusType } from "@/types/constant/drums";

const filterOptions = [
  { label: "All", value: "all" },
  { label: "By Material", value: "material" },
  { label: "By Supplier", value: "supplier" },
  { label: "By Location", value: "location" },
  { label: "By Status", value: "status" },
];

export const DrumsTable = React.memo(() => {
  const queryClient = useQueryClient();
  const [sorting, setSorting] = useState<SortingState>([
    { id: "drum_id", desc: true },
  ]);
  const [rowSelection, setRowSelection] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [pageSize, setPageSize] = useState(50);
  const [pageIndex, setPageIndex] = useState(0);
  const [selectedStatuses, setSelectedStatuses] = useState<DrumStatusType[]>([
    DrumStatus.PENDING,
    DrumStatus.AVAILABLE,
    DrumStatus.SCHEDULED,
  ]);

  // Create columns with status filter state
  const columns = createColumns({ selectedStatuses, setSelectedStatuses });

  /**
   * Server-Sent Events (SSE) Setup
   *
   * 1. Creates EventSource connection to /api/drums/sse
   * 2. Listens for three event types:
   *    - 'connected': Initial connection confirmation
   *    - 'drumStatus': Real-time status updates
   *    - 'error': Connection/stream errors
   * 3. Updates local data immediately on status changes
   * 4. Cleans up connection on component unmount
   */
  useEffect(() => {
    const eventSource = new EventSource("/api/drums/sse");

    eventSource.addEventListener("connected", (event) => {
      console.log("SSE Connected:", event);
    });

    eventSource.addEventListener("drumStatus", (event) => {
      const { drumId, newStatus } = JSON.parse((event as MessageEvent).data);

      // Invalidate the query to trigger a refetch
      queryClient.invalidateQueries({ queryKey: ["drums"] });

      // Optionally, update the local data immediately
      queryClient.setQueryData<{ rows: any[]; total: number }>(
        ["drums", pageIndex, pageSize, selectedStatuses],
        (old) => {
          if (!old) return old;

          const updatedRows = old.rows.map((drum) =>
            drum.drum_id === drumId ? { ...drum, status: newStatus } : drum
          );

          return {
            ...old,
            rows: updatedRows,
          };
        }
      );
    });

    eventSource.addEventListener("error", (error) => {
      console.error("SSE Error:", error);
      eventSource.close();
    });

    return () => {
      eventSource.close();
    };
  }, [queryClient, pageIndex, pageSize, selectedStatuses]);

  /**
   * Data Fetching
   *
   * Fetches drum data based on:
   * - Current page index
   * - Page size
   * - Selected status filters
   *
   * Updates automatically when:
   * - Page changes
   * - Status filters change
   * - SSE events received
   */
  const { data, isLoading } = useQuery({
    queryKey: ["drums", pageIndex, pageSize, selectedStatuses],
    queryFn: async () => {
      const statusParam = selectedStatuses.join(",");
      const response = await fetch(
        `/api/inventory?page=${
          pageIndex + 1
        }&limit=${pageSize}&status=${statusParam}`
      );
      if (!response.ok) throw new Error("Failed to fetch drums");
      const data: DrumsResponse = await response.json();
      return {
        rows: data.drums,
        total: data.total,
      };
    },
    staleTime: 30000,
  });

  // Table configuration with TanStack Table
  const table = useReactTable({
    data: data?.rows ?? [],
    columns,
    state: {
      sorting,
      rowSelection,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    pageCount: Math.ceil((data?.total ?? 0) / pageSize),
    manualPagination: true,
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        const newState = updater({
          pageIndex,
          pageSize,
        });
        setPageIndex(newState.pageIndex);
        setPageSize(newState.pageSize);
      }
    },
    manualSorting: true,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
        <div className="text-center">
          <h1 className="text-5xl font-medium tracking-wider">
            <span className="text-7xl text-blue-400">L</span>
            <span className="text-white">
              OADING DATA
              <span className="inline animate-dots"></span>
            </span>
          </h1>
        </div>
      </div>
    );
  }

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
          <ActionButton text="Manage Inventory" href="/inventory/drums/new" />
        </div>
        <div className="flex-row gap-4 hidden lg:flex">
          <Link href="/inventory/orders" className="mx-auto">
            <button className="flex flex-col items-center px-6 py-3 bg-slate-600 rounded-md hover:bg-slate-500 transition-colors">
              <span className="text-xs text-gray-300">Go to</span>
              <span className="font-medium">Orders</span>
            </button>
          </Link>
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

      <div className="rounded-md border bg-slate-600">
        <Table>
          <TableHeader table={table} />
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <TableFooter table={table} />
    </div>
  );
});
