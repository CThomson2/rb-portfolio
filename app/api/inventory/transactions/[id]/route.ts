import { NextResponse } from "next/server";
import { queries } from "@/database/repositories/transactions/queries";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const transaction = await queries.getTransactionById(id);

    if (!transaction) {
      return NextResponse.json(
        { error: `Transaction with ID ${id} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: `Transaction (ID: ${id}) fetched successfully`,
        data: transaction,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching transaction:", error);
    return NextResponse.json(
      { error: "Failed to fetch transaction" },
      { status: 500 }
    );
  }
}
