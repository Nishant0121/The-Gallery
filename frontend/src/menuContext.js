import { createContext, useState } from "react";
export const MenuContext = createContext({});

export function MenuContexProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MenuContexProvider value={{ isOpen, setIsOpen }}>
      {children}
    </MenuContexProvider>
  );
}
