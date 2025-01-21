import React, { useRef } from "react";
import Barcode from "react-barcode";
import { OrderFormData } from "@/types/database/orders";

interface BarcodeLabelProps {
  order: OrderFormData;
}

export const BarcodeLabel: React.FC<BarcodeLabelProps> = ({
  order: { order_id, material, supplier },
}) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!printRef.current) return;

    // Use html2canvas to get the DOM as an image
    const html2canvas = (await import("html2canvas")).default;
    const jsPDF = (await import("jspdf")).default;

    const canvas = await html2canvas(printRef.current);
    const imageData = canvas.toDataURL("image/png");

    // Create a PDF
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "A4",
    });

    // Add the image to the PDF
    // You may want to calculate positioning/sizing more precisely
    pdf.addImage(imageData, "PNG", 20, 20, 200, 100);

    // Download the PDF
    pdf.save(`Order-${order_id}-label.pdf`);
  };

  return (
    <div>
      {/* This part is the label preview that will be converted to PDF */}
      <div
        ref={printRef}
        style={{
          width: "85%",
          height: "85vh",
          padding: 20,
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h3>{supplier}</h3>
        <h4>{material}</h4>
        <Barcode value={`${order_id}`} format="CODE128" />
      </div>

      <button onClick={handleDownloadPDF}>Download PDF</button>
    </div>
  );
};

export default BarcodeLabel;
