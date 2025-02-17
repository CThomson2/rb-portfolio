import { NextResponse } from "next/server";
import { prisma } from "@/database/client";
import type {
  Transaction,
  TransactionImport,
  TransactionProcessing,
} from "@/types/database/inventory/transactions";

export async function GET(
  req: Request,
  { params }: { params: { drumId: string } }
) {
  try {
    const drumId = parseInt(params.drumId);

    if (isNaN(drumId)) {
      return NextResponse.json(
        { error: "Invalid drum ID format" },
        { status: 400 }
      );
    }

    // Get all transactions for this drum, ordered by date
    // Include the drum's current status from new_drums table
    const transactions = await prisma.$queryRaw`
      WITH DrumInfo AS (
        SELECT 
          drum_id,
          status,
          material
        FROM inventory.new_drums
        WHERE drum_id = ${drumId}
      )
      SELECT 
        t.*,
        d.status as drum_status,
        d.material
      FROM inventory.transactions t
      LEFT JOIN DrumInfo d ON t.drum_id = d.drum_id
      WHERE t.drum_id = ${drumId}
        AND t.tx_type IN ('import', 'processing')
      ORDER BY t.tx_date ASC, t.tx_id ASC
    `;

    if (!transactions || (transactions as any[]).length === 0) {
      return NextResponse.json(
        { error: `No transactions found for drum ID ${drumId}` },
        { status: 404 }
      );
    }

    // Type the transactions based on their tx_type
    const newDrumTransactions = (transactions as Transaction[])
      .map((tx) => {
        if (tx.tx_type === "import") return tx as TransactionImport;
        if (tx.tx_type === "processing") return tx as TransactionProcessing;
        return tx;
      })
      .filter(
        (tx): tx is TransactionImport | TransactionProcessing =>
          tx.tx_type === "import" || tx.tx_type === "processing"
      );

    return NextResponse.json({
      message: `Transactions for drum ID ${drumId} fetched successfully`,
      transactions: newDrumTransactions,
    });
  } catch (error) {
    console.error("Error fetching drum transactions:", error);
    return NextResponse.json(
      { error: "Failed to fetch drum transactions" },
      { status: 500 }
    );
  }
}
