// components/features/inventory/DrumsTable/columns.tsx
import { ColumnDef } from "@tanstack/react-table";
import {
  SortableColumn,
  StatusFilter,
} from "@/components/shared/table";
import { Badge } from "@/components/ui/Badge";
import { format } from "date-fns";
import type { NewDrum } from "@/types/database/drums";

export const columns: ColumnDef<NewDrum>[] = [
  {
    accessorKey: "drum_id",
    header: ({ column }) => <SortableColumn column={column} title="ID" />,
    cell: ({ row }) => row.getValue("drum_id"),
    enableSorting: true,
  },
  {
    accessorKey: "material",
    header: ({ column }) => <SortableColumn column={column} title="Material" />,
    cell: ({ row }) => row.getValue("material"),
    enableSorting: true,
  },
  {
    accessorKey: "status",
    // header: ({ column }) => <SortableColumn column={column} title="Status" />,
    header: ({ column }) =>
      <StatusFilter
        title="Status"
        selectedStatuses={[]}
        setSelectedStatuses={() => {}}
      />,
    cell: ({ row }) => (
      <Badge
        variant={row.getValue("status") === "available" ? "success" : "default"}
      >
        {row.getValue<string>("status")}
      </Badge>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "location",
    header: ({ column }) => <SortableColumn column={column} title="Location" />,
    cell: ({ row }) => row.getValue("location"),
    enableSorting: true,
  },
  {
    accessorKey: "date_ordered",
    header: ({ column }) => (
      <SortableColumn column={column} title="Date Ordered" />
    ),
    cell: ({ row }) =>
      format(new Date(row.getValue("date_ordered")), "dd MMM yyyy"),
    enableSorting: true,
  },
  {
    accessorKey: "date_processed",
    header: ({ column }) => (
      <SortableColumn column={column} title="Processed" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("date_processed");
      return date instanceof Date ? format(date, "dd MMM yyyy") : "-";
    },
    enableSorting: true,
  },
];
