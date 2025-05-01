/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from "react";

interface UserContextType {
  userDetail: any;
  setUserDetail: any;
}

export const UserDetailContext = createContext<UserContextType>({
  userDetail: undefined,
  setUserDetail: undefined,
});
