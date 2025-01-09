// components/features/inventory/DrumsTable/index.tsx
"use client";
import { useQuery } from "@tanstack/react-query";
import { useState, useRef } from "react";
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
import SearchBar from "@/components/shared/table/header/SearchBar";
import ActionButton from "@/components/shared/table/header/ActionButton";
import type { DrumsResponse, NewDrum } from "@/types/database/drums";

const filterOptions = [
  { label: "All", value: "all" },
  { label: "By Material", value: "material" },
  { label: "By Supplier", value: "supplier" },
  { label: "By Location", value: "location" },
  { label: "By Status", value: "status" },
];

export function DrumsTable() {
  const [sorting, setSorting] = useState<SortingState>([
    { id: "drum_id", desc: true },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const parentRef = useRef<HTMLDivElement>(null);
  const [pageSize, setPageSize] = useState(50);
  const [pageIndex, setPageIndex] = useState(0);

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
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

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
        <ActionButton text="Add Drum" href="/inventory/drums/new" />
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
}
