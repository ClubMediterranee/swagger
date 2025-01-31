import { ApiEnvInfo, EnvInfo } from "../hooks/use-envs-info.hook";

export function getBranch(env: ApiEnvInfo | EnvInfo) {
  if (env.branch === "main" || env.branch === "master" || env.branch === "") {
    return [env.branch, env.version].filter(Boolean).join(" - ");
  }

  return String(env.branch).replace(/.1$/, "") || env.version;
}
