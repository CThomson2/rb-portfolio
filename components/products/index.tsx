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
  // PaginationState,
} from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import TableTabs from "./tabs";
import TableHeader from "./content/TableHeader";
import TableFooter from "./footer";
import type { ProductRow } from "@/types/products";

export interface DataTableProps {
  columns: ColumnDef<ProductRow, any>[];
  data: ProductRow[];
}

export function DataTable({ columns, data }: DataTableProps) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      rowSelection,
      sorting,
    },
    initialState: {
      pagination: {
        pageSize: 20,
        pageIndex: 0,
      },
    },
  });

  console.log("sorting", table.getState().sorting);

  return (
    <div className="flex flex-col pb-10">
      <TableTabs />
      <div className="rounded-md border relative bg-gray-800">
        <Table>
          <TableHeader table={table} />
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className=" hover:bg-gray-700"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-white">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
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
