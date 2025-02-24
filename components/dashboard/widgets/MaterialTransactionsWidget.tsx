import { useState } from "react";
import { Input } from "@/components/ui/input";
import { BaseWidget } from "./BaseWidget";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

interface MaterialTransaction {
  tx_id: number;
  material: string;
  tx_type: string;
  tx_date: string;
  direction: string | null;
  tx_notes: string | null;
}

async function fetchMaterialTransactions(
  material: string
): Promise<MaterialTransaction[]> {
  const response = await fetch(
    `/api/transactions?material=${encodeURIComponent(material)}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch transactions");
  }
  return response.json();
}

export function MaterialTransactionsWidget({ id }: { id: string }) {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, error } = useQuery({
    queryKey: ["materialTransactions", searchTerm],
    queryFn: () => fetchMaterialTransactions(searchTerm),
    enabled: searchTerm.length > 2, // Only fetch when search term is longer than 2 chars
  });

  return (
    <BaseWidget id={id} title="Material Transactions">
      <div className="space-y-4">
        <Input
          type="text"
          placeholder="Search by material name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />

        {isLoading ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-4 text-destructive">
            Error loading transactions
          </div>
        ) : data?.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">
            No transactions found
          </div>
        ) : (
          <div className="relative overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Material</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Direction</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.map((transaction) => (
                  <TableRow key={transaction.tx_id}>
                    <TableCell>{transaction.tx_id}</TableCell>
                    <TableCell>{transaction.material}</TableCell>
                    <TableCell>{transaction.tx_type}</TableCell>
                    <TableCell>
                      {new Date(transaction.tx_date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{transaction.direction}</TableCell>
                    <TableCell>{transaction.tx_notes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </BaseWidget>
  );
}
