import React from "react";
import Link from "next/link";
import { DrumsTable } from "@/components/features/inventory/RawMaterials";

const InventoryPage = () => {
  return (
    <div className="w-full max-w-xl mx-auto flex flex-col justify-center gap-4 h-screen font-semibold text-center uppercase italic">
      <Link href="/inventory/transactions">Transactions</Link>
      <DrumsTable />
    </div>
  );
};

export default InventoryPage;
