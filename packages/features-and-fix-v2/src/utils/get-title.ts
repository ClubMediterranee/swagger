import { ApiEnvInfo, EnvInfo } from "../hooks/use-envs-info.hook";

export const Envs: Record<string, string> = {
  integ: "Integration",
  integx: "Integration",
  production: "Production",
  staging: "Staging"
};

export function getTitle({ env, type, url }: ApiEnvInfo | EnvInfo) {
  if (type === "api") {
    if (env === "integx") {
      const [prefix] = url.split("https://")[1].split(".");

      return `${type.toUpperCase()} - ${Envs[env]} ${prefix.replace("api", "")}`;
    }

    return `${type.toUpperCase()} - ${Envs[env]}`;
  }

  return `OIDC ${type.toUpperCase()} - ${Envs[env]}`;
}
