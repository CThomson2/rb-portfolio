// components/features/inventory/TransactionTable/index.tsx
"use client";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  SortingState,
  flexRender,
} from "@tanstack/react-table";
import { columns } from "./columns";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import TableHeader from "@/components/shared/table/TableHeader";
import TableFooter from "@/components/shared/table/footer";
import SearchBar from "@/components/shared/table/SearchBar";
import type { Transaction } from "@/types/database/transactions";

const filterOptions = [
  { label: "All", value: "all" },
  { label: "By Type", value: "type" },
  { label: "By Material", value: "material" },
  { label: "By Date", value: "date" },
];

export function TransactionsTable() {
  // State management
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [pageSize, setPageSize] = useState(50);
  const [pageIndex, setPageIndex] = useState(0);

  // Fetch data using React Query
  const { data: rawTransactions, isLoading } = useQuery({
    queryKey: ["transactions", pageIndex, pageSize],
    queryFn: async () => {
      const response = await fetch(
        `/api/inventory/transactions?page=${pageIndex + 1}&limit=${pageSize}`
      );
      if (!response.ok) throw new Error("Failed to fetch transactions");
      return response.json() as Promise<Transaction[]>;
    },
    placeholderData: (prevData) => prevData || [], // Important for smooth pagination
    staleTime: 30000, // Data stays fresh for 30 seconds
  });

  // Filter and search data
  const filteredData = useMemo(() => {
    if (!rawTransactions) return [];
    let filtered = rawTransactions;

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
  }, [rawTransactions, searchQuery, selectedFilter]);

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
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    pageCount: Math.ceil((filteredData?.length ?? 0) / pageSize),
  });

  if (isLoading) {
    return <div>Loading transactions...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <SearchBar
          filterOptions={filterOptions}
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader table={table} />
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
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
}
