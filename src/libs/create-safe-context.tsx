"use client";

import React from "react";

export default function createSafeContext<T>(
  errorMessage: string = "useSafeContext must be used within a <SafeProvider/>",
) {
  const Context = React.createContext<T | null>(null);

  function useSafeContext() {
    const context = React.useContext(Context);

    if (context === null) {
      throw new Error(errorMessage);
    }

    return context;
  }

  function Provider({
    value,
    children,
  }: {
    value: T;
    children: React.ReactNode;
  }) {
    return <Context.Provider value={value}>{children}</Context.Provider>;
  }

  return [Provider, useSafeContext] as const;
}
