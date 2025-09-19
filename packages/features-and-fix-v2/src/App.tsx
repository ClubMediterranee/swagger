import { DeviceProvider } from "@clubmed/trident-ui/contexts/Device";
import { Loader } from "@clubmed/trident-ui/molecules/Loader";
import { HeaderContainer } from "@clubmed/ui/organisms/HeaderContainer/HeaderContainer";

import { Cell } from "./components/Cell";
import { Column } from "./components/Column";
import { useEnvsInfoHook } from "./hooks/use-envs-info.hook";
import { nav } from "./nav";

function App() {
  const { isLoadedOnce, data, isActive, dateUpdate } = useEnvsInfoHook();

  return (
    <DeviceProvider device="all">
      <HeaderContainer homepageUrl="/" items={nav.filter(Boolean)}>
        <small className="text-b6 font-sans block text-saffron-active">Last update: {dateUpdate?.toLocaleString()}</small>
      </HeaderContainer>

      <main className="flex justify-centerfont-sans absolute top-[64px] inset-0">
        <div className={"flex flex-col w-full"}>
          <div className="flex overflow-auto w-full bg-lightSand">
            <Cell>Api</Cell>
            <Cell>GM</Cell>
            <Cell>GO</Cell>
            <Cell>Partner</Cell>
          </div>

          <div className="flex flex-1 overflow-auto w-full pb-24">
            {data && (
              <>
                <Column envs={data.filter((env) => env.type === "api" && env.state === "OK")} />
                <Column envs={data.filter((env) => env.type === "gm")} />
                <Column envs={data.filter((env) => env.type === "go")} />
                <Column envs={data.filter((env) => env.type === "partner")} />
              </>
            )}
          </div>
        </div>
      </main>

      <Loader isVisible={!isLoadedOnce && isActive} />
    </DeviceProvider>
  );
}

export default App;
