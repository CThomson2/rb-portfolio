import { NextResponse } from "next/server";
import { queries } from "@/database/repositories/transactions";

// export async function POST(req: Request) {
//   if (req.method === "POST") {
//     const transactionData = await req.json();
//     // Handle creating a new transaction
//     // Example: const { name, sku } = req.body;
//     // Add logic to create a new transaction in the database
//     return NextResponse.json({ message: "Transaction created successfully" });
//   } else {
//     return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
//   }
// }

export async function POST(req: Request) {
  try {
    // 1) Extract body
    const transactionData = await req.json(); // e.g., { tx_type: 'import', delivery_id: 123, ... }

    // 2) Create a new record
    const newTx = await queries.createTransaction(transactionData);

    // 3) Send JSON response
    return NextResponse.json(
      {
        message: "Transaction created successfully",
        data: newTx,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating transaction:", error);
    return NextResponse.json(
      {
        error:
          error.message || "An error occurred while creating the transaction",
      },
      { status: 400 }
    );
  }
}
