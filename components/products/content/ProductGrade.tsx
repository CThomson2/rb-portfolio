export const enum GRADE {
  GD = "GD",
  HPLC = "HPLC",
  LCMS = "LCMS",
  PTS = "PTS-DS",
}

const gradeBackgroundColors = {
  [GRADE.GD]: "bg-red-100",
  [GRADE.HPLC]: "bg-yellow-100",
  [GRADE.LCMS]: "bg-green-100",
  [GRADE.PTS]: "bg-blue-100",
};

const gradeTextColors = {
  [GRADE.GD]: "text-red-600",
  [GRADE.HPLC]: "text-yellow-600",
  [GRADE.LCMS]: "text-green-600",
  [GRADE.PTS]: "text-blue-600",
};

const gradeDotBackgroundColors = {
  [GRADE.GD]: "bg-red-600",
  [GRADE.HPLC]: "bg-yellow-600",
  [GRADE.LCMS]: "bg-green-600",
  [GRADE.PTS]: "bg-blue-600",
};

const gradeLabels = {
  [GRADE.GD]: "Low Purity",
  [GRADE.HPLC]: "Medium Purity",
  [GRADE.LCMS]: "High Purity",
  [GRADE.PTS]: "PTS-DS",
};

const ProductGrade = ({
  grade,
}: {
  grade: GRADE.GD | GRADE.HPLC | GRADE.LCMS | GRADE.PTS;
}) => {
  return (
    <div
      className={`flex items-center justify-center w-fit h-6 px-3 gap-2 rounded-sm text-sm font-normal ${gradeBackgroundColors[grade]} ${gradeTextColors[grade]}`}
    >
      <div
        className={`w-2 h-2 rounded-[2px] ${gradeDotBackgroundColors[grade]}`}
      />
      {gradeLabels[grade]}
    </div>
  );
};

export default ProductGrade;
