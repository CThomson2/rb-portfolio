import { Table } from "@tanstack/react-table";
import { Pagination } from "./Pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function TableFooter<TData>({ table }: { table: Table<TData> }) {
  return (
    <div className="flex items-center justify-between px-5 py-10">
      {/* Left side - selected rows count */}
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>

      {/* Right side - pagination, rows per page, and page number */}
      <div className="flex items-center space-x-6 lg:space-x-8">
        {/* Rows per page select */}
        <div className="flex items-center space-x-2">
          <p className="text-sm">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value: string) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Current page indicator */}
        <div className="flex min-w-[100px] items-center justify-center text-sm">
          <span className="text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
        </div>

        {/* Pagination controls */}
        <Pagination table={table} />
      </div>
    </div>
  );
}

export default TableFooter;
