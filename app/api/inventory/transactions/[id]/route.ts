import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id } = req.query;
    // Handle fetching a transaction by ID
    // Add logic to fetch the transaction from the database
    res.status(200).json({ message: `Transaction ${id} fetched successfully` });
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
