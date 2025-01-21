import React, { useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  SortingState,
  flexRender,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/Table";
import {
  TableHeader,
  TableFooter,
  SearchBar,
  ActionButton,
} from "@/components/shared/table";
// TODO: Remove this import and make Tabs a shared table component
import TableTabs from "@/components/features/products/ProductTable/tabs";
import { cn } from "@/lib/utils";

interface DataTableProps<T> {
  columns: any[];
  data: T[];
  filterOptions: { label: string; value: string }[];
  newButtonText: string;
  newButtonHref: string;
  filterFunction?: (data: T[], query: string, filter: string) => T[];
  stateProps?: {
    sorting?: SortingState;
    setSorting?: React.Dispatch<React.SetStateAction<SortingState>>;
    rowSelection?: any;
    setRowSelection?: React.Dispatch<React.SetStateAction<any>>;
    searchQuery?: string;
    setSearchQuery?: React.Dispatch<React.SetStateAction<string>>;
    selectedFilter?: string;
    setSelectedFilter?: React.Dispatch<React.SetStateAction<string>>;
    activeFilter?: string;
    setActiveFilter?: React.Dispatch<React.SetStateAction<string>>;
  };
}

export const DataTable = <T,>({
  columns,
  data,
  filterOptions,
  newButtonText,
  newButtonHref,
  filterFunction,
  stateProps = {},
}: DataTableProps<T>) => {
  // Provide default state props
  const {
    sorting = [],
    setSorting = () => {},
    rowSelection = {},
    setRowSelection = () => {},
    searchQuery = "",
    setSearchQuery = () => {},
    selectedFilter = "All",
    setSelectedFilter = () => {},
    activeFilter = "All",
    setActiveFilter = () => {},
  } = stateProps;

  const filteredData = useMemo(() => {
    if (!data) return [];
    if (filterFunction) {
      return filterFunction(data, searchQuery, selectedFilter);
    }
    return data; // Default to returning all data if no filter function is provided
  }, [data, searchQuery, selectedFilter, filterFunction]);

  // Log the search query to the console when it changes
  useEffect(() => {
    console.log("DataTable.tsx - search query:", searchQuery);
  }, [searchQuery]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      rowSelection,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 30,
      },
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center px-8 py-8 bg-slate-700 rounded-md">
        <SearchBar
          filterOptions={filterOptions}
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <ActionButton text={newButtonText} href={newButtonHref} />
      </div>
      <div className="flex flex-col m-5 pb-10 overflow-x-auto webkit-overflow-scrolling-touch min-w-[600px]">
        <TableTabs activeTab={activeFilter} setActiveTab={setActiveFilter} />
        <div className="rounded-md border-x-2 border-[hsl(var(--table-header))] relative bg-slate-600">
          <Table>
            <TableHeader table={table} />
            <TableBody>
              {table.getRowModel().rows.map((row) => (
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
              ))}
            </TableBody>
          </Table>
        </div>
        <TableFooter table={table} />
      </div>
    </div>
  );
};
