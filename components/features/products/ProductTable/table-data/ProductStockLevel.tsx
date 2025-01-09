import { STOCK_LEVEL } from "@/types/enums/products";

const stockLevelBackgroundColors = {
  [STOCK_LEVEL.LOW_STOCK]: "bg-red-100",
  [STOCK_LEVEL.IN_STOCK]: "bg-yellow-100",
  [STOCK_LEVEL.SURPLUS]: "bg-green-100",
};

const stockLevelTextColors = {
  [STOCK_LEVEL.LOW_STOCK]: "text-red-600",
  [STOCK_LEVEL.IN_STOCK]: "text-yellow-600",
  [STOCK_LEVEL.SURPLUS]: "text-green-600",
};

const stockLevelDotBackgroundColors = {
  [STOCK_LEVEL.LOW_STOCK]: "bg-red-600",
  [STOCK_LEVEL.IN_STOCK]: "bg-yellow-600",
  [STOCK_LEVEL.SURPLUS]: "bg-green-600",
};

const stockLevelLabels = {
  [STOCK_LEVEL.LOW_STOCK]: "Low Stock",
  [STOCK_LEVEL.IN_STOCK]: "In Stock",
  [STOCK_LEVEL.SURPLUS]: "Surplus",
};

const ProductStockLevel = ({
  stockLevel,
}: {
  stockLevel:
    | STOCK_LEVEL.LOW_STOCK
    | STOCK_LEVEL.IN_STOCK
    | STOCK_LEVEL.SURPLUS;
}) => {
  return (
    <div
      className={`flex items-center justify-center w-fit h-6 px-3 gap-2 rounded-sm text-sm font-normal ${stockLevelBackgroundColors[stockLevel]} ${stockLevelTextColors[stockLevel]}`}
    >
      <div
        className={`w-2 h-2 rounded-[2px] ${stockLevelDotBackgroundColors[stockLevel]}`}
      />
      {stockLevelLabels[stockLevel]}
    </div>
  );
};

export default ProductStockLevel;
