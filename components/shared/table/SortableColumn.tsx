// Import necessary dependencies for table functionality and UI components
import { Column } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ChevronsUpDown, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Define props interface for the SortableHeader component
// Extends HTMLDivElement props and requires a table column and title
interface SortableColumnProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

// SortableColumn component - Creates a sortable column header with dropdown menu
// Generic types TData and TValue represent the data type and value type of the column
export function SortableColumn<TData, TValue>({
  column,
  title,
  className,
}: SortableColumnProps<TData, TValue>) {
  // If column is not sortable, render just the title
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  // Render sortable header with dropdown menu for sort options
  return (
    <div
      className={cn(
        "min-w-0 flex items-center gap-2 overflow-hidden",
        className
      )}
    >
      <DropdownMenu>
        {/* Trigger button shows current sort state with appropriate icon */}
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "h-8 min-w-0 truncate",
              "data-[state=open]:bg-primary/10 uppercase text-xs",
              "active:outline-none",
              column.getIsSorted() && "bg-primary/10"
            )}
          >
            <span className="min-w-fit">{title}</span>
            {/* Show appropriate sort direction icon based on current state */}
            {column.getIsSorted() === "desc" && <ArrowDown />}
            {column.getIsSorted() === "asc" && <ArrowUp />}
            {!column.getIsSorted() && <ChevronsUpDown className="h-1 w-1" />}
          </Button>
        </DropdownMenuTrigger>
        {/* Dropdown menu with sort options */}
        <DropdownMenuContent align="start">
          {/* Ascending sort option */}
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUp className="h-3.5 w-3.5 text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          {/* Descending sort option */}
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDown className="h-3.5 w-3.5 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
          {/* Option to remove sorting */}
          <DropdownMenuItem onClick={() => column.clearSorting()}>
            <X className="h-3.5 w-3.5 text-muted-foreground/70" />
            Remove
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
