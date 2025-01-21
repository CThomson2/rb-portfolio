import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  // Handle updating a transaction by ID
  // Example: const data = await request.json();
  // Add logic to update the transaction in the database
  return NextResponse.json(
    { message: `Transaction ${id} updated successfully` },
    { status: 200 }
  );
}
