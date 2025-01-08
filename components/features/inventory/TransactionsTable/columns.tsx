"use client";

// Import necessary dependencies for table functionality
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { SortableColumn } from "@/components/shared/table/SortableColumn";
// Import individual cell components for better organization
import ProductName from "@/components/features/products/ProductTable/table-data/ProductName";
import ProductGrade from "@/components/features/products/ProductTable/table-data/ProductGrade";

import ProductStockLevel from "@/components/features/products/ProductTable/table-data/ProductStockLevel";

import ProjectLastUpdate from "@/components/shared/projects/LastUpdate";
import { ProjectActions } from "@/components/shared/Actions";
import ProjectTimeLine from "@/components/shared/projects/Timeline";

// Formatters
import { format } from "date-fns";
import { getTxTypeColor, getTxTypeVariant } from "@/lib/utils/formatters";

// UI Components
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoreHorizontal } from "lucide-react";
import type { Transaction } from "@/types/database/transactions";

// components/features/inventory/TransactionTable/columns.tsx

export const columns: ColumnDef<Transaction>[] = [
  {
    // Checkbox column for row selection
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value: boolean) =>
            table.toggleAllPageRowsSelected(!!value)
          }
          aria-label="Select all"
          className="border-border bg-white shadow-lg border data-[state=checked]:border-0"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="border-border bg-white shadow-lg border data-[state=checked]:border-0"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  //   {
  //     accessorKey: "tx_id",
  //     header: ({ column }) => <SortableColumn column={column} title="ID" />,
  //     cell: ({ row }) => row.getValue("tx_id"),
  //     enableSorting: true,
  //   },
  {
    accessorKey: "tx_date",
    header: ({ column }) => <SortableColumn column={column} title="Date" />,
    cell: ({ row }) => format(new Date(row.getValue("tx_date")), "dd MMM yyyy"),
    enableSorting: true,
  },
  {
    accessorKey: "tx_type",
    header: ({ column }) => <SortableColumn column={column} title="Type" />,
    cell: ({ row }) => (
      <Badge variant={getTxTypeVariant(row.getValue("tx_type"))}>
        {row.getValue<string>("tx_type")}
      </Badge>
    ),
    enableSorting: true,
  },
  // TODO: Replace this with arrow icons, or remove the column and format rows based on direction e.g. green or red
  {
    accessorKey: "direction",
    header: ({ column }) => (
      <SortableColumn column={column} title="Direction" />
    ),
    cell: ({ row }) => (
      <Badge
        variant={row.getValue("direction") === "IN" ? "success" : "destructive"}
      >
        {row.getValue<string>("direction")}
      </Badge>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "material",
    header: ({ column }) => <SortableColumn column={column} title="Material" />,
    cell: ({ row }) => row.getValue("material"),
    enableSorting: true,
  },
  // Column for "Source" - either "Import", "New Drum", or "Repro Drum". Use a JOIN query to get the name of the source (depending on the tx_type))
  //   {
  //     accessorKey: "source",
  //     header: ({ column }) => <SortableColumn column={column} title="Source" />,
  //     cell: ({ row }) => row.getValue("source"),
  //     enableSorting: true,
  //   },
  {
    id: "actions",
    header: "",
    cell: (row: any) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>View Details</DropdownMenuItem>
          <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

/*
To implement filtering and sorting, you'll need:

1. For Filtering:
- Create a state for filters using useState or useReducer
- Implement filter functions for each column type
- Add filter components (e.g., dropdown, search input)
Example:
const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
table.setColumnFilters(columnFilters)

2. For Sorting:
- Create a state for sorting using useState
- Implement sort functions for different data types
- Use the built-in TanStack Table sorting functionality
Example:
const [sorting, setSorting] = useState<SortingState>([])
table.setSorting(sorting)

3. Utils needed:
- Filter utility functions for different data types (string, number, date)
- Sort utility functions for custom sorting logic
- Date formatting utilities for consistent date handling
*/
