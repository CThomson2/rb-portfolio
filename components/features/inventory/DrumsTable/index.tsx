// components/features/inventory/DrumsTable/index.tsx
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
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
import { TableHeader } from "@/components/shared/table";
import { TableFooter } from "@/components/shared/table";
import { SearchBar } from "@/components/shared/table";
import { ActionButton } from "@/components/shared/table";
import type { DrumsResponse } from "@/types/database/drums";
import { DrumStatus, DrumStatusType } from "@/types/enums/drums";
import { StatusFilter } from "@/components/shared/table";

const filterOptions = [
  { label: "All", value: "all" },
  { label: "By Material", value: "material" },
  { label: "By Supplier", value: "supplier" },
  { label: "By Location", value: "location" },
  { label: "By Status", value: "status" },
];

export const DrumsTable = React.memo(() => {
  const [sorting, setSorting] = useState<SortingState>([
    { id: "drum_id", desc: true },
  ]);
  const [rowSelection, setRowSelection] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const [pageSize, setPageSize] = useState(50);
  const [pageIndex, setPageIndex] = useState(0);
  const [status, setStatus] = useState<DrumStatusType[]>([
    DrumStatus.AVAILABLE,
  ]);

  const { data, isLoading } = useQuery({
    queryKey: ["drums", pageIndex, pageSize],
    queryFn: async () => {
      const response = await fetch(
        `/api/inventory?page=${pageIndex + 1}&limit=${pageSize}`
      );
      if (!response.ok) throw new Error("Failed to fetch drums");
      const data: DrumsResponse = await response.json();
      // Map the response structure to the expected format
      return {
        rows: data.drums,
        total: data.total,
      };
    },
    staleTime: 30000,
  });

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
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length}>Loading...</TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <TableFooter table={table} />
    </div>
  );
});
