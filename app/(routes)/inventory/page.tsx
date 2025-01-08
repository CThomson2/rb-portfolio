import React from "react";
import Link from "next/link";

const InventoryPage = () => {
  return (
    <div className="w-full max-w-xl mx-auto flex flex-col justify-center gap-4 h-screen font-semibold text-center uppercase italic">
      <Link href="/inventory/transactions">Transactions</Link>
    </div>
  );
};

export default InventoryPage;
