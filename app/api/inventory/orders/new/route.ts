import type { NextApiRequest, NextApiResponse } from "next";
import bwipjs from "bwip-js";
import { PDFDocument, StandardFonts } from "pdf-lib";

// Convert inches to PDF points (72 points = 1 inch)
const inchesToPoints = (inches: number) => inches * 72;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { drumId } = req.query;
    if (!drumId) {
      return res.status(400).send("drumId is required");
    }

    // 1) Generate barcode image with bwip-js
    // Code128 is a common, versatile barcode type.
    // You can use 'code39', 'qrcode', etc., depending on your needs.
    const barcodeBuffer = await bwipjs.toBuffer({
      bcid: "code128", // Barcode type
      text: String(drumId), // Text to encode
      scale: 3, // 3x scaling factor
      height: 10, // height of barcode bars
      includetext: true, // show text below barcode
      textxalign: "center", // center the text under the barcode
    });

    // 2) Create a new PDF with pdf-lib
    // We'll create a single page sized for 4" x 6" (in points).
    // 1 inch = 72 points, so 4 inches wide = 288 points; 6 inches tall = 432 points.
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([inchesToPoints(4), inchesToPoints(6)]);

    // Embed the barcode PNG in the PDF
    const barcodeImage = await pdfDoc.embedPng(barcodeBuffer);
    const { width, height } = barcodeImage.scale(1);

    // Position the barcode somewhere on the page
    // (Adjust x, y, width, height to fit your layout)
    page.drawImage(barcodeImage, {
      x: 20,
      y: 100, // from bottom
      width,
      height,
    });

    // Optional: add some text above/below the barcode
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    page.drawText(`Drum ID: ${drumId}`, {
      x: 20,
      y: 180,
      size: 14,
      font,
    });

    // 3) Finalize the PDF and return it
    const pdfBytes = await pdfDoc.save();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename="drum-${drumId}.pdf"`
    );
    res.send(Buffer.from(pdfBytes));
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error generating barcode PDF");
  }
}
