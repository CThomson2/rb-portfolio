import React from "react";

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
    <li className="bg-gray-700 p-3 rounded flex items-center justify-between">
      <div className="flex items-center">
        <div className="text-lg text-gray-400 mr-4">#{id}</div>
        <div className="grid grid-cols-[3fr_1fr] gap-4">
          <div>
            <div className="font-bold">{material}</div>
            <div>{supplier}</div>
          </div>
          {isOrder && (
            <div className="flex items-center justify-center w-12 h-12 bg-gray-600 rounded-full">
              <div className="text-white">
                {quantityReceived}/{quantity}
              </div>
            </div>
          )}
        </div>
      </div>
      <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded">
        View
      </button>
    </li>
  );
};

export default SidebarListItem;
