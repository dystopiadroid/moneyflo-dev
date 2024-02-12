import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider, UiProvider } from "./providers";
import NavbarMain from "@/components/navbar/NavbarMain";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const metadata: Metadata = {
  title: "MoneyFlo",
  description: "Track your Finances",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" className="dark font-mono h-screen">
      <body className="h-screen">
        <StoreProvider>
          <UiProvider>
            <NavbarMain session={session} />
            {children}
          </UiProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
