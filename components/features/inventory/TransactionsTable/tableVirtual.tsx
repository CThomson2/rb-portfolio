// components/features/inventory/TransactionTable/index.tsx
"use client";
import { useState, useRef } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useQuery } from "@tanstack/react-query";
import { columns } from "./columns";
import SearchBar from "@/components/shared/table/SearchBar";
import TableFooter from "@/components/shared/table/footer";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

const filterOptions = [
  { label: "All", value: "all" },
  { label: "By Type", value: "type" },
  { label: "By Material", value: "material" },
  { label: "By Date", value: "date" },
];

export function TransactionsTableVirtual() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [pageSize, setPageSize] = useState(50);
  const [pageIndex, setPageIndex] = useState(0);

  // Fetch data with pagination
  const { data, isLoading } = useQuery({
    queryKey: ["transactions", pageIndex, pageSize],
    queryFn: async () => {
      const response = await fetch(
        `/api/inventory/transactions?page=${pageIndex + 1}&limit=${pageSize}`
      );
      return response.json();
    },
    // Keep previous data while loading new data
    placeholderData: (prevData) => prevData || [],
  });

  // Set up virtual scrolling
  const parentRef = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: data?.total ?? 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50, // Estimated row height
    overscan: 10, // Number of items to render outside visible area
  });

  const table = useReactTable({
    data: data?.rows ?? [],
    columns,
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    // Enable manual pagination since we're fetching data from server
    manualPagination: true,
    pageCount: Math.ceil((data?.total ?? 0) / pageSize),
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
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="space-y-4">
      <SearchBar
        filterOptions={filterOptions}
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div ref={parentRef} className="h-[600px] overflow-auto">
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {virtualizer.getVirtualItems().map((virtualRow) => {
            const row = table.getRowModel().rows[virtualRow.index];
            return (
              <div
                key={row.id}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <TableRow>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </div>
            );
          })}
        </div>
      </div>

      <TableFooter table={table} />
    </div>
  );
}
