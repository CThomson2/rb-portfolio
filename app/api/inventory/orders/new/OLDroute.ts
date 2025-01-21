import { NextResponse } from "next/server";
import bwipjs from "bwip-js";
import { PDFDocument, StandardFonts } from "pdf-lib";

// Convert inches to PDF points (72 points = 1 inch)
const inchesToPoints = (inches: number) => inches * 72;

// Helper function to generate barcode buffer
async function generateBarcodeBuffer(drumId: string) {
  return bwipjs.toBuffer({
    bcid: "code128", // Barcode type
    text: drumId, // Text to encode
    scale: 3, // 3x scaling factor
    height: 10, // height of barcode bars
    includetext: true, // show text below barcode
    textxalign: "center", // center the text under the barcode
  });
}

// 2) Create a new PDF with pdf-lib
// We'll create a single page sized for 4" x 6" (in points).
// 1 inch = 72 points, so 4 inches wide = 288 points; 6 inches tall = 432 points.
async function createBarcodePDF(drumId: string, barcodeBuffer: Buffer) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([inchesToPoints(4), inchesToPoints(6)]);

  // Embed the barcode PNG in the PDF
  const barcodeImage = await pdfDoc.embedPng(barcodeBuffer);
  const { width, height } = barcodeImage.scale(1);

  // Position the barcode on the page
  // x is positive to the right, y is positive down
  page.drawImage(barcodeImage, {
    x: 20,
    y: 100,
    width,
    height,
  });

  // Add text label
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  page.drawText(`Drum ID: ${drumId}`, {
    x: 20,
    y: 180,
    size: 14,
    font,
  });

  return pdfDoc.save();
}

export async function GET(request: Request) {
  try {
    // Extract drumId from URL params
    const { searchParams } = new URL(request.url);
    const drumId = searchParams.get("drumId");

    if (!drumId) {
      return NextResponse.json(
        { error: "drumId parameter is required" },
        { status: 400 }
      );
    }

    // Generate barcode and create PDF
    const barcodeBuffer = await generateBarcodeBuffer(drumId);
    const pdfBytes = await createBarcodePDF(drumId, barcodeBuffer);

    console.log("PDF created successfully");

    // Return PDF with appropriate headers
    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="drum-${drumId}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Error generating barcode PDF:", error);
    return NextResponse.json(
      { error: "Failed to generate barcode PDF" },
      { status: 500 }
    );
  }
}
