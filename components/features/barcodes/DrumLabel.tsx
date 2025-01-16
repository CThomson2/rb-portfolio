import React from "react";
import { OrderFormData } from "@/types/database/orders";

interface DrumLabelProps {
  order: OrderFormData;
  onError: (error: string) => void;
}

export const DrumLabel: React.FC<DrumLabelProps> = ({
  order: { order_id, material, supplier },
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
    <div className="space-y-4">
      <p>
        <strong>Order ID:</strong> {order_id}
      </p>
      <p>
        <strong>Supplier:</strong> {supplier}
      </p>
      <p>
        <strong>Material:</strong> {material}
      </p>

      <button
        onClick={handleGeneratePDF}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Generate & View Barcode PDF
      </button>
    </div>
  );
};
