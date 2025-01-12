import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "./provider";
import Providers from "./providers";
import Sidebar from "@/components/home/Sidebar";

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
        <Sidebar />
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
