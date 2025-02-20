"use client";

import React from "react";

import { DashboardProvider } from "@/components/dashboard/context/DashboardContext";
import { ViewToggle } from "@/components/dashboard/layout/ViewToggle";
import { InventoryWidget } from "@/components/dashboard/widgets/InventoryWidget";
import { MaterialGroupsWidget } from "@/components/dashboard/widgets/MaterialGroupsWidget";
import { ProductionWidget } from "@/components/dashboard/widgets/ProductionWidget";
import { RecentOrdersWidget } from "@/components/dashboard/widgets/RecentOrdersWidget";
import { StatsWidget } from "@/components/dashboard/widgets/StatsWidget";
import { useDashboard } from "@/components/dashboard/context/DashboardContext";

// Define widget configurations with layout classes
const widgets = [
  {
    id: "stats",
    component: <StatsWidget id="stats" />,
    className: "col-span-full",
  },
  { id: "inventory", component: <InventoryWidget id="inventory" /> },
  {
    id: "material-groups",
    component: <MaterialGroupsWidget id="material-groups" />,
    className: "col-span-full lg:col-span-2",
  },
  { id: "recent-orders", component: <RecentOrdersWidget id="recent-orders" /> },
  { id: "production", component: <ProductionWidget id="production" /> },
];

function DashboardContent() {
  const { view, favorites } = useDashboard();

  // Filter widgets based on the current view
  const visibleWidgets =
    view === "all"
      ? widgets
      : widgets.filter((widget) => favorites.includes(widget.id));

  return (
    // <main className="min-h-screen bg-background">
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <ViewToggle />
      </div>

      {view === "favorites" && visibleWidgets.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            No favorite widgets added yet. Customise your dashboard by clicking
            the star icon in the "All Widgets" view.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleWidgets.map(({ id, component, className }) => (
            <div key={id} className={className || ""}>
              {/* React.cloneElement allows us to clone a React element and pass additional props to it */}
              {React.cloneElement(component as React.ReactElement, { id })}
            </div>
          ))}
        </div>
      )}
    </div>
    // </main>
  );
}

export default function Home() {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  );
}
