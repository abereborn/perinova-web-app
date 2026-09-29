import { createContext, useContext } from "react";

type MotherMenuContextValue = { openMenu: () => void };

export const MotherMenuContext = createContext<MotherMenuContextValue | null>(null);

export function useMotherMenu() {
  return useContext(MotherMenuContext);
}
