"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Download } from "lucide-react";
import { format } from "date-fns";
import type { Order } from "@/types/database/orders";
import { cn } from "@/lib/utils";

interface GridModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export const GridModal: React.FC<GridModalProps> = ({
  order,
  isOpen,
  onClose,
}) => {
  const handleGeneratePDF = async () => {
    if (!order) return;

    try {
      const res = await fetch(
        `/api/barcodes/generate/${order.order_id}?material=${encodeURIComponent(
          order.material
        )}&supplier=${encodeURIComponent(order.supplier)}`
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

  if (!order) return null;

  const canDownloadBarcodes =
    order.delivery_status === "pending" || order.delivery_status === "partial";

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
                  className={cn(
                    "text-lg font-semibold",
                    order.delivery_status === "complete"
                      ? "text-green-400"
                      : order.delivery_status === "partial"
                      ? "text-yellow-400"
                      : "text-slate-300"
                  )}
                >
                  {order.delivery_status}
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
            {/* <div className="mt-2 text-center">
              <p className="text-sm text-slate-400">
                <span className="text-white font-medium">
                  {order.quantity_received || 0}
                </span>{" "}
                <span className="text-sm">received</span>
              </p>
              <p className="text-sm text-slate-400">
                of{" "}
                <span className="text-white font-medium">{order.quantity}</span>{" "}
                ordered
              </p>
            </div> */}
          </div>
        </div>

        {/* Download button */}
        {canDownloadBarcodes && (
          <div className="pt-4 border-t border-slate-700">
            <Button
              onClick={handleGeneratePDF}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Barcode Labels
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
// data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:duration-300 data-[state=open]:scale-100 data-[state=closed]:scale-0 ease-out
