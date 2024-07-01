import { Link } from "@clubmed/trident-ui/molecules/Link";
import classnames from "classnames";
import { gte } from "semver";

import { ApiEnvInfo, EnvInfo } from "../hooks/use-envs-info.hook";
import { getBranch } from "../utils/get-branch";
import { EnvsColors, EnvsPriority, getEnv } from "../utils/get-env";
import { Card } from "./Card";

export function Column({ envs }: { envs: (ApiEnvInfo | EnvInfo)[] }) {
  let isUnderProduction = false;
  let isUnderStaging = false;
  return (
    <div>
      <div className={"w-[400px] flex flex-col p-16 gap-y-16 rounded-16"}>
        {envs
          .sort((a, b) => {
            if (a.version === b.version) {
              return EnvsPriority[a.env] > EnvsPriority[b.env] ? 1 : -1;
            }

            return gte(b.version, a.version) ? 1 : -1;
          })
          .map((env) => {
            if (env.env === "production") {
              isUnderProduction = true;
            }
            if (env.env === "staging") {
              isUnderStaging = true;
            }

            const isProductionOutdated = isUnderProduction && env.env !== "production";
            const isStagingOutdated = isUnderStaging && !["production", "staging"].includes(env.env);

            return (
              <div
                key={env.url}
                className={classnames(
                  {
                    "opacity-50 cursor-not-allowed line-through": env.state === "KO" || isProductionOutdated,
                    "opacity-70": isStagingOutdated
                  },
                  "relative"
                )}
              >
                <Card title={getBranch(env)} icon={"GridDefault"} theme={isProductionOutdated || isStagingOutdated ? "light" : "dark"}>
                  <div className="absolute top-8 right-8 flex flex-col gap-8 pl-2 bg-white">
                    <div
                      className={classnames(
                        {
                          "bg-saffron": !isProductionOutdated && !isStagingOutdated,
                          "bg-white border border-dark": isProductionOutdated || isStagingOutdated
                        },
                        "text-center text-b6 p-2 px-12 rounded-16"
                      )}
                    >
                      {env.version.split("-")[0]}
                    </div>

                    <div className={classnames(EnvsColors[env.env], "border text-b6 p-2 px-12 rounded-16 text-center")}>{getEnv(env)}</div>
                  </div>

                  <div className="flex gap-12">
                    <Link className={"text-b4"} label={"Doc"} href={env.doc_url} icon={"ArrowDefaultRight"} target={"_blank"} />
                    {"doc_url_v3" in env && (env as ApiEnvInfo).doc_url_v3 && (
                      <Link className={"text-b4"} label={"Doc v3"} icon={"ArrowDefaultRight"} href={env.doc_url_v3} target={"_blank"} />
                    )}
                  </div>
                </Card>
              </div>
            );
          })}
      </div>
    </div>
  );
}
