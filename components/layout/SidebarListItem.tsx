import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface SidebarListItemProps {
  id: number;
  material?: string;
  supplier?: string;
  quantity?: number;
  quantityReceived?: number;
  isOrder: boolean;
}

const SidebarListItem: React.FC<SidebarListItemProps> = ({
  id,
  material,
  supplier,
  quantity,
  quantityReceived,
  isOrder,
}) => {
  return (
    <Link
      href={isOrder ? `/inventory/orders/${id}` : `/inventory/deliveries/${id}`}
      className="block"
    >
      <div className="group relative flex items-center space-x-4 rounded-lg border border-gray-700 bg-gray-800/50 p-4 hover:bg-gray-800 transition-colors">
        {/* ID Badge */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-700 text-gray-400 group-hover:bg-gray-600 group-hover:text-gray-300">
          #{id}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="truncate font-medium text-gray-200">
            {material || "Unknown Material"}
          </div>
          <div className="truncate text-sm text-gray-400">
            {supplier || "Unknown Supplier"}
          </div>
        </div>

        {/* Quantity Badge (for orders) */}
        {isOrder && quantity && (
          <div className="flex h-8 items-center rounded-full bg-gray-700 px-3 text-sm text-gray-300">
            {quantityReceived || 0}/{quantity}
          </div>
        )}

        {/* Arrow Icon */}
        <ArrowRight className="h-5 w-5 text-gray-500 group-hover:text-gray-400" />
      </div>
    </Link>
  );
};

export default SidebarListItem;
