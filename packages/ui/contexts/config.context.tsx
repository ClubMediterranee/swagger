import { createContext, useContext } from "react";

export const ConfigContext = createContext<any | null>(null);

export function useConfig(): any {
  return useContext(ConfigContext)!;
}
