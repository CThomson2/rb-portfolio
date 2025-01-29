import { FloatingNav } from "@/components/ui/FloatingNavbar";
import { navItems } from "@/content/main";

export default function QrdLayout({ children }: { children: React.ReactNode }) {
  return (
    // Remove padding-top and set overflow hidden to remove scrollbar
    <div className="fixed inset-0 h-screen w-screen overflow-hidden">
      <main>{children}</main>

      {/* Global navigation */}
      {/* <FloatingNav navItems={navItems} isStatic /> */}
    </div>
  );
}
