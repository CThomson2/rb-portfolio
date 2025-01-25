// lib/constants/table.ts
// First, let's define a constant for the grid layout
export const TABLE_GRID_LAYOUT =
  "grid grid-cols-[40px_80px_minmax(200px,1fr)_120px_100px_120px_100px_100px] grid-rows-[40px] auto-cols-fr";

/*
grid grid-cols-[
  40px    // Checkbox column
  80px    // ID column
  minmax(200px, 1fr)  // Product name - flexible
  120px   // CAS number
  100px   // Grade
  120px   // Lot number
  100px   // Actions
  100px   // Stock level
]
*/
