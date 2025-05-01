/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from "react";

// Define the type for your messages context
interface MessagesContextType {
  messages: any;
  setMessages: any;
}

// Provide a default value that matches the type
export const MessagesContext = createContext<MessagesContextType>({
  messages: undefined,
  setMessages: undefined,
});
