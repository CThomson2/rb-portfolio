import { NextResponse } from "next/server";
import { prisma } from "@/database/client";
import PDFDocument from "pdfkit";

export async function POST() {
  try {
    // Fetch data for the report
    const [recentTransactions, inventoryItems] = await Promise.all([
      prisma.transactions.findMany({
        take: 10,
        orderBy: { tx_date: "desc" },
      }),
      prisma.new_drums.count(),
    ]);

    // Create PDF document
    const doc = new PDFDocument();
    const chunks: Uint8Array[] = [];

    // Collect PDF chunks
    doc.on("data", (chunk: Uint8Array) => chunks.push(chunk));

    // Write report content
    doc.fontSize(20).text("Dashboard Report", { align: "center" }).moveDown();

    // Add date
    doc
      .fontSize(12)
      .text(`Generated on: ${new Date().toLocaleDateString()}`, {
        align: "right",
      })
      .moveDown();

    // Add inventory summary
    doc
      .fontSize(16)
      .text("Inventory Summary")
      .moveDown()
      .fontSize(12)
      .text(`Total Items: ${inventoryItems}`)
      .moveDown();

    // Add recent transactions
    doc.fontSize(16).text("Recent Transactions").moveDown();

    recentTransactions.forEach((tx: any) => {
      doc
        .fontSize(12)
        .text(`ID: ${tx.tx_id}`)
        .text(`Material: ${tx.material}`)
        .text(`Type: ${tx.tx_type}`)
        .text(`Date: ${new Date(tx.tx_date).toLocaleDateString()}`)
        .moveDown();
    });

    // Removed active processes logic as the SQL table for processes is not yet designed
    // doc.fontSize(16).text("Active Processes").moveDown();
    // activeProcesses.forEach((process: any) => {
    //   doc
    //     .fontSize(12)
    //     .text(`ID: ${process.process_id}`)
    //     .text(`Material: ${process.material}`)
    //     .text(`Still: ${process.still_code}`)
    //     .moveDown();
    // });

    // Finalize PDF
    doc.end();

    // Combine chunks into a single buffer
    const pdfBuffer = Buffer.concat(chunks);

    // Return PDF as response
    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=dashboard-report-${
          new Date().toISOString().split("T")[0]
        }.pdf`,
      },
    });
  } catch (error) {
    console.error("Error generating report:", error);
    return NextResponse.json(
      { error: "Failed to generate report" },
      { status: 500 }
    );
  }
}
