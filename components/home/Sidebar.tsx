// Sidebar.tsx
"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

/**
 * If you anticipate passing props in the future (e.g., menu items),
 * define them here. Currently empty.
 */
interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the sidebar open/closed
  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  // Close the sidebar
  const closeSidebar = () => {
    setIsOpen(false);
  };

  /**
   * Prevent the main page from scrolling when the sidebar is open.
   * We'll toggle a class on the <body> element.
   */
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Cleanup if this component is ever unmounted
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  return (
    <>
      {/* 
        Overlay: 
        - Visible only when sidebar is open.
        - Covers the full screen behind the sidebar.
        - Slightly darkens and blurs the background.
        - Clicking it closes the sidebar.
      */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-40"
          onClick={closeSidebar}
        />
      )}

      {/* 
        Sidebar:
        - Fixed to the left, full screen height.
        - Toggle width based on isOpen state.
        - Stacking context: put this above the overlay using z-50.
      */}
      <div
        className={`
          fixed top-0 left-0 h-screen bg-gray-800 text-white
          transition-all duration-300 ease-in-out
          z-50
          flex flex-col
          ${isOpen ? "w-[20vw]" : "w-6"}
        `}
      >
        {/* Handle / Toggle Button */}
        <div
          className="
            absolute top-1/2 right-0 transform -translate-y-1/2
            w-6 h-6 bg-gray-300 text-black 
            flex items-center justify-center 
            cursor-pointer rounded-full
            shadow-md
          "
          onClick={(e) => {
            // Prevent click from propagating to the overlay
            e.stopPropagation();
            toggleSidebar();
          }}
        >
          {isOpen ? (
            /* Arrow pointing left (close) */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          ) : (
            /* Arrow pointing right (open) */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          )}
        </div>

        {/* Sidebar Content (currently empty) */}
        {isOpen && (
          <div
            className="p-4"
            onClick={(e) => {
              // Prevent clicks inside sidebar from closing it
              e.stopPropagation();
            }}
          >
            {/* Add your menu, links, etc. here */}
            <h2 className="text-xl font-semibold">Sidebar</h2>
            <p className="mt-4">Your content goes here.</p>
            <Link href="/inventory">Inventory</Link>
            <Link href="/inventory/transactions">Transactions</Link>
            <Link href="/inventory/transactions">Transactions</Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
