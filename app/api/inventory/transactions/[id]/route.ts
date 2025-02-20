import { NextResponse } from "next/server";
import { prisma } from "@/database/client";
import type {
  Transaction,
  TransactionIntake,
  TransactionProcessed,
} from "@/types/database/inventory/transactions";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    console.log("Fetching transaction details for ID:", id);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid transaction ID format" },
        { status: 400 }
      );
    }

    // Get transaction with related drum info
    const transaction = await prisma.$queryRaw`
      WITH DrumInfo AS (
        SELECT 
          drum_id,
          status,
          material
        FROM inventory.new_drums
        WHERE drum_id = (
          SELECT drum_id 
          FROM inventory.transactions 
          WHERE tx_id = ${id}
        )
      )
      SELECT 
        t.*,
        d.status as drum_status,
        d.material
      FROM inventory.transactions t
      LEFT JOIN DrumInfo d ON t.drum_id = d.drum_id
      WHERE t.tx_id = ${id}
    `;

    if (!transaction || !(transaction as any[])[0]) {
      console.log(`No transaction found with ID ${id}`);
      return NextResponse.json(
        { error: `Transaction with ID ${id} not found` },
        { status: 404 }
      );
    }

    const tx = (transaction as any[])[0] as Transaction;
    console.log("Found transaction:", tx);

    return NextResponse.json({
      message: `Transaction (ID: ${id}) fetched successfully`,
      transaction: tx,
    });
  } catch (error) {
    console.error("Error fetching transaction:", error);
    return NextResponse.json(
      { error: "Failed to fetch transaction" },
      { status: 500 }
    );
  }
}
