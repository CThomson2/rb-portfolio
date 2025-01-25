import { Table } from "@tanstack/react-table";
import {
  TableHead,
  TableHeader as UITableHeader,
  TableRow,
} from "@/components/ui/Table";
import { flexRender } from "@tanstack/react-table";
import { cn } from "@/lib/utils";

interface TableHeaderProps<TData> {
  table: Table<TData>;
  className?: string;
}

export function TableHeader<TData>({
  table,
  className,
}: TableHeaderProps<TData>) {
  return (
    <UITableHeader className={className}>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableHead key={header.id} className="h-12 px-6 text-slate-300">
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
    </UITableHeader>
  );
}
