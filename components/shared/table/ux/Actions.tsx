"use client";

import { useState, useCallback } from "react";
import {
  MoreVertical,
  Eye,
  Edit,
  PlayCircle,
  Calendar,
  Clock,
  ArrowRightLeft,
  FileText,
  Hash,
  Database,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { format } from "date-fns";
import { Badge } from "@/components/ui/Badge";
import { Separator } from "@/components/ui/Separator";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { getTxTypeVariant } from "@/lib/utils/formatters";
import type { Transaction } from "@/types/database/inventory/transactions";

type ActionType = "view" | "edit" | "assign" | null;

interface ActionModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  action: ActionType;
  transaction: Transaction;
}

const titles = {
  view: "Transaction Details",
  edit: "Edit Transaction",
  assign: "Assign for Production",
} as const;

const descriptions = {
  view: "View the details of this transaction.",
  edit: "Modify the details of this transaction.",
  assign: "Assign this transaction for production.",
} as const;

function ActionModal({
  isOpen,
  onOpenChange,
  action,
  transaction,
}: ActionModalProps) {
  if (!action) return null;

  const renderDetailItem = (
    icon: React.ReactNode,
    label: string,
    value: React.ReactNode
  ) => (
    <div className="flex items-start space-x-3 py-2">
      <div className="flex-shrink-0 mt-1">{icon}</div>
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <div className="text-sm">{value}</div>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">
              Transaction #{transaction.tx_id}
            </DialogTitle>
            <Badge
              variant={getTxTypeVariant(transaction.tx_type)}
              className="uppercase"
            >
              {transaction.tx_type}
            </Badge>
          </div>
          <DialogDescription>
            Detailed view of inventory transaction record
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <ScrollArea className="max-h-[calc(90vh-120px)] pr-4">
          <div className="grid grid-cols-2 gap-6 py-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Primary Information</h3>
              {renderDetailItem(
                <Calendar className="h-4 w-4" />,
                "Transaction Date",
                format(new Date(transaction.tx_date), "PPP")
              )}
              {renderDetailItem(
                <Clock className="h-4 w-4" />,
                "Created At",
                format(new Date(transaction.created_at), "PPP 'at' pp")
              )}
              {renderDetailItem(
                <Clock className="h-4 w-4" />,
                "Last Updated",
                format(new Date(transaction.updated_at), "PPP 'at' pp")
              )}
              {renderDetailItem(
                <ArrowRightLeft className="h-4 w-4" />,
                "Direction",
                <Badge
                  variant={
                    transaction.direction === "IN" ? "success" : "destructive"
                  }
                >
                  {transaction.direction}
                </Badge>
              )}
              {transaction.material &&
                renderDetailItem(
                  <Database className="h-4 w-4" />,
                  "Material",
                  transaction.material
                )}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Related Information</h3>
              {transaction.batch_code &&
                renderDetailItem(
                  <Hash className="h-4 w-4" />,
                  "Batch Code",
                  transaction.batch_code
                )}
              {transaction.tx_notes &&
                renderDetailItem(
                  <FileText className="h-4 w-4" />,
                  "Notes",
                  transaction.tx_notes
                )}
              {transaction.delivery_id &&
                renderDetailItem(
                  <Database className="h-4 w-4" />,
                  "Delivery ID",
                  transaction.delivery_id
                )}
              {transaction.drum_id &&
                renderDetailItem(
                  <Database className="h-4 w-4" />,
                  "Drum ID",
                  transaction.drum_id
                )}
              {transaction.repro_id &&
                renderDetailItem(
                  <Database className="h-4 w-4" />,
                  "Repro ID",
                  transaction.repro_id
                )}
              {transaction.process_id &&
                renderDetailItem(
                  <Database className="h-4 w-4" />,
                  "Process ID",
                  transaction.process_id
                )}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

interface ActionsProps {
  transaction: Transaction;
}

export function Actions({ transaction }: ActionsProps) {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    action: ActionType;
  }>({
    isOpen: false,
    action: null,
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleAction = useCallback((action: ActionType) => {
    setModalState({ isOpen: true, action });
    setDropdownOpen(false);
  }, []);

  const handleOpenChange = useCallback((open: boolean) => {
    setModalState((prev) => ({
      ...prev,
      isOpen: open,
      action: open ? prev.action : null,
    }));
  }, []);

  return (
    <>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <MoreVertical className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-[160px]"
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <DropdownMenuItem onClick={() => handleAction("view")}>
            <Eye className="mr-2 h-4 w-4" /> View Details
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleAction("edit")}>
            <Edit className="mr-2 h-4 w-4" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleAction("assign")}>
            <PlayCircle className="mr-2 h-4 w-4" /> Assign for Production
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ActionModal
        isOpen={modalState.isOpen}
        onOpenChange={handleOpenChange}
        action={modalState.action}
        transaction={transaction}
      />
    </>
  );
}
