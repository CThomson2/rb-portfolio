import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PATCH") {
    const { id } = req.query;
    // Handle updating a transaction by ID
    // Example: const { newName } = req.body;
    // Add logic to update the transaction in the database
    res.status(200).json({ message: `Transaction ${id} updated successfully` });
  } else {
    res.setHeader("Allow", ["PATCH"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
