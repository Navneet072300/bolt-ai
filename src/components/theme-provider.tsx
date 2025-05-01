"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { MessagesContext } from "@/context/MessageContext";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [messages, setMessages] = React.useState([]);

  return (
    <MessagesContext.Provider value={{ messages, setMessages }}>
      <NextThemesProvider {...props}>{children}</NextThemesProvider>
    </MessagesContext.Provider>
  );
}
