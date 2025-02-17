import React from "react";
import { OrderFormData } from "@/types/database/inventory/orders";
import { FileDown } from "lucide-react";

interface DrumLabelProps {
  order: OrderFormData;
  onError: (error: string) => void;
}

export const DrumLabel: React.FC<DrumLabelProps> = ({
  order: { order_id, material, supplier, po_number },
  onError,
}) => {
  /**
   * Calls the backend route to fetch a generated PDF for this order.
   * We open the PDF in a new tab once we get the Blob.
   */
  const handleGeneratePDF = async () => {
    try {
      // Make a GET request to your Next.js route, e.g. /api/barcodes/generate/[orderId]
      // (Replace "generate" with your actual folder/filename if different.)
      const res = await fetch(
        `/api/barcodes/generate/${order_id}?material=${encodeURIComponent(
          material
        )}&supplier=${encodeURIComponent(supplier)}`
      );

      if (!res.ok) {
        throw new Error("Failed to generate barcode PDF");
      }

      console.log("res", res);

      // Convert the response to a Blob (binary data)
      const pdfBlob = await res.blob();

      // Create a temporary URL to open the Blob in a new tab
      const pdfUrl = window.URL.createObjectURL(pdfBlob);
      window.open(pdfUrl, "_blank");
    } catch (error) {
      console.error("Error generating barcode PDF:", error);
      onError("Failed to generate barcode PDF");
    }
  };

  return (
    <div className="space-y-8">
      {/* Order Details Section */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-slate-400 text-sm">Order ID</p>
            <p className="text-xl font-semibold text-white">{order_id}</p>
          </div>
          <div className="space-y-1">
            <p className="text-slate-400 text-sm">Material</p>
            <p className="text-xl font-semibold text-white">{material}</p>
          </div>
          <div className="space-y-1">
            <p className="text-slate-400 text-sm">Supplier</p>
            <p className="text-xl font-semibold text-white">{supplier}</p>
          </div>
          <div className="space-y-1">
            <p className="text-slate-400 text-sm">Purchase Order Number</p>
            <p className="text-xl font-semibold text-white">{po_number}</p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-slate-600" />

      {/* PDF Generation Section */}
      <div className="space-y-3">
        <p className="text-slate-300 text-sm">
          Your order has been created successfully. Generate and print barcode
          labels for each drum in this order.
        </p>
        <button
          onClick={handleGeneratePDF}
          className="group flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg transition-all duration-200 hover:translate-y-[-2px] active:translate-y-0 shadow-lg hover:shadow-blue-500/25"
        >
          <FileDown className="w-5 h-5 transition-transform group-hover:scale-110" />
          <span className="font-medium">Download Barcode Labels</span>
        </button>
      </div>
    </div>
  );
};
