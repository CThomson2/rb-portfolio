import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Menu } from "lucide-react";

import "./globals.css";
import { Providers } from "./providers";
import { Sidebar } from "@/components/layout/Sidebar";

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
        <div className="min-h-screen bg-gray-900">
          {/* Global header with menu button */}
          <header className="fixed top-0 right-0 z-50 w-full bg-gray-800/80 backdrop-blur supports-[backdrop-filter]:bg-gray-800/80 border-b border-gray-700">
            <div className="flex h-14 items-center justify-between px-4">
              <div className="flex-1" />
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md text-gray-400 hover:text-gray-300"
                data-toggle-sidebar
              >
                <span className="sr-only">Open sidebar</span>
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </header>

          {/* Main content area */}
          <main className="pt-14">
            <Providers>{children}</Providers>
          </main>

          {/* Sidebar is included globally but controlled via a client component */}
          <Sidebar />
        </div>
      </body>
    </html>
  );
}
