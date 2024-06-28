import { useInterval } from "@clubmed/ui/hooks/useInterval";
import { useState } from "react";

export interface EnvInfo {
  type: string;
  env: string;
  state: "OK" | "KO";
  url: string;
  version: string;
  doc_url: string;
  branch?: string;
}

export interface ApiEnvInfo extends EnvInfo {
  doc_url_v3: string;
  doc_url: string;
  type: "api";
  env: "production" | "staging" | "integ" | "integx";
}

export function useEnvsInfoHook() {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isLoadedOnce, setIsLoadedOnce] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [envs, setEnvs] = useState<(EnvInfo | ApiEnvInfo)[]>([]);
  const [dateUpdate, setDateUpdate] = useState<Date | null>(null);

  async function fetchEnvsInfo() {
    setIsActive(true);

    try {
      const response = await fetch("https://www.dataviz.clubmed/rest/envs/info").then((res) => res.json());

      setEnvs(response);
      setDateUpdate(new Date());
    } catch (er: unknown) {
      setError(er as Error);
    } finally {
      setIsActive(false);
      setIsLoadedOnce(true);
    }
  }

  useInterval(fetchEnvsInfo, 10000, []);

  return {
    isLoadedOnce,
    isActive,
    setIsActive,
    error,
    dateUpdate,
    envs
  };
}
