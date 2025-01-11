"use client";

// Import necessary dependencies for table functionality
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/Checkbox";
import { SortableColumn } from "@/components/shared/table/SortableColumn";
// Import individual cell components for better organization
import ProductName from "@/components/features/products/ProductTable/table-data/ProductName";
import ProductGrade from "@/components/features/products/ProductTable/table-data/ProductGrade";

import ProductStockLevel from "@/components/features/products/ProductTable/table-data/ProductStockLevel";

import ProjectLastUpdate from "@/components/shared/projects/LastUpdate";
import { ProjectActions } from "@/components/shared/Actions";
import ProjectTimeLine from "@/components/shared/projects/Timeline";
import type { ProductTableRow } from "@/types/components/products";

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

// Column definitions for the table
export const columns: ColumnDef<ProductTableRow>[] = [
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
  {
    // ID column with sorting enabled
    //   accessorKey: "product_id",
    //   header: ({ column }) => (
    //     <SortableHeader column={column} title="ID #" className="w-[50px]" />
    //   ),
    //   cell: ({ row }) => (
    //     <div className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">
    //       {row.getValue<number>("product_id").toString()}
    //     </div>
    //   ),
    //   enableSorting: true,
    // },
    // {
    // Product name column with sorting enabled
    // accessorKey: Specifies which property from the data object to use for this column ('name' in this case)
    // header: Renders the column header using SortableHeader component, passing the column object and title
    // cell: Renders each cell in this column using ProductName component, passing the name value from the row
    // enableSorting: Allows this column to be sorted when clicking the header
    accessorKey: "name",
    header: ({ column }) => <SortableColumn column={column} title="Product" />,
    cell: ({ row }) => (
      <div className="min-w-0 overflow-hidden whitespace-nowrap">
        <ProductName name={row.getValue("name")} />
      </div>
    ),
    enableSorting: true,
  },
  {
    // Grade column - traffic light icons to show varying quality
    accessorKey: "grade",
    header: ({ column }) => <SortableColumn column={column} title="Grade" />,
    cell: ({ row }) => (
      <div className="min-w-fit max-w-[90px] overflow-hidden">
        <ProductGrade grade={row.getValue("grade")} />
      </div>
    ),
    enableSorting: true,
  },
  {
    // Product lot number (SKU) column
    accessorKey: "sku",
    header: "Lot number",
    cell: ({ row }) => (
      <div className="min-w-0 overflow-hidden text-left">
        {row.getValue("sku")}
      </div>
    ),
  },
  {
    // Last updated column with date sorting
    accessorKey: "cas_number",
    header: ({ column }) => (
      <SortableColumn column={column} title="CAS number" />
    ),
    cell: ({ row }) => (
      <div className="min-w-0 overflow-hidden">
        <ProjectLastUpdate date={row.getValue("cas_number")} />
      </div>
    ),
    enableSorting: true,
  },
  {
    // Actions column for row operations:
    // Expand info | View product Modal
    // Add to cart | Go to Checkout | Favourite
    accessorKey: "actions",
    header: "Actions",
    cell: () => (
      <div className="min-w-0 overflow-hidden">
        <ProjectActions />
      </div>
    ),
  },
  {
    // Status column - can be enhanced with status-based filtering
    accessorKey: "stock_level",
    header: "Stock level",
    cell: ({ row }) => (
      <div className="min-w-0 overflow-hidden">
        <ProductStockLevel stockLevel={row.getValue("stock_level")} />
      </div>
    ),
  },
  // {
  //   // Resources column - can implement multi-select filtering
  //   accessorKey: "resources",
  //   header: "Chemical group",
  //   cell: ({ row }) => (
  //     <ProjectResources resources={row.getValue("resources")} />
  //   ),
  // },
  // {
  //   // Timeline column - can implement date range filtering
  //   accessorKey: "timeline",
  //   header: "Timeline",
  //   cell: ({ row }) => (
  //     <ProjectTimeLine
  //       startDate={row.getValue("start_date")}
  //       endDate={row.getValue("end_date")}
  //     />
  //   ),
  // },
  // {
  //   // Cost column with number sorting and formatting
  //   accessorKey: "estimated_cost",
  //   header: ({ column }) => (
  //     <SortableHeader column={column} title="Estimated cost" />
  //   ),
  //   cell: ({ row }) => (
  //     <p className="text-base">
  //       {formatCurrency(row.getValue("estimated_cost"))}
  //     </p>
  //   ),
  //   enableSorting: true,
  // },
];
