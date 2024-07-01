import { ApiEnvInfo, EnvInfo } from "../hooks/use-envs-info.hook";

export function getBranch(env: ApiEnvInfo | EnvInfo) {
  return String(env.branch).replace(/.1$/, "");
}
