import { NextResponse } from "next/server";
import { queries } from "@/database/repositories/drums/queries";
import { DrumStatus, DrumStatusType } from "@/types/constant/drums";
import { NewDrum } from "@/types/database/drums";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") ?? "1");
    const limit = parseInt(searchParams.get("limit") ?? "50");
    const sortField = (searchParams.get("sortField") ??
      "drum_id") as keyof NewDrum;
    const sortOrder = (searchParams.get("sortOrder") ?? "desc") as
      | "desc"
      | "asc";

    // Split the status string into an array
    const statusParam = searchParams.get("status");
    const status = statusParam
      ? (statusParam.split(",") as DrumStatusType[])
      : [DrumStatus.AVAILABLE];

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
