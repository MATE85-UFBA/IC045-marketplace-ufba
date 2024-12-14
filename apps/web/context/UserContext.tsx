"use client";

import { loadUserFromLocalStorage } from "@/lib/user.storage";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

export interface UserContextType {
  id: string;
  name: string;
  email: string;
  img: string;
  role: "ADMIN" | "USER";
  utype: "COMPANY" | "RESEARCHER" | "NONE";
}

interface UserContextData {
  user: UserContextType | null;
  setUser: React.Dispatch<React.SetStateAction<UserContextType | null>>;
}

const UserContext = createContext<UserContextData | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserContextType | null>(null);

  useEffect(() => {
    setUser(loadUserFromLocalStorage);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextData => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within an UserProvider");
  }
  return context;
};
