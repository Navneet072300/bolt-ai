"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { MessagesContext } from "@/context/MessageContext";
import { UserDetailContext } from "@/context/UserDetailContext";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [messages, setMessages] = React.useState();
  const [userDetail, setUserDetail] = React.useState();

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <MessagesContext.Provider value={{ messages, setMessages }}>
        <NextThemesProvider {...props}>{children}</NextThemesProvider>
      </MessagesContext.Provider>
    </UserDetailContext.Provider>
  );
}
