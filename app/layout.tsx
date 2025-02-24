import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Menu } from "lucide-react";

import "./globals.css";
import { Providers } from "@/app/providers";
import { Sidebar } from "@/components/layout/sidebar/Sidebar";
import { FloatingNav } from "@/components/ui/LFloatingNavbar";
import { ThemeToggle } from "@/components/ui/LThemeToggle";
import { navItems } from "@/content/main";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rathburn Chemicals | Premium Laboratory Chemicals & Solutions",
  description:
    "Leading manufacturer of high-purity HPLC solvents, analytical reagents, and custom chemical solutions. Browse our product range and order online.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/rc-logo-b.png" sizes="any" />
      </head>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-background text-foreground">
            {/* Top-right controls */}
            <div className="fixed top-4 right-4 z-[5001] flex items-center gap-2">
              <ThemeToggle />
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md text-gray-400 hover:text-gray-300 bg-gray-800/80 backdrop-blur"
                data-toggle-sidebar
              >
                <span className="sr-only">Open sidebar</span>
                <Menu className="h-6 w-6" />
              </button>
            </div>

            {/* Global navigation */}
            <FloatingNav navItems={navItems} />

            {/* Main content area */}
            <main className="min-h-screen bg-background">{children}</main>

            {/* Sidebar is included globally but controlled via a client component */}
            <Sidebar />
          </div>
        </Providers>
      </body>
    </html>
  );
}
