import { flexRender } from "@tanstack/react-table";

import {
  TableHead,
  TableHeader as ShadTableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Table } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { TABLE_GRID_LAYOUT } from "@/lib/constants/table";

const TableHeader = <TData, _>({ table }: { table: Table<TData> }) => {
  return (
    <ShadTableHeader className="bg-[hsl(var(--table-header))] text-[hsl(var(--table-header-foreground))]">
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow
          key={headerGroup.id}
          className={cn(
            // TABLE_GRID_LAYOUT,
            "border-b border-[hsl(var(--table-header))]"
          )}
        >
          {headerGroup.headers.map((header) => (
            <TableHead
              key={header.id}
              className="px-3 py-3 text-center font-medium text-muted-foreground uppercase text-xs tracking-wide min-w-0 overflow-hidden"
            >
              {header.isPlaceholder
                ? null
                : flexRender(
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

export default TableHeader;
