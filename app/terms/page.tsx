// import React from "react";
// import fs from "fs";
// import path from "path";

// // Read terms content at build time using fs
// const termsContent = fs.readFileSync(
//   path.join(process.cwd(), "app/terms/terms.txt"),
//   "utf-8"
// );

// const TermsPage = () => {
//   return (
//     <div className="p-8 max-w-3xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6">
//         Rathburn Chemicals Ltd Terms and Conditions of Sale
//       </h1>
//       <div className="prose dark:prose-dark">
//         {termsContent.split("\n").map((line, index) => (
//           <p key={index} className="mb-4">
//             {line}
//           </p>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TermsPage;

import { Card, CardContent } from "@/components/ui/card";
import { termsContent } from "@/data/terms";

const TermsPage = () => {
  // Helper function to get the appropriate style class
  const getStyleClass = (type: string) => {
    switch (type) {
      case "header":
        return "terms-header";
      case "subheader":
        return "terms-subheader";
      case "content":
        return "terms-content";
      case "subsection":
        return "terms-subsection";
      case "bullet":
        return "terms-bullet";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">
            Rathburn Chemicals Ltd
          </h1>
          <h2 className="text-2xl font-semibold text-white mb-4">
            Terms and Conditions of Sale
          </h2>
          <div className="h-1 w-20 bg-red-600 mx-auto rounded"></div>
        </div>

        {/* Main Content Card */}
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-8">
            {termsContent.map((section, index) => (
              <div key={index} className={getStyleClass(section.type)}>
                {section.type === "content" && section.sectionNumber && (
                  <span className="text-gray-400 text-md">
                    {section.sectionNumber}
                    <br />
                  </span>
                )}
                {section.content}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Footer note */}
        <p className="text-gray-500 text-sm text-center mt-6">
          Last updated: December 2024
        </p>
      </div>
    </div>
  );
};

export default TermsPage;
