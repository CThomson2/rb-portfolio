"use client";
/*
app/
├── layout.tsx                 # Global layout for your entire app
├── page.tsx                   # Your main landing page or some default page
├── (other top-level routes)...
│
├── (components)               # Could store your global components, or in a separate folder
│   └── sidebar/
│       ├── Sidebar.tsx        # The main toggleable sidebar
│       ├── ActiveOrders.tsx   # Renders active/pending orders
│       └── RecentDeliveries.tsx
│
└── (api)
    └── inventory/
        ├── orders/
        │   ├── route.ts       # Possibly returns all or "active" orders
        │   └── active/route.ts
        ├── deliveries/
        │   └── recent/route.ts
        └── ...
*/

import React, { useEffect, useState } from "react";
import { X, Construction } from "lucide-react";
import ActiveOrders from "./ActiveOrders";

// Reusable component for sections under development
function InDevelopment() {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-gray-700/50 bg-gray-800/30 p-4">
      <Construction className="h-5 w-5 text-gray-500" />
      <p className="text-sm text-gray-400">In Development</p>
    </div>
  );
}

// Reusable section header component
function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-3">
      <h2 className="text-lg font-semibold text-gray-200">{title}</h2>
      {subtitle && (
        <p className="text-sm font-medium text-gray-400 mt-0.5">{subtitle}</p>
      )}
    </div>
  );
}

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Handle toggle click from the header button
    const toggleButton = document.querySelector("[data-toggle-sidebar]");
    if (!toggleButton) return;

    const handleToggle = () => setIsOpen((prev) => !prev);
    toggleButton.addEventListener("click", handleToggle);
    return () => toggleButton.removeEventListener("click", handleToggle);
  }, []);

  // Close sidebar when clicking overlay
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Semi-transparent overlay */}
      <div
        className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm transition-opacity"
        onClick={handleOverlayClick}
      />

      {/* Sidebar panel */}
      <div className="fixed inset-y-0 right-0 w-full max-w-xs">
        <div className="flex h-full flex-col overflow-y-auto bg-gray-800 border-l border-gray-700 shadow-xl">
          {/* Sidebar header */}
          <div className="flex h-14 items-center justify-between px-4 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-gray-100">
              Control Panel
            </h2>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-gray-400 hover:text-gray-300"
              onClick={() => setIsOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Sidebar content */}
          <div className="flex-1 overflow-y-auto">
            <div className="space-y-8 p-4">
              {/* Active Orders Section */}
              <section>
                <SectionHeader title="Active Orders" />
                <ActiveOrders />
              </section>

              {/* Production Sheet Section */}
              <section>
                <SectionHeader
                  title="Production Sheet"
                  subtitle="At a Glance"
                />
                <InDevelopment />
              </section>

              {/* Inventory Control Section */}
              <section>
                <SectionHeader title="Inventory Control" />
                <InDevelopment />
              </section>

              {/* Product Range Section */}
              <section>
                <SectionHeader title="Product Range" />
                <InDevelopment />
              </section>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-700 p-4">
            <div className="text-md text-right text-gray-100">
              Rathburn Chemicals Ltd.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
