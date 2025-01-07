import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ChevronDown, FilterIcon, SearchIcon } from "lucide-react";

interface FilterOption {
  label: string;
  value: string;
}

interface SearchBarProps {
  filterOptions: FilterOption[];
  selectedFilter: string;
  onFilterChange: (value: string) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar = ({
  filterOptions,
  selectedFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  placeholder = "Search...",
}: SearchBarProps) => {
  return (
    <div className="flex flex-row items-center h-9 rounded-lg shadow-sm mb-4">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex flex-row items-center h-full px-5 rounded-l-lg border gap-2 text-sm bg-gray-900 text-gray-300 hover:bg-gray-800 hover:border-gray-300">
          <FilterIcon className="w-4 h-4" fill="currentColor" />
          {filterOptions.find((opt) => opt.value === selectedFilter)?.label ||
            "All"}
          <ChevronDown className="w-4 h-4" />
        </DropdownMenuTrigger>
        {/* Dropdown Menu */}
        <DropdownMenuContent>
          <DropdownMenuLabel>Filter By</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {filterOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => onFilterChange(option.value)}
              className={cn(
                selectedFilter === option.value && "bg-gray-100 text-gray-900"
              )}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex flex-row items-center rounded-r-lg border h-full relative bg-gray-900 hover:border-gray-300 hover:bg-gray-300">
        <SearchIcon className="w-4 h-4 ml-2 absolute text-gray-400" />
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
