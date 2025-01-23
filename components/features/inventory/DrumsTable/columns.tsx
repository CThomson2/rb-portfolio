// components/features/inventory/DrumsTable/columns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { SortableColumn, StatusFilter } from "@/components/shared/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import type { NewDrum } from "@/types/database/drums";
import { DrumStatusType } from "@/types/constant/drums";

// Add props for status filter state
interface ColumnProps {
  selectedStatuses: DrumStatusType[];
  setSelectedStatuses: React.Dispatch<React.SetStateAction<DrumStatusType[]>>;
}

export const createColumns = ({
  selectedStatuses,
  setSelectedStatuses,
}: ColumnProps): ColumnDef<NewDrum>[] => [
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
    header: () => (
      <StatusFilter
        title="Status"
        selectedStatuses={selectedStatuses}
        setSelectedStatuses={setSelectedStatuses}
      />
    ),

    cell: ({ row }) => (
      <Badge
        variant={(() => {
          switch (row.getValue<string>("status")) {
            case "available":
              return "success";
            case "scheduled":
              return "active";
            case "processed":
              return "secondary";
            case "pending":
              return "default";
            case "wasted":
            case "lost":
              return "destructive";
            default:
              return "secondary";
          }
        })()}
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
