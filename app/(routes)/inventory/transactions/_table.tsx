"use client";
import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  SortingState,
  PaginationState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/Table";
import { TableHeader, TableFooter, SearchBar } from "@/components/shared/table";
import { columns } from "@/components/features/inventory/TransactionsTable/columns";
import type { Transaction } from "@/types/database/inventory/transactions";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Button } from "@/components/ui/Button";
import { PlusCircle, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

const filterOptions = [
  { label: "All", value: "all" },
  { label: "By Type", value: "type" },
  { label: "By Material", value: "material" },
  { label: "By Date", value: "date" },
];

/*
This client component will display the inventory transactions table,
taking data from the database and displaying it with live updates.

There will also be the ability to manage inventory transactions.
This means adding records to the table - not modifying or deleting existing records.

Adding a record involves an input form, which will confirm that all required fields are filled out, and will utilise type safety to ensure that the data is valid with the database constraints.
*/

export default function TransactionsPage() {
  // Table State
  const [sorting, setSorting] = useState<SortingState>([]);
  // const [pagination, setPagination] = useState<PaginationState>({
  //   pageIndex: 0,
  //   pageSize: 10,
  // });
  const [rowSelection, setRowSelection] = useState({});

  // Filter/Search State
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch transactions data from the database
  // useQuery is a React hook from TanStack Query that handles data fetching, caching, and state management
  // It takes an object with queryKey (unique identifier for caching) and queryFn (async function to fetch data)
  const { data: transactions, isLoading } = useQuery({
    // queryKey is used for caching and invalidation - array format allows for dynamic keys
    // Here we use a simple string key since we're fetching all transactions
    queryKey: ["transactions"],

    // queryFn is the actual function that fetches data
    // It runs when the component mounts and when the query needs to be refreshed
    queryFn: async () => {
      const response = await fetch("/api/inventory/transactions");
      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }
      return response.json();
    },
  });

  const getDirectionColor = (direction: "in" | "out") => {
    return direction === "in"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  const filteredData = useMemo(() => {
    if (!transactions) return [];
    let filtered: Transaction[] = transactions;

    if (searchQuery) {
      filtered = filtered.filter((tx) => {
        if (selectedFilter === "all") {
          return (
            tx.tx_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tx.material?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tx.tx_notes?.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        switch (selectedFilter) {
          case "type":
            return tx.tx_type.toLowerCase().includes(searchQuery.toLowerCase());
          case "material":
            return tx.material
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase());
          case "date":
            return tx.tx_date?.includes(searchQuery);
          default:
            return false;
        }
      });
    }

    return filtered;
  }, [transactions, searchQuery, selectedFilter]);

  // Initialize table
  const table = useReactTable({
    data: filteredData ?? [],
    columns,
    state: {
      sorting,
      rowSelection,
    },
    enableSorting: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: { pageSize: 30, pageIndex: 0 },
    },
  });

  if (isLoading) {
    return <div>Loading transactions...</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <SearchBar
          filterOptions={filterOptions}
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <Button className="flex items-center gap-2">
          <PlusCircle className="w-4 h-4" />
          New Transaction
        </Button>
      </div>

      <div className="rounded-md border-x-2 border-[hsl(var(--table-header))] relative bg-slate-700">
        <Table>
          <TableHeader table={table} />
          <TableBody>
            {/* Table body implementation similar to your product table */}
          </TableBody>
        </Table>
      </div>
      <TableFooter table={table} />
    </div>
  );

  /*
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inventory Transactions</h1>
        <Button className="flex items-center gap-2">
          <PlusCircle className="w-4 h-4" />
          New Transaction
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Direction</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Material</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : (
              transactions?.map((transaction) => (
                <TableRow key={transaction.tx_id}>
                  <TableCell>{transaction.tx_id}</TableCell>
                  <TableCell>
                    <span className="capitalize">{transaction.tx_type}</span>
                  </TableCell>
                  <TableCell>
                    <Badge className={getDirectionColor(transaction.direction)}>
                      {transaction.direction}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(transaction.tx_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{transaction.material}</TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {transaction.tx_notes}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
  */
}
