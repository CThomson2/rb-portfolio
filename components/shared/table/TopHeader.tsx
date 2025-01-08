import SearchBar from "./SearchBar";
import { FilterOption } from "@/types/components/products";

interface TopHeaderProps<TData> {
  title?: string;
  filterOptions: FilterOption[];
  actionButton?: React.ReactNode;
  selectedFilter: string;
  onFilterChange: (value: string) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const TopHeader = <TData, _>({
  title,
  actionButton,
  filterOptions,
  selectedFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
}: TopHeaderProps<TData>) => {
  return (
    <div className="flex items-center justify-between px-8 py-8 bg-slate-700 rounded-md">
      <div className="space-y-4">
        {title && <h2 className="text-2xl font-bold">{title}</h2>}
        <SearchBar
          filterOptions={filterOptions}
          selectedFilter={selectedFilter}
          onFilterChange={onFilterChange}
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
        />
      </div>
      {actionButton}
    </div>
  );
};

export default TopHeader;
