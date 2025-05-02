"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { MessagesContext } from "@/context/MessageContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useConvex } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

interface User {
  _id: Id<"user">;
  _creationTime: number;
  picture: string;
  name: string;
  email: string;
  uid: string;
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [messages, setMessages] = React.useState();
  const [userDetail, setUserDetail] = React.useState<User | undefined>(
    undefined
  );
  const convex = useConvex();

  React.useEffect(() => {
    IsAuthenticated();
  }, []);

  const IsAuthenticated = async () => {
    if (typeof window !== "undefined") {
      const userItem = localStorage.getItem("user");
      if (userItem !== null) {
        const user = JSON.parse(userItem);
        const result = await convex.query(api.users.GetUser, {
          email: user?.email,
        });
        setUserDetail(result);
      }
    }
  };

  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_KEY as string}
    >
      <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
        <MessagesContext.Provider value={{ messages, setMessages }}>
          <NextThemesProvider {...props}>{children}</NextThemesProvider>
        </MessagesContext.Provider>
      </UserDetailContext.Provider>
    </GoogleOAuthProvider>
  );
}
