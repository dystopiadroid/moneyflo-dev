import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UiProvider } from "./providers";
import NavbarMain from "@/components/navbar/NavbarMain";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MoneyFlo",
  description: "Track your Finances",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark font-mono h-screen">
      <body className="h-screen">
        <UiProvider>
          <NavbarMain />
          {children}
        </UiProvider>
      </body>
    </html>
  );
}
