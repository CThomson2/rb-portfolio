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
        │   ├── route.ts       # Possibly returns all or “active” orders
        │   └── active/route.ts
        ├── deliveries/
        │   └── recent/route.ts
        └── ...
*/

import React, { useState } from "react";
import ActiveOrders from "./ActiveOrders";
import RecentDeliveries from "./RecentDeliveries";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle sidebar open/closed
  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {/* Button to toggle the sidebar; you might place this in the top navbar instead */}
      <button
        onClick={toggleSidebar}
        className="p-2 bg-blue-500 text-white fixed top-2 left-2 z-50 rounded-md"
      >
        {isOpen ? "Close Sidebar" : "Open Sidebar"}
      </button>

      {/* The sidebar itself */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-40
          bg-gray-800 text-white
          transition-all duration-300
          ${isOpen ? "w-[2/5]" : "w-0"}
          overflow-hidden
        `}
        style={
          { "--sidebar-width": isOpen ? "16rem" : "0" } as React.CSSProperties
        }
      >
        {isOpen && (
          <div className="flex flex-col h-full p-4 gap-6">
            {/* 1) Active Orders Section */}
            <ActiveOrders />

            {/* 2) Recent Deliveries Section */}
            <RecentDeliveries />

            {/* ... Add more sections as needed */}
          </div>
        )}
      </aside>
    </>
  );
};
