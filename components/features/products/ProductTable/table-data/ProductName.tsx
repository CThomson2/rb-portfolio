import { ExternalLink } from "lucide-react";

const ProductName = ({ name }: { name: string }) => {
  return (
    <div className="flex items-center gap-3 max-w-full group">
      <span className="truncate font-medium text-base text-primary hover:border-b hover:border-primary border-b border-transparent">
        {name}
      </span>
      <ExternalLink className="flex-shrink-0 w-4 h-4 text-gray-500 invisible group-hover:visible" />
    </div>
  );
};

export default ProductName;
