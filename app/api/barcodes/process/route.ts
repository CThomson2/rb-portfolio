// import { NextRequest, NextResponse } from "next/server";
// // Zod is a TypeScript-first schema validation library that helps validate data at runtime
// // It allows you to define schemas for data validation and type inference
// // First install it with: npm install zod
// import { z } from "zod";
// import { prisma } from "@/database/client";

// // Define a schema for the barcode format using Zod
// // This schema validates:
// // - barcode: Must be a string matching pattern like "123-H456" or "123-H456 2024/01/22 08:31:59"
// //   - First capture group (\d+) matches the order ID numbers
// //   - Second capture group (-H\d+) matches "-H" followed by drum ID numbers
// //   - Optional datetime group matches " YYYY/MM/DD HH:MM:SS" format
// // - timestamp: Must be a string (typically ISO format from the scanner)
// const barcodeSchema = z.object({
//   barcode: z
//     .string()
//     .regex(/^(\d+)-H(\d+)(?:\s+\d{4}\/\d{2}\/\d{2}\s+\d{2}:\d{2}:\d{2})?$/),
//   timestamp: z.string(),
// });

// type BarcodeData = z.infer<typeof barcodeSchema>;

// export async function POST(req: NextRequest) {
//   try {
//     const data: BarcodeData = await req.json();

//     // Parse the barcode to extract order_id and drum_id
//     const match = data.barcode.match(/^(\d+)-H(\d+)/);
//     if (!match) {
//       return NextResponse.json(
//         { message: "Invalid barcode format" },
//         { status: 400 }
//       );
//     }

//     const [_, orderIdStr, drumIdStr] = match;
//     const orderId = parseInt(orderIdStr);
//     const drumId = parseInt(drumIdStr);

//     // TODO: In the DB, change the naming of the status value "available" to "in-stock" for all tables with a similar status column
//     // TODO: Add logic for a third barcode scan: from "scheduled" to "processed", which occurs right as the drum is loaded into the still. Then from "available" to "scheduled" when the drum is ready to be used, determined by data from the Production Schedule written each week.
//     // This way, the barcode scan can tell us when the drum was scanned out of inventory (available -> scheduled) and when, later that week, it was scanned a final time on the morning of its designated processing date (scheduled -> processed).

//     // Verify the drum exists and update the drum record
//     const existingDrum = await prisma.new_drums.findUnique({
//       where: { drum_id: drumId },
//     });

//     if (!existingDrum) {
//       return NextResponse.json(
//         { message: "Drum not found in database" },
//         { status: 404 }
//       );
//     }

//     // Handle different status transitions based on current drum status
//     if (existingDrum.status === "pending") {
//       // For pending drums: Update drum status and increment order quantity
//       const [updatedDrum, updatedOrder] = await prisma.$transaction([
//         // Update drum status to available
//         prisma.new_drums.update({
//           where: { drum_id: drumId },
//           data: {
//             status: "available",
//             location: "new-site",
//           },
//         }),
//         // Increment order's quantity_received
//         prisma.orders.update({
//           where: { order_id: orderId },
//           data: {
//             quantity_received: {
//               increment: 1,
//             },
//           },
//         }),
//       ]);

//       return NextResponse.json(
//         {
//           success: true,
//           data: {
//             drum_id: drumId,
//             new_status: updatedDrum.status,
//             order_id: orderId,
//             quantity_received: updatedOrder.quantity_received,
//           },
//         },
//         { status: 200 }
//       );
//     } else if (existingDrum.status === "available") {
//       // For available drums: Just update status to scheduled
//       const updatedDrum = await prisma.new_drums.update({
//         where: { drum_id: drumId },
//         data: {
//           status: "scheduled",
//         },
//       });

//       return NextResponse.json(
//         {
//           success: true,
//           data: {
//             drum_id: drumId,
//             new_status: updatedDrum.status,
//           },
//         },
//         { status: 200 }
//       );
//     } else {
//       // Handle unexpected status
//       return NextResponse.json(
//         {
//           message: `Invalid drum status for scanning: ${existingDrum.status}`,
//         },
//         { status: 400 }
//       );
//     }
//   } catch (error) {
//     console.error("Error processing barcode:", error);
//     return NextResponse.json(
//       { message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
