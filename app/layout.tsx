import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider, UiProvider } from "./providers";
import NavbarMain from "@/components/navbar/NavbarMain";

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
        <StoreProvider>
          <UiProvider>
            <NavbarMain />
            {children}
          </UiProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
