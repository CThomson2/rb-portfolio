// components/features/inventory/TransactionTable/index.tsx
"use client";
import React from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo, useRef } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  SortingState,
  flexRender,
} from "@tanstack/react-table";
import { columns } from "./columns";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/Table";
import {
  TableHeader,
  TableFooter,
  SearchBar,
  ActionButton,
} from "@/components/shared/table";
import type { TransactionRow } from "@/types/database/transactions";
import { cn } from "@/lib/utils";

const ROW_HEIGHT = 30; // Adjust this value as needed

const filterOptions = [
  { label: "All", value: "all" },
  { label: "By Type", value: "type" },
  { label: "By Material", value: "material" },
  { label: "By Date", value: "date" },
];

export const TransactionsTable = React.memo(() => {
  // State management
  const [sorting, setSorting] = useState<SortingState>([
    { id: "tx_date", desc: true },
  ]);
  const [rowSelection, setRowSelection] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const parentRef = useRef<HTMLDivElement>(null);
  const [pageSize, setPageSize] = useState(50);
  const [pageIndex, setPageIndex] = useState(0);

  // Fetch data using React Query
  const { data, isLoading } = useQuery({
    queryKey: ["transactions", pageIndex, pageSize],
    queryFn: async () => {
      const response = await fetch(
        `/api/inventory/transactions?page=${pageIndex + 1}&limit=${pageSize}`
      );
      if (!response.ok) throw new Error("Failed to fetch transactions");
      return response.json() as Promise<{
        rows: TransactionRow[];
        total: number;
      }>;
    },
    // placeholderData: (prevData) => prevData || [], // Important for smooth pagination
    staleTime: 30000, // Data stays fresh for 30 seconds
  });

  // useVirtualizer is a TanStack hook for virtualized rendering - only rendering visible rows
  // Currently unused, but could be implemented to improve performance with large datasets by:
  // 1. Wrapping table body in fixed-height container with parentRef
  // 2. Using virtualizer.getVirtualItems() to render only visible rows
  // 3. Applying virtualizer positioning styles
  const virtualizer = useVirtualizer({
    count: data?.total ?? 0, // Total number of rows
    getScrollElement: () => parentRef.current, // Container ref for scroll position
    estimateSize: () => ROW_HEIGHT, // Estimated height of each row
    overscan: 5, // Number of rows to render above/below viewport
  });

  // Filter and search data
  const filteredData = useMemo(() => {
    if (!data) return [];
    let filtered = data.rows;

    // Apply search filtering
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((tx) => {
        switch (selectedFilter) {
          case "type":
            return tx.tx_type.toLowerCase().includes(query);
          case "material":
            return tx.material?.toLowerCase().includes(query);
          case "date":
            return tx.tx_date.includes(query);
          default:
            // Search across all fields
            return (
              tx.tx_type.toLowerCase().includes(query) ||
              tx.material?.toLowerCase().includes(query) ||
              tx.tx_notes?.toLowerCase().includes(query)
            );
        }
      });
    }

    return filtered;
  }, [data, searchQuery, selectedFilter]);

  // Initialize table
  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      rowSelection,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    enableSorting: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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
    onSortingChange: (updater) => {
      setSorting((old) => {
        console.log("Sorting state updated");
        const newSorting =
          typeof updater === "function" ? updater(old) : updater;
        return newSorting;
      });
    },
    onRowSelectionChange: setRowSelection,

    pageCount: Math.ceil((data?.total ?? 0) / pageSize),
    initialState: {
      pagination: {
        pageSize: 30,
        pageIndex: 0,
      },
    },
    debugAll: true,
  });

  if (isLoading) {
    return <div>Loading transactions...</div>;
  }

  return (
    <>
      <div className="max-h-fit flex flex-row justify-between items-center px-16 py-8 bg-slate-700 rounded-md">
        <SearchBar
          filterOptions={filterOptions}
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <ActionButton text="New Transaction" href="/transactions/new" />
      </div>
      <div className="flex flex-col m-5 pb-10">
        <div className="rounded-md border-x-2 border-[hsl(var(--table-header))] relative bg-slate-600">
          <Table>
            <TableHeader table={table} />
            <TableBody>
              {/* {isLoading ? (
                <TableRow>
                  <TableCell colSpan={columns.length}>Loading...</TableCell>
                </TableRow>
              ) : ( */}
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={cn(
                      "w-full border-b transition-colors hover:bg-gray-700",
                      "data-[state=selected]:bg-muted"
                    )}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="px-2 text-white min-w-0 max-w-full"
                      >
                        <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <TableFooter table={table} />
      </div>
    </>
  );
});
