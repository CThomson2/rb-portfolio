"use client";

import { useState } from "react";
import { InitialInfo } from "./InitialInfo";
import { ProcessInfo } from "./ProcessInfo";
import { cn } from "@/lib/utils";
/* Yet to be implemented */
// import { OrderInfo } from "./orderInfo";
// import { FinalInfo } from "./finalInfo";

const FORM_STEPS = [
  { id: 1, name: "Initial Details" },
  { id: 2, name: "Process Information" },
  { id: 3, name: "Final Records" },
];

/* ## Page 1: Basic Information ##

Purpose: Capture the initial job details—mirroring the top of your paper form.

Fields could include:

Production Record ID: auto-generated or manually assigned.
Material: e.g. "Methanol," "Acetonitrile," etc. Possibly a dropdown from your DB.
Order ID: This references the order from which the drums came. If needed, a user can confirm or select which order.
Drum(s) #: Possibly a list or array of drum IDs. A "Scan Drums" button can open a small scanning modal that automatically populates which drums have been assigned to this production run.
Date: The date the process starts.
Operators / "Loader" or "Transport" fields: If your form requires an operator name, loader name, or second check, you can show "Operator 1," "Operator 2," or "Transport" fields. They either type their name or select from a user list.
UI Suggestions: • Provide a multi-drum input if scanning multiple drums at once. • Optionally show "Scanned Drums" in a table on this page.
*/

export function QrdForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});

  return (
    <div className="relative h-screen w-screen flex">
      {/* Left side - Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center process-background"
        style={{
          backgroundImage: `url('/images/qrd-form-1.jpeg')`,
        }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      </div>

      {/* Content container */}
      <div className="relative w-full h-full flex">
        {/* Left side content */}
        <div className="w-1/2 p-8 flex flex-col justify-between text-white">
          <div>
            <h1 className="text-4xl font-bold mb-4">Production Record</h1>
            <div className="space-y-2">
              {FORM_STEPS.map((step) => (
                <div
                  key={step.id}
                  className={cn(
                    "transition-all duration-300",
                    currentStep === step.id
                      ? "opacity-100 translate-x-0"
                      : "opacity-50 -translate-x-4",
                    currentStep > step.id && "text-green-400"
                  )}
                >
                  <span className="mr-2">
                    {currentStep > step.id ? "✓" : step.id}
                  </span>
                  {step.name}
                </div>
              ))}
            </div>
          </div>

          {/* Company branding */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Rathburn Chemicals Ltd</h2>
            <p className="text-gray-400">Quality Record Document 011</p>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="w-1/2 h-full">
          <div className="h-full w-full bg-gray-900/90 backdrop-blur-sm p-8">
            {/* Progress bar */}
            <div className="w-full h-1 bg-gray-800 mb-8">
              <div
                className="h-full bg-blue-500 transition-all duration-500"
                style={{ width: `${(currentStep / FORM_STEPS.length) * 100}%` }}
              />
            </div>

            {/* Form content */}
            <div className="h-[calc(100%-4rem)] overflow-hidden">
              {currentStep === 1 && (
                <InitialInfo
                  onSubmit={(data) => {
                    setFormData((prev) => ({ ...prev, ...data }));
                    setCurrentStep(2);
                    // Play transition sound
                    const audio = new Audio("/sounds/next-step.mp3");
                    audio.volume = 0.2;
                    audio.play().catch(() => {});
                  }}
                />
              )}
              {currentStep === 2 && (
                <ProcessInfo
                  initialData={formData}
                  onComplete={(data) => {
                    setFormData((prev) => ({ ...prev, ...data }));
                    setCurrentStep(3);
                    // Play transition sound
                    const audio = new Audio("/sounds/next-step.mp3");
                    audio.volume = 0.2;
                    audio.play().catch(() => {});
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
