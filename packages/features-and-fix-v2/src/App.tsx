import { Icon } from "@clubmed/trident-ui/atoms/Icons";
import { DeviceProvider } from "@clubmed/trident-ui/contexts/Device";
import { Card } from "@clubmed/trident-ui/molecules/Card";
import { Link } from "@clubmed/trident-ui/molecules/Link";
import { Loader } from "@clubmed/trident-ui/molecules/Loader";
import { Header } from "@clubmed/ui/organisms/Header";
import classnames from "classnames";
import { gte } from "semver";

import { ApiEnvInfo, EnvInfo, useEnvsInfoHook } from "./hooks/use-envs-info.hook";
import { nav } from "./nav";
import { getTitle } from "./utils/get-title";

export const isMobile = () => {
  return /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(window.navigator.userAgent);
};

function Column({ envs }: { envs: (ApiEnvInfo | EnvInfo)[] }) {
  let isUnderProduction = false;
  return (
    <div>
      <div className={"w-[400px] flex flex-col p-16 gap-y-16 rounded-16"}>
        {envs
          .sort((a, b) => (gte(b.version, a.version) ? 1 : -1))
          .map((env) => {
            if (env.env === "production") {
              isUnderProduction = true;
            }

            const isOutdated = isUnderProduction && env.env !== "production";
            return (
              <div
                key={env.url}
                className={classnames(
                  {
                    "opacity-50": env.state === "KO" || isOutdated
                  },
                  "relative"
                )}
              >
                <Card title={getTitle(env)} icon={"GridDefault"} theme={isOutdated ? "light" : "dark"}>
                  <span
                    className={classnames(
                      { "bg-saffron": !isOutdated, "bg-red": isOutdated },
                      "absolute top-8 right-8 text-b6 p-2 px-12 rounded-16"
                    )}
                  >
                    {env.version.split("-")[0]}
                  </span>

                  <div className={"mb-16"}>
                    {!["main", "master", "production"].includes(env.branch!) && (
                      <span className={"text-sienna"}>
                        <Icon name={"SpecialOffers"} className={"text-ultramarine mr-4"} />
                        {env.branch}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-12">
                    <Link label={"Doc"} href={env.doc_url} icon={"ArrowDefaultRight"} target={"_blank"} />
                    {"doc_url_v3" in env && (env as ApiEnvInfo).doc_url_v3 && (
                      <Link label={"Doc v3"} icon={"ArrowDefaultRight"} href={env.doc_url_v3} target={"_blank"} />
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

function App() {
  const { isLoadedOnce, envs, isActive, dateUpdate } = useEnvsInfoHook();

  return (
    <DeviceProvider device={isMobile() ? "mobile" : "desktop"}>
      <Header homepageUrl="/" openMenu="Open menu" items={nav.filter(Boolean)} />

      <main className="flex justify-centerfont-sans absolute top-[56px] inset-0">
        <div className={"flex flex-col w-full"}>
          <h1 className="font-serif text-ultramarine text-h2 p-24 mt-8 bg-lightSand ">
            Environments
            <small className="text-b6 font-sans block text-saffron-active">Last update: {dateUpdate?.toLocaleString()}</small>
          </h1>

          <div className="flex flex-1 overflow-auto w-full pb-24">
            <Column envs={envs.filter((env) => env.type === "api" && env.state === "OK")} />
            <Column envs={envs.filter((env) => env.type === "gm")} />
            <Column envs={envs.filter((env) => env.type === "go")} />
            <Column envs={envs.filter((env) => env.type === "partner")} />
          </div>
        </div>
      </main>

      <Loader isVisible={!isLoadedOnce && isActive} />
    </DeviceProvider>
  );
}

export default App;
