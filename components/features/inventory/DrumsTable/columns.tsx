// components/features/inventory/DrumsTable/columns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { SortableColumn, StatusFilter } from "@/components/shared/table";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Download, FileDown } from "lucide-react";
import { format } from "date-fns";
import type { NewDrum } from "@/types/database/inventory/drums";
import { DrumStatusType } from "@/types/constant/inventory/drums";

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
    cell: ({ row }) => (
      <div className="font-semibold text-base">{row.getValue("drum_id")}</div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "material",
    header: ({ column }) => <SortableColumn column={column} title="Material" />,
    cell: ({ row }) => (
      <div className="font-medium text-base">{row.getValue("material")}</div>
    ),
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
    cell: ({ row }) => {
      const status = row.getValue<string>("status");
      return (
        <Badge
          variant={(() => {
            switch (status) {
              case "available":
                return "success";
              case "scheduled":
                return "active";
              case "processed":
                return "outline";
              case "pending":
                return "default";
              case "wasted":
              case "lost":
                return "destructive";
              default:
                return "secondary";
            }
          })()}
          className="px-4 py-1 text-sm font-medium"
        >
          {status}
        </Badge>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "location",
    header: ({ column }) => <SortableColumn column={column} title="Location" />,
    cell: ({ row }) => (
      <div className="font-medium text-base">{row.getValue("location")}</div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "date_ordered",
    header: ({ column }) => (
      <SortableColumn column={column} title="Date Ordered" />
    ),
    cell: ({ row }) => (
      <div className="font-medium text-base">
        {format(new Date(row.getValue("date_ordered")), "dd MMM yyyy")}
      </div>
    ),
    enableSorting: true,
  },
  // TODO: Fix bug - no data is showing for date_processed for the "processed" status drums, even though the values are in the SQL. Check API Prisma logic.
  {
    accessorKey: "date_processed",
    header: ({ column }) => (
      <SortableColumn column={column} title="Date Processed" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("date_processed") as string | null;
      return (
        <div className="font-medium text-base">
          {date ? format(new Date(date), "dd MMM yyyy") : "-"}
        </div>
      );
    },
    enableSorting: true,
  },
  {
    id: "barcode",
    header: () => (
      <div className="flex items-center gap-2 text-slate-300">
        Barcode <FileDown className="h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as DrumStatusType;
      const orderId = row.getValue("order_id") as number;
      const drumId = row.getValue("drum_id") as number;
      const material = row.getValue("material") as string;
      const supplier = row.getValue("supplier") as string;

      if (status !== "pending") return null;

      const handleGeneratePDF = async () => {
        try {
          const res = await fetch(
            `/api/barcodes/generate/${orderId}?material=${encodeURIComponent(
              material
            )}&supplier=${encodeURIComponent(supplier)}`
          );

          if (!res.ok) {
            throw new Error("Failed to generate barcode PDF");
          }

          const pdfBlob = await res.blob();
          const pdfUrl = window.URL.createObjectURL(pdfBlob);
          window.open(pdfUrl, "_blank");
        } catch (error) {
          console.error("Error generating barcode PDF:", error);
        }
      };

      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleGeneratePDF}
          className="hover:bg-slate-700/50"
        >
          <Download className="h-4 w-4" />
        </Button>
      );
    },
  },
];
