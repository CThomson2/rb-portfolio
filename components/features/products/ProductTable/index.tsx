"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "@/components/shared/table/DataTable";
import { ColumnDef, SortingState } from "@tanstack/react-table";
import type { ProductTableRow } from "@/types/database/products";

export interface DataTableProps {
  columns: ColumnDef<ProductTableRow>[];
  data: ProductTableRow[];
}

const filterOptions = [
  { label: "All", value: "All" },
  { label: "By Name", value: "name" },
  { label: "By Lot No.", value: "sku" },
  { label: "By CAS Number", value: "cas_number" },
];

export const ProductTable = React.memo(({ columns, data }: DataTableProps) => {
  // React Table state
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState({});
  // Specific filter for grades - currently only filtering by grade is supported
  const [activeFilter, setActiveFilter] = React.useState<string>("All");

  // Search and Filtering
  // `selectedFilter` is used for the general search bar which can search by name, lot number, or CAS number
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Log the search query to the console when it changes
  useEffect(() => {
    console.log("ProductTable.tsx - search query:", searchQuery);
  }, [searchQuery]);

  return (
    <DataTable
      columns={columns}
      data={data}
      filterOptions={filterOptions}
      newButtonText="New Product"
      newButtonHref="/products/new"
      filterFunction={(data, searchQuery, selectedFilter) => {
        if (searchQuery.length >= 3) {
          if (selectedFilter === "All") {
            return data.filter((product) =>
              filterOptions.some((option) => {
                const value = product[option.value as keyof ProductTableRow];
                return value
                  ?.toString()
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase());
              })
            );
          } else {
            return data.filter((product) => {
              const value = product[selectedFilter as keyof ProductTableRow];
              return value
                ?.toString()
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
            });
          }
        }

        // Then handle grade filtering
        if (activeFilter !== "All") {
          return data.filter((product) => product.grade === activeFilter);
        }

        return data;
      }}
      stateProps={{
        sorting,
        setSorting,
        rowSelection,
        setRowSelection,
        searchQuery,
        setSearchQuery,
        selectedFilter,
        setSelectedFilter,
        activeFilter,
        setActiveFilter,
      }}
    />
  );
});

/*
export const DataTable = React.memo(({ columns, data }: DataTableProps) => {
  // React Table state
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [filter, setFilter] = React.useState<GRADE | "All">("All");

  // Search and Filtering
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(() => {
    // If "All" is selected, return all data
    if (filter === "All") return data;

    // Otherwise, filter data to show only rows matching the selected grade
    return data.filter((product) => product.grade === filter);
  }, [data, filter]);

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
    console.log("Grade filter updated", filter);
    console.log("Filtered data updated", filteredData);
  }, [sorting, filter, filteredData]);

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
          activeTab={filter}
          setActiveTab={(value) => {
            console.log("Grade filter updated", value);
            setFilter(value);
          }}
        />

        <div className="rounded-md border-x-2 border-[hsl(var(--table-header))] relative bg-slate-700">
          <Table>
            <TableHeader table={table} />
            <TableBody>
              {table.getRowModel().rows.map((row) => (
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
              ))}
            </TableBody>
          </Table>
        </div>
        <TableFooter table={table} />
      </div>
    </>
  );
});
*/
