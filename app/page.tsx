"use client";

import { DashboardLayout } from "@/components/dashboard/layout/DashboardLayout";
import { InventoryWidget } from "@/components/dashboard/widgets/InventoryWidget";
import { ProductionWidget } from "@/components/dashboard/widgets/ProductionWidget";
import { RecentOrdersWidget } from "@/components/dashboard/widgets/RecentOrdersWidget";
import { StatsWidget } from "@/components/dashboard/widgets/StatsWidget";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-4">
            {/* Add dashboard controls here later */}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatsWidget />
          <InventoryWidget />
          <ProductionWidget />
          <RecentOrdersWidget />
        </div>
      </div>
    </main>
  );
}
