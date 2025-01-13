import { prisma } from "@/database/client";
import type { DrumQueryParams, DrumsResponse } from "@/types/database/drums";
import { DRUM_LOCATION, DRUM_STATUS } from "@/types/enums/drums";

export const queries = {
  getDrums: async ({
    page = 1,
    limit = 50,
    sortField = "drum_id",
    sortOrder = "asc",
    status,
  }: DrumQueryParams): Promise<DrumsResponse> => {
    const offset = (page - 1) * limit;

    // Get the total number of drums
    const total = await prisma.new_drums.count({
      where: {
        status: { in: status },
      },
    });
    // Get the paginated data
    const rows = await prisma.new_drums.findMany({
      where: {
        status: { in: status },
      },
      include: {
        orders: true,
      },
      orderBy: {
        [sortField]: sortOrder,
      },
      skip: offset,
      take: limit,
    });

    const drums = rows.map((row) => ({
      drum_id: row.drum_id,
      material: row.material,
      status: row.status as DRUM_STATUS,
      location: row.location as DRUM_LOCATION,
      order_id: row.orders?.order_id,
      supplier: row.orders?.supplier,
      date_ordered: row.orders?.date_ordered,
      date_processed: row.date_processed,
      created_at: row.created_at,
      updated_at: row.updated_at,
    }));

    return { drums, total };
  },
};
