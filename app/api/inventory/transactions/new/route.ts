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
    const transactionData = await req.json(); // e.g., { tx_type: 'intake', delivery_id: 123, ... }

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

// Implement websockets
// It ensures immediate updates to the UI,
// After a transaction is created, the UI should be updated with the new transaction
// This is done by sending a message to the client
// The client then updates the UI using the new transaction data

// The websocket connection is established when the user navigates to the transactions page
// The websocket connection is closed when the user navigates away from the transactions page
// The websocket connection is reestablished when the user navigates back to the transactions page

// When a barcode is scanned, the websocket sends a message to the server
// The server then creates a new transaction record in the database
// The websocket then sends a message to the client to update the UI with the new transaction data

// The server notifies the client of the new transaction data
// How does the client know which transaction data to update?
// The client has a list of all transactions in the database
// The client then updates the UI with the new transaction data
