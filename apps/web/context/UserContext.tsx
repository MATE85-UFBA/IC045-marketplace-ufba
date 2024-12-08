"use client";

import { loadUserFromLocalStorage } from "@/lib/user.storage";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  img: string;
  role: "ADMIN" | "USER";
  utype: "COMPANY" | "RESEARCHER" | "NONE";
}

interface UserContextData {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextData | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(
    loadUserFromLocalStorage() || null
  );

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
