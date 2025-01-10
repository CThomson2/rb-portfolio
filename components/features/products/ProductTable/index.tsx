"use client";
import React, { useMemo, useState, useEffect } from "react";
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
import TableHeader from "@/components/shared/table/TableHeader";
import TableFooter from "@/components/shared/table/footer";
import type { ProductTableRow } from "@/types/components/products";
import { GRADE } from "@/types/enums/products";
import { cn } from "@/lib/utils";
import ActionButton from "../../../shared/table/header/ActionButton";
import SearchBar from "@/components/shared/table/header/SearchBar";

export interface DataTableProps {
  columns: ColumnDef<ProductTableRow, any>[];
  data: ProductTableRow[];
}

const filterOptions = [
  { label: "All", value: "all" },
  { label: "By Name", value: "name" },
  { label: "By Lot No.", value: "category" },
  { label: "By CAS Number", value: "cas" },
];

export const DataTable = React.memo(({ columns, data }: DataTableProps) => {
  // React Table state
  const [rowSelection, setRowSelection] = React.useState({});
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [gradeFilter, setGradeFilter] = React.useState<GRADE | "All">("All");

  // Search and Filtering
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(() => {
    // If "All" is selected, return all data
    if (gradeFilter === "All") return data;

    // Otherwise, filter data to show only rows matching the selected grade
    return data.filter((product) => product.grade === gradeFilter);
  }, [data, gradeFilter]);

  // const filteredResponse = useMemo(() => {
  //   if (gradeFilter !== "All") return data;
  //   return data.filter((product) => {
  //     return product.name.toLowerCase().includes(searchQuery.toLowerCase());
  //   });
  // }, [data, searchQuery]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      rowSelection,
    },
    enableSorting: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: (updater) => {
      setSorting((old) => {
        console.log("Sorting state updated");
        const newSorting =
          typeof updater === "function" ? updater(old) : updater;
        return newSorting;
      });
    },
    onRowSelectionChange: setRowSelection,
    // getFilteredRowModel: getFilteredRowModel(),
    // state: {
    // rowSelection,
    // sorting,
    // Add grade filter
    // columnFilters: useMemo(
    //   () =>
    //     gradeFilter !== "All" ? [{ id: "grade", value: gradeFilter }] : [],
    //   [gradeFilter]
    // ),
    // },
    initialState: {
      pagination: {
        pageSize: 30,
        pageIndex: 0,
      },
    },
    debugAll: true,
  });

  // console.log("sorting", table.getState().sorting);

  useEffect(() => {
    // We can directly use the sorting state from the dependency array since it's the same value
    console.log("Sorting state updated", sorting);
    console.log("Grade filter updated", gradeFilter);
    console.log("Filtered data updated", filteredData);
  }, [sorting, gradeFilter, filteredData]);

  return (
    <>
      <div className="max-h-fit flex flex-row justify-between items-center px-8 py-8 bg-slate-700 rounded-md">
        <SearchBar
          filterOptions={filterOptions}
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <ActionButton text="New Product" href="/products/new" />
      </div>

      <div className="flex flex-col m-5 pb-10">
        <TableTabs
          activeTab={gradeFilter}
          setActiveTab={(value) => {
            console.log("Grade filter updated", value);
            setGradeFilter(value);
          }}
        />

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
    </>
  );
});
