"use client";
import React from "react";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  PaginationState,
} from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import TableTabs from "./tabs";
import TableHeader from "@/components/shared/TableHeader";
import TableFooter from "@/components/features/products/ProductTable/footer";
import type { ProductTableRow } from "@/types/components/products";
import { GRADE } from "@/types/database/products";
import { cn } from "@/lib/utils";
export interface DataTableProps {
  columns: ColumnDef<ProductTableRow, any>[];
  data: ProductTableRow[];
}

export function DataTable({ columns, data }: DataTableProps) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [gradeFilter, setGradeFilter] = React.useState<GRADE | "All">("All");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      rowSelection,
      sorting,
      // Add grade filter
      columnFilters:
        gradeFilter !== "All" ? [{ id: "grade", value: gradeFilter }] : [],
    },
    initialState: {
      pagination: {
        pageSize: 30,
        pageIndex: 0,
      },
    },
  });

  // console.log("sorting", table.getState().sorting);

  return (
    <div className="flex flex-col m-5 pb-10">
      <TableTabs activeTab={gradeFilter} setActiveTab={setGradeFilter} />
      <div className="rounded-md border-x-2 border-[hsl(var(--table-header))] relative bg-slate-700">
        <Table>
          <TableHeader table={table} />
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  // Grid setup: 8 columns
                  // 1st col (auto): Checkbox/selection
                  // 2nd col (auto): ID
                  // 3rd col (1fr): Product name - takes remaining space
                  // 4th col (auto): CAS number
                  // 5th col (auto): Grade
                  // 6th col (auto): Pack size
                  // 7th col (auto): Price
                  // 8th col (auto): Actions
                  // className="grid grid-cols-[auto_auto_auto_auto_auto_auto_auto_auto] border-b transition-colors data-[state=selected]:bg-muted hover:bg-gray-700"
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
  );
}
