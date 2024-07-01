import { ApiEnvInfo, EnvInfo } from "../hooks/use-envs-info.hook";

export const Envs: Record<string, string> = {
  integx: "Integ",
  integ: "Integ",
  staging: "Staging",
  production: "Prod"
};

export const EnvsColors: Record<string, string> = {
  integx: "border-sand bg-sand",
  integ: "border-lavender bg-lavender",
  staging: "border-verdigris bg-verdigris",
  production: "border-wave bg-wave text-white"
};

export const EnvsPriority: Record<string, number> = {
  integx: 0,
  integ: 1,
  production: 3,
  staging: 2
};

export function getEnv(env: ApiEnvInfo | EnvInfo) {
  if (env.type === "api" && env.env === "integx") {
    const [prefix] = env.url.split("https://")[1].split(".");

    return `${Envs[env.env]} ${prefix.replace("api", "")}`;
  }

  return Envs[env.env];
}
