import NavbarMain from "@/components/navbar/NavbarMain";
import { Toaster } from "@/components/ui/toaster";
import { useAppSelector } from "@/lib/hooks";
import { makeStore } from "@/lib/store";
import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={makeStore()}>
      <SessionProvider>
        <NextUIProvider className="h-full">
          <NavbarMain />
          <Component {...pageProps} />
          <Toaster />
        </NextUIProvider>
      </SessionProvider>
    </Provider>
  );
}
