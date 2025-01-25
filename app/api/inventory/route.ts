import { NextResponse } from "next/server";
import { queries } from "@/database/repositories/drums/queries";
import { DrumStatus, DrumStatusType } from "@/types/constant/drums";
import { NewDrum } from "@/types/database/drums";

/**
 * GET handler for fetching drums inventory data
 *
 * Accepts query parameters:
 * @param page - Page number for pagination (default: 1)
 * @param limit - Number of items per page (default: 50)
 * @param sortField - Field to sort by (default: drum_id)
 * @param sortOrder - Sort direction, 'asc' or 'desc' (default: desc)
 * @param status - Comma-separated list of drum statuses to filter by (default: AVAILABLE)
 *
 * @returns JSON response containing:
 * - rows: Array of drum records
 * - count: Total number of matching records
 * - error: Error message if request fails
 */
export async function GET(req: Request) {
  try {
    // Parse query parameters from URL
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") ?? "1");
    const limit = parseInt(searchParams.get("limit") ?? "50");
    const sortField = (searchParams.get("sortField") ??
      "drum_id") as keyof NewDrum;
    const sortOrder = (searchParams.get("sortOrder") ?? "desc") as
      | "desc"
      | "asc";

    // Parse status filter parameter
    const statusParam = searchParams.get("status");
    const status = statusParam
      ? (statusParam.split(",") as DrumStatusType[])
      : Object.values(DrumStatus);

    // Fetch drums data using repository query
    const drumsData = await queries.getDrums({
      page,
      limit,
      sortField,
      sortOrder,
      status,
    });

    return NextResponse.json(drumsData);
  } catch (error) {
    console.error("Error fetching drums:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
