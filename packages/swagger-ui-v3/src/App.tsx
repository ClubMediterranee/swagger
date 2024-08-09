import { DeviceProvider } from "@clubmed/trident-ui/contexts/Device";
import { ConfigContext } from "@clubmed/ui/contexts/config.context";
import { Suspense, useState } from "react";
import { Route, Routes } from "react-router-dom";

import { Layout } from "./layout/layout";
import { presetConfig } from "./preset.config";
import { routes } from "./routes";

export const isMobile = () => {
  return /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(window.navigator.userAgent);
};

function App() {
  const nav: { label: string; url: string }[] = routes
    .filter((route) => !route.hidden)
    .map((route) => {
      return {
        ...route,
        label: String(route.label),
        url: String(route.href || route.path)
      };
    });

  const [config, setConfig] = useState({
    nav,
    ...presetConfig
  });

  return (
    <DeviceProvider device={isMobile() ? "mobile" : "desktop"}>
      <ConfigContext.Provider value={{ config, setConfig }}>
        <Layout>
          {/* @ts-ignore */}
          <Routes>
            {routes
              .filter((route) => route.element && !route.external)
              .map((route) => {
                return (
                  <Route
                    key={route.path}
                    {...route}
                    element={
                      <Suspense fallback={<></>}>
                        <route.element basePath={route.path} {...route} />
                      </Suspense>
                    }
                  />
                );
              })}
          </Routes>
        </Layout>
      </ConfigContext.Provider>
    </DeviceProvider>
  );
}

export default App;
