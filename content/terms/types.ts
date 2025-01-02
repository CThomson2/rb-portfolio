// types/terms.ts
type TermsSection = {
  type: "header" | "subheader" | "content" | "subsection" | "bullet";
  content: string;
  sectionNumber?: string;
  bulletType?: "roman" | "alphabetic" | "numeric";
};

export type TermsContent = TermsSection[];
