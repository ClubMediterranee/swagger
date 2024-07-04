import { useFetch } from "@clubmed/ui/hooks/useFetch";
import { useInterval } from "@clubmed/ui/hooks/useInterval";

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
  const hook = useFetch<(EnvInfo | ApiEnvInfo)[]>({ url: "https://www.dataviz.clubmed/rest/envs/info" });

  useInterval(hook.fetchData, 10000, []);

  return hook;
}
