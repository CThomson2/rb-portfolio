"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Download, Calendar } from "lucide-react";
import { format } from "date-fns";
import type { Order } from "@/types/database/inventory/orders";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/Checkbox";

interface GridModalProps {
  /** The order data to display */
  order: Order | null;
  /** Controls modal visibility */
  isOpen: boolean;
  /** Callback function to close the modal */
  onClose: () => void;
  /** Function to update the order data */
  onOrderUpdate?: (updatedOrder: Order) => void;
}

/**
 * A modal component for displaying detailed order information and managing ETA dates.
 * Allows viewing order details, updating ETA dates, and generating barcode labels for pending orders.
 *
 * @component
 * @param {GridModalProps} props - Component props
 * @returns {JSX.Element | null} The modal component or null if no order provided
 */
export const GridModal: React.FC<GridModalProps> = ({
  order,
  isOpen,
  onClose,
  onOrderUpdate,
}: GridModalProps) => {
  // State declarations must come before any conditional returns
  const [isEditingETA, setIsEditingETA] = useState(false);
  const [etaStart, setEtaStart] = useState<string>(
    order?.eta_start ? format(new Date(order.eta_start), "yyyy-MM-dd") : ""
  );
  const [etaEnd, setEtaEnd] = useState<string>(
    order?.eta_end ? format(new Date(order.eta_end), "yyyy-MM-dd") : ""
  );
  const [isDateRange, setIsDateRange] = useState(!!order?.eta_end);

  // Early return if no order data available
  if (!order || !isOpen) return null;

  // Derived status calculation
  const getETAStatus = (
    start: Date | null | undefined,
    end: Date | null | undefined
  ): "tbc" | "confirmed" | "overdue" => {
    if (!start) return "tbc";
    const startDate = start instanceof Date ? start : new Date(start);
    const endDate = end instanceof Date ? end : end ? new Date(end) : null;

    if (endDate && new Date() > endDate && order.status === "pending") {
      return "overdue";
    }
    return "confirmed";
  };

  const handleSaveETA = async () => {
    try {
      const response = await fetch(
        `/api/inventory/orders/${order.order_id}/eta`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            etaStart: etaStart || null,
            etaEnd: isDateRange ? etaEnd : etaStart,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to update ETA");

      const updatedOrder = await response.json();
      onOrderUpdate?.(updatedOrder);
      setIsEditingETA(false);
    } catch (error) {
      console.error("Error updating ETA:", error);
    }
  };

  const handleGeneratePDF = async () => {
    try {
      const res = await fetch(
        `/api/barcodes/generate/${order.order_id}?material=${encodeURIComponent(
          order.material
        )}&supplier=${encodeURIComponent(order.supplier)}`
      );

      if (!res.ok) throw new Error("Failed to generate barcode PDF");

      const pdfBlob = await res.blob();
      const pdfUrl = window.URL.createObjectURL(pdfBlob);
      window.open(pdfUrl, "_blank");
    } catch (error) {
      console.error("Error generating barcode PDF:", error);
    }
  };

  // Helper to determine if order is pending or partially delivered
  const isPendingArrival = ["pending", "partial"].includes(order.status);
  const etaStatus = getETAStatus(
    order.eta_start ? new Date(order.eta_start) : null,
    order.eta_end ? new Date(order.eta_end) : null
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={cn(
          "sm:max-w-[700px] bg-slate-800 border-slate-700 space-y-8",
          "transform-gpu",
          "transition-[transform,opacity] duration-1000 ease-in-out",
          "data-[state=closed]:opacity-0 data-[state=open]:opacity-100",
          "data-[state=closed]:scale-0 data-[state=open]:scale-100"
        )}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white text-center">
            Order #{order.order_id}
          </DialogTitle>
        </DialogHeader>

        {/* Main content grid */}
        <div className="flex flex-row justify-center items-center gap-16">
          {/* Left side - Order details */}
          <div className="space-y-6">
            {/* Details grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              <div className="flex flex-col justify-center text-center items-center">
                <h3 className="text-sm font-medium text-slate-400 mb-1.5">
                  Supplier
                </h3>
                <p className="text-lg font-semibold text-white">
                  {order.supplier}
                </p>
              </div>
              <div className="flex flex-col justify-center text-center items-center">
                <h3 className="text-sm font-medium text-slate-400 mb-1.5">
                  Material
                </h3>
                <p className="text-lg font-semibold text-white">
                  {order.material}
                </p>
              </div>
              <div className="flex flex-col justify-center text-center items-center">
                <h3 className="text-sm font-medium text-slate-400 mb-1.5">
                  Status
                </h3>
                <p
                  className={cn("text-lg font-semibold", {
                    "text-green-400": order.status === "complete",
                    "text-yellow-400": order.status === "partial",
                    "text-slate-300": order.status === "pending",
                  })}
                >
                  {order.status}
                </p>
              </div>
              <div className="flex flex-col justify-center text-center items-center">
                <h3 className="text-sm font-medium text-slate-400 mb-1.5">
                  Date Ordered
                </h3>
                <p className="text-lg font-semibold text-white">
                  {order.date_ordered
                    ? format(new Date(order.date_ordered), "dd MMM yyyy")
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Quantity circle */}
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-sm font-medium text-slate-400 mb-3 text-center">
              Drums Received
            </h3>
            <div className="relative w-32 h-32 rounded-full border-4 border-blue-500 flex flex-col items-center justify-center bg-slate-700/50">
              <div className="text-3xl font-normal text-white -translate-x-2">
                {order.quantity_received || 0}{" "}
              </div>
              <div className="w-20 h-[2px] bg-blue-500 my-2 rotate-[-20deg]" />
              <div className="text-3xl font-bold text-white translate-x-2">
                {order.quantity}{" "}
              </div>
            </div>
          </div>
        </div>

        {/* ETA Section - Displays and allows editing of Expected Time of Arrival */}
        {isPendingArrival && (
          <div className="space-y-4">
            {/* ETA Section Header */}
            <div className="flex flex-col items-center space-y-2 pt-4 border-t border-slate-700">
              <h3 className="text-sm font-medium text-slate-400">
                Expected Delivery <span className="italic">(ETA)</span>
              </h3>

              {/* ETA Form - Shown when editing dates */}
              {isEditingETA ? (
                <div className="flex flex-col space-y-3">
                  {/* Date Input Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Start Date Input */}
                    <div>
                      <label className="text-sm text-slate-400">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={etaStart}
                        onChange={(e) => {
                          setEtaStart(e.target.value);
                          if (!isDateRange) setEtaEnd(e.target.value);
                        }}
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full mt-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
                        title="Select ETA start date"
                        aria-label="ETA start date"
                        placeholder="Select start date"
                      />
                    </div>

                    {/* End Date Input - Disabled unless date range is enabled */}
                    <div>
                      <label className="text-sm text-slate-400">End Date</label>
                      <input
                        type="date"
                        value={etaEnd}
                        onChange={(e) => setEtaEnd(e.target.value)}
                        disabled={!isDateRange}
                        min={etaStart}
                        className={cn(
                          "w-full mt-1 px-3 py-2 border rounded-md",
                          !isDateRange
                            ? "bg-slate-800 border-slate-700 text-slate-500"
                            : "bg-slate-700 border-slate-600 text-white"
                        )}
                        title="Select ETA end date"
                        aria-label="ETA end date"
                        placeholder="Select end date"
                      />
                    </div>
                  </div>

                  {/* Date Range Toggle */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="date-range"
                      checked={isDateRange}
                      onCheckedChange={(checked) => {
                        setIsDateRange(checked === true);
                        if (!checked) setEtaEnd(etaStart);
                      }}
                    />
                    <label
                      htmlFor="date-range"
                      className="text-sm text-slate-400 cursor-pointer"
                    >
                      Set date range?
                    </label>
                  </div>

                  {/* Form Action Buttons */}
                  <div className="flex justify-end space-x-2">
                    <Button
                      onClick={() => {
                        setIsEditingETA(false);
                        setIsDateRange(false);
                      }}
                      variant="outline"
                      className="bg-transparent border-slate-600 text-slate-300 hover:bg-slate-700"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSaveETA}
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      Save ETA
                    </Button>
                  </div>
                </div>
              ) : (
                /* ETA Display - Shows current ETA with edit button */
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2 px-4 py-2 bg-slate-700 rounded-md">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    <span
                      className={cn("font-medium", {
                        "text-red-400": etaStatus === "overdue",
                        "text-emerald-400": etaStatus === "confirmed",
                        "text-slate-400": etaStatus === "tbc",
                      })}
                    >
                      {order.eta_start
                        ? `${format(new Date(order.eta_start), "dd/MM")}${
                            order.eta_end
                              ? ` - ${format(new Date(order.eta_end), "dd/MM")}`
                              : ""
                          }`
                        : "TBC"}
                    </span>
                  </div>
                  <Button
                    onClick={() => setIsEditingETA(true)}
                    variant="outline"
                    className="bg-transparent border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    Edit
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TODO: Move back into coditional block after scanning barcodes manually */}
        {/* Download button */}
        <div className="pt-4 border-t border-slate-700">
          <Button
            onClick={handleGeneratePDF}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Barcode Labels
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
