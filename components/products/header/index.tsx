import { Button } from "@/components/ui/button";
import SearchBar from "./SearchBar";
import { PlusIcon } from "lucide-react";

const TopHeader = () => {
  return (
    <div className="max-h-fit flex flex-row justify-between items-center px-8 py-8 bg-gray-800 rounded-md">
      <SearchBar />

      <Button className="bg-emerald-600 text-white hover:bg-emerald-400 hover:text-emerald-700">
        <PlusIcon className="w-4 h-8 mr-1" />
        New Product
      </Button>
    </div>
  );
};

export default TopHeader;
