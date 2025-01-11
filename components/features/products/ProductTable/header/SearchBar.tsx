import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { ChevronDown, FilterIcon, SearchIcon } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="flex flex-row items-center h-9 rounded-lg shadow-sm mb-4">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex flex-row items-center h-full px-5 rounded-l-lg border gap-2 text-sm bg-gray-900 text-gray-300 hover:bg-gray-800 hover:border-gray-300">
          <FilterIcon className="w-4 h-4" fill="currentColor" />
          All
          <ChevronDown className="w-4 h-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Filter By</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>All Products</DropdownMenuItem>
          <DropdownMenuItem>By Name</DropdownMenuItem>
          <DropdownMenuItem>By Category</DropdownMenuItem>
          <DropdownMenuItem>By CAS Number</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex flex-row items-center rounded-r-lg border h-full relative bg-gray-900 hover:border-gray-300 hover:bg-gray-300">
        <SearchIcon className="w-4 h-4 ml-2 absolute text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          className="h-full py-0 px-3 border-none text-sm w-72 rounded-r-lg pl-8 bg-gray-900 text-gray-300 hover:bg-gray-800 hover:border-gray-300 focus:outline-none"
        />
      </div>
    </div>
  );
};
// End of Selection

export default SearchBar;
