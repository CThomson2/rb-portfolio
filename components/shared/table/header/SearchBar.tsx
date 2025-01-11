// Import UI components from Shadcn UI library
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";

// Import utility functions and types
import { cn } from "@/lib/utils";
import { ChevronDown, FilterIcon, SearchIcon } from "lucide-react";
import { FilterOption } from "@/types/database/products";
import { useEffect } from "react";

// Props interface for the SearchBar component
interface SearchBarProps {
  filterOptions: FilterOption[]; // Array of filter options to display in dropdown
  selectedFilter: string; // Currently selected filter value
  onFilterChange: (value: string) => void; // Handler for filter selection changes
  searchQuery: string; // Current search input value
  onSearchChange: (value: string) => void; // Handler for search input changes
  placeholder?: string; // Optional placeholder text for search input
}

/**
 * SearchBar Component
 *
 * A reusable search bar component that combines a filter dropdown menu with a search input.
 * The filter dropdown allows users to select different criteria to filter by,
 * while the search input enables text-based searching.
 *
 * @param filterOptions - Array of available filter options
 * @param selectedFilter - Currently active filter
 * @param onFilterChange - Callback when filter selection changes
 * @param searchQuery - Current search text
 * @param onSearchChange - Callback when search text changes
 * @param placeholder - Optional placeholder text for search input
 */
const SearchBar = ({
  filterOptions,
  selectedFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  placeholder = "Search...",
}: SearchBarProps) => {
  return (
    // Main container with rounded corners and shadow
    <div className="flex flex-row items-center h-10 rounded-lg shadow-sm">
      {/* Filter Dropdown Section */}
      <DropdownMenu>
        {/* Dropdown Trigger Button */}
        <DropdownMenuTrigger className="flex flex-row items-center h-full px-5 rounded-l-lg border gap-2 text-sm bg-gray-900 text-gray-300 hover:bg-gray-800 hover:border-gray-300">
          <FilterIcon className="w-4 h-4" fill="currentColor" />
          {/* Display selected filter label or default to "All" */}
          {filterOptions.find((opt) => opt.value === selectedFilter)?.label ||
            "All"}
          <ChevronDown className="w-4 h-4" />
        </DropdownMenuTrigger>

        {/* Dropdown Content */}
        <DropdownMenuContent>
          <DropdownMenuLabel>Filter By</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {/* Map through and render filter options */}
          {filterOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => onFilterChange(option.value)}
              // Highlight selected filter option
              className={cn(
                selectedFilter === option.value && "bg-gray-100 text-gray-900"
              )}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Search Input Section */}
      <div className="flex flex-row items-center rounded-r-lg border h-full relative bg-gray-900 hover:border-gray-300 hover:bg-gray-300">
        {/* Search Icon */}
        <SearchIcon className="w-4 h-4 ml-2 absolute text-gray-400" />
        {/* Search Input Field */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          className="h-full py-0 px-3 border-none text-sm w-72 rounded-r-lg pl-8 bg-gray-900 text-gray-300 hover:bg-gray-800 hover:border-gray-300 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default SearchBar;
