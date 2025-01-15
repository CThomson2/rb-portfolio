import { Grade, GradeType } from "@/types/constant/products";

const gradeBackgroundColors = {
  [Grade.GD]: "bg-red-100",
  [Grade.HPLC]: "bg-yellow-100",
  [Grade.LCMS]: "bg-green-100",
  [Grade.PTS_DS]: "bg-blue-100",
};

const gradeTextColors = {
  [Grade.GD]: "text-red-600",
  [Grade.HPLC]: "text-yellow-600",
  [Grade.LCMS]: "text-green-600",
  [Grade.PTS_DS]: "text-blue-600",
};

const gradeDotBackgroundColors = {
  [Grade.GD]: "bg-red-600",
  [Grade.HPLC]: "bg-yellow-600",
  [Grade.LCMS]: "bg-green-600",
  [Grade.PTS_DS]: "bg-blue-600",
};

const gradeLabels = {
  [Grade.GD]: "GD",
  [Grade.HPLC]: "HPLC",
  [Grade.LCMS]: "LCMS",
  [Grade.PTS_DS]: "PTS-DS",
};

const ProductGrade = ({ grade }: { grade: GradeType }) => {
  return (
    <div
      className={`flex items-center justify-center h-6 px-3 mx-auto gap-2 rounded-sm text-sm font-normal ${gradeBackgroundColors[grade]} ${gradeTextColors[grade]}`}
    >
      <div
        className={`w-2 h-2 rounded-[2px] ${gradeDotBackgroundColors[grade]}`}
      />
      {gradeLabels[grade]}
    </div>
  );
};

export default ProductGrade;
