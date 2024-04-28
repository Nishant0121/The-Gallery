import React, { createContext, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <UserContext.Provider value={{ user, setUser, isOpen, setIsOpen }}>
      {children}
    </UserContext.Provider>
  );
}
