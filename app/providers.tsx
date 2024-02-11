"use client";

import { makeStore } from "@/lib/store";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";

export function UiProvider({ children }: { children: React.ReactNode }) {
  return <NextUIProvider className="h-full">{children}</NextUIProvider>;
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={makeStore()}>{children}</Provider>;
}
