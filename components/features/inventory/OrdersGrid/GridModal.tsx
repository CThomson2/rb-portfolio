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
      <DialogContent className="sm:max-w-[600px] bg-slate-800 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Order #{order.order_id} Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-slate-400">Supplier</h3>
              <p className="text-lg font-semibold text-white">
                {order.supplier}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-400">Material</h3>
              <p className="text-lg font-semibold text-white">
                {order.material}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-slate-400">Status</h3>
              <p
                className={`text-lg font-semibold ${
                  order.delivery_status === "complete"
                    ? "text-green-400"
                    : order.delivery_status === "partial"
                    ? "text-yellow-400"
                    : "text-slate-300"
                }`}
              >
                {order.delivery_status}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-400">
                Date Ordered
              </h3>
              <p className="text-lg font-semibold text-white">
                {order.date_ordered
                  ? format(new Date(order.date_ordered), "dd MMM yyyy")
                  : "N/A"}
              </p>
            </div>
          </div>

          {/* Quantity Circle */}
          <div className="flex justify-center py-4">
            <div className="relative w-32 h-32 rounded-full border-4 border-blue-500 flex flex-col items-center justify-center bg-slate-700/50">
              <div className="text-3xl font-bold text-white -translate-x-2">
                {order.quantity_received || 0}
              </div>
              <div
                style={{ transform: "rotate(-15deg)" }}
                className="w-16 h-[2px] bg-blue-500 my-2"
              />
              <div className="text-3xl font-bold text-white translate-x-2">
                {order.quantity}
              </div>
            </div>
          </div>

          {canDownloadBarcodes && (
            <div className="pt-4 border-t border-slate-700">
              <Button
                onClick={handleGeneratePDF}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Barcode Labels
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
