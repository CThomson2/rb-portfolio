"use client";

import { useState } from "react";
import { columns } from "./columns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import SearchBar from "@/components/shared/table/header/SearchBar";
import TopHeader from "@/components/shared/table/header/TopHeader";
// import ActionButton from "@/components/shared/table";

export function TransactionsTable() {
  const [selectedTxType, setSelectedTxType] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-4">
      <TopHeader title="Transactions" />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col.id}>{col.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.id}>{col.accessor}</TableCell>
              ))}
            </TableRow>
          </TableBody>
          <TableFooter />
        </Table>
      </div>
    </div>
  );
}
