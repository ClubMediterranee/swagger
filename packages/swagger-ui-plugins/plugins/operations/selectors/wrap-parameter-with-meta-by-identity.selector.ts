import { System } from "../../../interfaces/System";

export function parameterWithMetaByIdentity(oriSelector: any, system: System) {
  return (...args: any[]) => {
    return oriSelector(...args);
  };
}
