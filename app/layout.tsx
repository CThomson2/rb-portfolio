import type { Metadata } from "next";
import { Inter } from "next/font/google";

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
        {/* Sidebar is included globally; it can be toggled open/closed on any page */}
        <Sidebar />

        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
