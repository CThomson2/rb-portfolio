import { flexRender } from "@tanstack/react-table";

import {
  TableHead,
  TableHeader as ShadTableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Table } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { TABLE_GRID_LAYOUT } from "@/lib/constants/table";

/**
 * TableHeader Component
 *
 * A reusable table header component that renders column headers using TanStack Table.
 *
 * How it works:
 * 1. Takes a TanStack table instance as a prop which contains header configuration
 * 2. Uses ShadTableHeader as the container with a dark background color scheme
 * 3. Maps through header groups (typically just one group for simple tables)
 * 4. For each header group, creates a TableRow with a bottom border
 * 5. Within each row, maps through individual headers to create TableHead cells
 * 6. Each header cell is styled with:
 *    - Centered text alignment
 *    - Uppercase text transform
 *    - Small text size with tracking
 *    - Padding and overflow handling
 * 7. Uses flexRender to render the actual header content from the column definition
 * 8. Handles placeholder headers by rendering null
 */
export const TableHeader = <TData, _>({ table }: { table: Table<TData> }) => {
  return (
    <ShadTableHeader className="bg-[hsl(var(--table-header))] text-[hsl(var(--table-header-foreground))]">
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow
          key={headerGroup.id}
          className={cn("border-b border-[hsl(var(--table-header))]")}
        >
          {/* Map through each header in the headerGroup. 
              headerGroup.headers contains all column headers for this row */}
          {headerGroup.headers.map((header) => (
            <TableHead
              key={header.id} // Unique identifier for each header cell
              className="px-3 py-3 text-center font-medium text-muted-foreground uppercase text-xs tracking-wide min-w-0 overflow-hidden"
            >
              {/* header.isPlaceholder is true for columns that don't have header content
                  For example, columns used just for row selection or expansion */}
              {header.isPlaceholder
                ? null
                : // flexRender is a TanStack Table utility that renders cell/header content
                  // It handles different types of content (strings, components, render functions)
                  // header.column.columnDef.header contains the header content definition
                  // header.getContext() provides context like sorting state to the header
                  flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </ShadTableHeader>
  );
};
