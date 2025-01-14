"use client";

export const FormDetails = () => {
  return (
    <div className="flex flex-col gap-6 bg-slate-800 rounded-lg p-6">
      {/* First section */}
      <div className="flex flex-col items-start">
        <h3 className="text-sm font-medium text-slate-200">GUESTS</h3>
      </div>

      {/* Second section */}
      <div className="flex flex-col items-start">
        <h3 className="text-sm font-medium text-slate-200">HOSTED BY</h3>
      </div>

      {/* Third section */}
      <div className="flex flex-col items-start">
        <h3 className="text-sm font-medium text-slate-200">DETAILS</h3>
      </div>
    </div>
  );
};
