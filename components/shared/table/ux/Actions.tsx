"use client";

import { useState, useCallback, useEffect } from "react";
import {
  MoreVertical,
  Eye,
  Edit,
  PlayCircle,
  Calendar,
  Clock,
  Scan,
  ScanLine,
  ArrowRightLeft,
  FileText,
  Hash,
  Database,
  ScanBarcode,
  Truck,
  Recycle,
  FlaskRound,
  Atom,
  Disc3,
  CheckCircle2,
  Circle,
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
import type {
  Transaction,
  TransactionImport,
  TransactionProcessing,
} from "@/types/database/inventory/transactions";
import { cn } from "@/lib/utils";

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

interface ProgressStageProps {
  number: number;
  isCompleted: boolean;
  isClickable: boolean;
  onClick?: () => void;
  label: string;
}

function ProgressStage({
  number,
  isCompleted,
  isClickable,
  onClick,
  label,
}: ProgressStageProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="h-10 flex items-center">
        <button
          className={cn(
            "relative rounded-full w-10 h-10 flex items-center justify-center transition-colors",
            isCompleted
              ? "text-primary-foreground bg-primary"
              : "text-muted-foreground bg-muted",
            isClickable && "hover:bg-primary/90 cursor-pointer",
            !isClickable && "cursor-default"
          )}
          onClick={isClickable ? onClick : undefined}
          disabled={!isClickable}
        >
          {number}
        </button>
      </div>
      <span className="text-xs mt-2 text-muted-foreground">{label}</span>
    </div>
  );
}

interface ProgressTrackerProps {
  currentTransaction: TransactionImport | TransactionProcessing;
  onNavigateToTransaction?: (txId: number) => void;
}

function ProgressTracker({
  currentTransaction,
  onNavigateToTransaction,
}: ProgressTrackerProps) {
  const [relatedTransactions, setRelatedTransactions] = useState<{
    import?: TransactionImport;
    processing?: TransactionProcessing;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  // Fetch related transactions when the component mounts
  useEffect(() => {
    const fetchRelatedTransactions = async () => {
      console.log(
        "Fetching related transactions for drum:",
        currentTransaction.drum_id
      );
      try {
        const response = await fetch(
          `/api/inventory/transactions/drum/${currentTransaction.drum_id}`
        );
        const data = await response.json();
        console.log("Related transactions response:", data);

        // Organize transactions by type and cast to specific types
        const transactions = data.transactions.reduce(
          (
            acc: {
              import?: TransactionImport;
              processing?: TransactionProcessing;
            },
            tx: Transaction
          ) => {
            if (tx.tx_type === "import") {
              console.log("Found import transaction:", tx.tx_id);
              acc.import = tx as TransactionImport;
            } else if (tx.tx_type === "processing") {
              console.log("Found processing transaction:", tx.tx_id);
              acc.processing = tx as TransactionProcessing;
            }
            return acc;
          },
          {}
        );

        console.log("Organized transactions:", transactions);
        setRelatedTransactions(transactions);
      } catch (error) {
        console.error("Failed to fetch related transactions:", error);
      }
    };

    fetchRelatedTransactions();
  }, [currentTransaction.drum_id]);

  const latestTxType = currentTransaction.tx_type.toLowerCase();
  const isProcessingStage = latestTxType === "processing";

  const handleStageClick = async (txId: number) => {
    console.log("Clicked stage for transaction:", txId);
    setIsLoading(true);
    onNavigateToTransaction?.(txId);
    setIsLoading(false);
  };

  return (
    <div className="mt-8 pt-4 border-t">
      <h3 className="text-lg font-semibold mb-6">
        Drum Progress
        {isLoading && <span className="ml-2 text-sm">(Loading...)</span>}
      </h3>
      <div className="flex items-center justify-center gap-4">
        <ProgressStage
          number={1}
          isCompleted={true}
          isClickable={
            isProcessingStage &&
            relatedTransactions.import?.tx_id !== currentTransaction.tx_id
          }
          onClick={() =>
            relatedTransactions.import &&
            handleStageClick(relatedTransactions.import.tx_id)
          }
          label="Import"
        />
        <div className="w-16 h-[2px] bg-muted self-center -mt-6" />
        <ProgressStage
          number={2}
          isCompleted={isProcessingStage}
          isClickable={
            !isProcessingStage &&
            relatedTransactions.processing?.tx_id !== currentTransaction.tx_id
          }
          onClick={() =>
            relatedTransactions.processing &&
            handleStageClick(relatedTransactions.processing.tx_id)
          }
          label="Processing"
        />
        <div className="w-16 h-[2px] bg-muted self-center -mt-6" />
        <ProgressStage
          number={3}
          isCompleted={false}
          isClickable={false}
          label="Future"
        />
      </div>
    </div>
  );
}

function ActionModal({
  isOpen,
  onOpenChange,
  action,
  transaction,
}: ActionModalProps) {
  const [currentTx, setCurrentTx] = useState(transaction);
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigateToTransaction = useCallback(async (txId: number) => {
    console.log("Navigating to transaction:", txId);
    setIsLoading(true);

    try {
      const response = await fetch(`/api/inventory/transactions/${txId}`);
      const data = await response.json();
      console.log("Navigation response:", data);

      if (!data.transaction) {
        console.error("No transaction data received");
        return;
      }

      // Cast the transaction based on its type
      const tx = data.transaction as Transaction;
      if (tx.tx_type === "import" || tx.tx_type === "processing") {
        console.log("Updating current transaction to:", tx);
        setCurrentTx(tx as TransactionImport | TransactionProcessing);
      }
    } catch (error) {
      console.error("Failed to fetch transaction:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

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
              Scan #{currentTx.tx_id}
              {isLoading && <span className="ml-2 text-sm">(Loading...)</span>}
            </DialogTitle>
            <Badge
              variant={getTxTypeVariant(currentTx.tx_type)}
              className="uppercase mr-8 mt-1"
            >
              {currentTx.tx_type}
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
                "Recorded Date",
                format(new Date(transaction.tx_date), "PPP")
              )}
              {renderDetailItem(
                <ScanBarcode className="h-4 w-4" />,
                "Time of Scan",
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
                  <Atom className="h-4 w-4" />,
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
                  <Truck className="h-4 w-4" />,
                  "Delivery ID",
                  transaction.delivery_id
                )}
              {transaction.drum_id &&
                renderDetailItem(
                  <Disc3 className="h-4 w-4" />,
                  "Drum ID",
                  transaction.drum_id
                )}
              {transaction.repro_id &&
                renderDetailItem(
                  <Recycle className="h-4 w-4" />,
                  "Repro ID",
                  transaction.repro_id
                )}
              {transaction.process_id &&
                renderDetailItem(
                  <FlaskRound className="h-4 w-4" />,
                  "Process ID",
                  transaction.process_id
                )}
            </div>
          </div>

          {(currentTx.tx_type === "import" ||
            currentTx.tx_type === "processing") && (
            <ProgressTracker
              currentTransaction={
                currentTx as TransactionImport | TransactionProcessing
              }
              onNavigateToTransaction={handleNavigateToTransaction}
            />
          )}
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
