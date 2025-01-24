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
 *
 *
 * NEXT STEPS
 * 1. Add a button to download the table as a CSV file
 * 2. Make the sorting and filtering functional
 * 3. Replace DrumTable content with the common table shared
 *   by components like ProductTable
 * 4. Once Sidebar is improved, integrate it with the table by using hover and spotlight effects of table rows that user is focusing on in the sidebar
 */

import React, { useState, useEffect, useMemo } from "react";
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
import { TableHeader } from "@/components/shared/table/ux/TableHeader";
import { TableFooter } from "@/components/shared/table";
import { SearchBar } from "@/components/shared/table";
import { ActionButton } from "@/components/shared/table";
import type { DrumsResponse } from "@/types/database/drums";
import { DrumStatus, DrumStatusType } from "@/types/constant/drums";
import { cn } from "@/lib/utils";

// Filter options for the search bar dropdown
const filterOptions = [
  { label: "All", value: "all" },
  { label: "By Material", value: "material" },
  { label: "By Supplier", value: "supplier" },
  { label: "By Location", value: "location" },
  { label: "By Status", value: "status" },
];

export const DrumsTable = React.memo(() => {
  const queryClient = useQueryClient();

  // Pagination state used by useQuery and useReactTable
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(50);

  // Sorting state used by useReactTable for column sorting
  const [sorting, setSorting] = useState<SortingState>([]);

  // Row selection state used by useReactTable for selecting table rows
  const [rowSelection, setRowSelection] = useState({});

  // Status filter state passed to columns for filtering drum statuses
  const [selectedStatuses, setSelectedStatuses] = useState<DrumStatusType[]>(
    Object.values(DrumStatus)
  );

  // Search state used by SearchBar component
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(filterOptions[0].value);

  // Create table columns with status filter state
  const columns = createColumns({ selectedStatuses, setSelectedStatuses });

  /**
   * Server-Sent Events (SSE) Setup
   *
   * Purpose: Establishes real-time connection to server for drum status updates
   *
   * Dependencies:
   * - queryClient: For invalidating and updating cached data
   * - pageIndex/pageSize/selectedStatuses: Used in query key for updating specific data
   *
   * Flow:
   * 1. Creates EventSource connection
   * 2. Sets up event listeners for:
   *    - connected: Logs successful connection
   *    - drumStatus: Updates cached data when drum status changes
   *    - error: Handles connection errors
   * 3. Cleans up connection on unmount
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

      // Optimistically update local data before refetch completes
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
   * TanStack Query Configuration
   *
   * Purpose: Manages server state and data fetching
   *
   * Key Props:
   * - queryKey: Unique identifier for caching/invalidating this query
   * - queryFn: Async function that fetches data
   * - staleTime: How long data remains "fresh" before refetching
   */
  const { data, isLoading } = useQuery({
    queryKey: ["drums", pageIndex, pageSize],
    queryFn: async () => {
      const statusParam = selectedStatuses.length
        ? selectedStatuses.join(",")
        : Object.values(DrumStatus).join(",");

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
    staleTime: 30000, // Data considered fresh for 30 seconds
  });

  // Memoized filtering of drums based on selected status filters
  const filteredDrums = useMemo(() => {
    if (!data?.rows) return [];
    if (!selectedStatuses.length) return data.rows;

    return data.rows.filter((drum) =>
      selectedStatuses.includes(drum.status as DrumStatusType)
    );
  }, [data?.rows, selectedStatuses]);

  /**
   * TanStack Table Configuration
   *
   * Purpose: Manages table state and functionality
   *
   * Key Props:
   * - data: Table data source
   * - columns: Column definitions
   * - state: Current table state (sorting, pagination, selection)
   * - pageCount: Total number of pages
   * - manualPagination/manualSorting: Server-side handling flags
   * - onPaginationChange/onSortingChange: State update handlers
   * - getCoreRowModel etc: Table feature enablers
   */
  const table = useReactTable({
    data: filteredDrums,
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

  // TODO: Enhance UI of loading state. Add some animations, like three dots of an ellipsis perpetually cycling in and out of visibility in a sequence of ".", "..", "...", ".", etc.
  // TODO: Move loading state into shared NextJS official loading.tsx page (like how it recognises files named `page.tsx` or `error.tsx`)
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
      <div className="relative flex flex-col md:flex-row items-center justify-between px-8 py-6 bg-slate-700 rounded-lg shadow-lg">
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

      <div className="rounded-lg border border-slate-600 bg-slate-800 shadow-xl overflow-hidden">
        <Table>
          <TableHeader
            table={table}
            className="bg-slate-700 text-base font-medium"
          />
          <TableBody>
            {table.getRowModel().rows.map((row, index) => (
              <TableRow
                key={row.id}
                className={cn(
                  "h-16 hover:bg-slate-700/50 transition-colors text-base",
                  index % 2 === 0 ? "bg-slate-800" : "bg-slate-800/50"
                )}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="px-6 py-4 text-base font-medium"
                  >
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
