import { NextResponse } from "next/server";
import { prisma } from "@/database/client";
import type {
  Transaction,
  TransactionImport,
  TransactionProcessing,
} from "@/types/database/inventory/transactions";

/**
 * Fetches transactions associated with a specific drum ID.
 *
 * This endpoint returns only 'import' and 'processing' type transactions for the given drum ID,
 * ordered chronologically by transaction date and ID. It also includes the drum's current status
 * and material information from the new_drums table.
 *
 * @param {Request} req - The incoming HTTP request object
 * @param {Object} params - The route parameters object
 * @param {string} params.drumId - The ID of the drum to fetch transactions for
 *
 * @returns {Promise<NextResponse>} A response containing:
 * - On success: JSON with transactions array and success message
 *   - transactions: Array of TransactionImport | TransactionProcessing objects
 *   - message: Success confirmation string
 * - On error: JSON with error message and appropriate status code
 *   - 400: Invalid drum ID format
 *   - 404: No transactions found
 *   - 500: Server error
 *
 * Note: This endpoint specifically filters for and returns only 'import' and 'processing'
 * type transactions. Other transaction types associated with the drum will not be included
 * in the response.
 */
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

    // Get all import and processing transactions for this drum, ordered by date
    // Include the drum's current status and material from new_drums table
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

    // Cast and filter transactions to only include import and processing types
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
