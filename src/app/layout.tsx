import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import { Provider } from "@/theme/theme";
import { Provider as UIProvider } from "@/components/ui/provider";
import "./globals.css";
import "../../tailwind.config.ts";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rathburn Chemicals",
  description: "Rathburn Chemicals Ltd. - Public Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <UIProvider>{children}</UIProvider>
      </body>
    </html>
  );
}
