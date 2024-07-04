import { ConfigContext } from "@clubmed/swagger-ui-plugins/contexts/config.context";
import { DeviceProvider } from "@clubmed/trident-ui/contexts/Device";
import { useSwaggerUI } from "packages/swagger-ui-plugins/hooks/use-swagger-ui.hook";
import SwaggerUI, { SwaggerUIProps } from "swagger-ui-react";

import { StandaloneLayoutPlugin } from "./layout/standalone-layout.plugin";

export const isMobile = () => {
  return /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(window.navigator.userAgent);
};

function App() {
  const config = useSwaggerUI({
    overridePlugins: [StandaloneLayoutPlugin],
    plugins: ["TopbarPlugin", "StandaloneLayoutPlugin"]
  });

  return (
    <ConfigContext.Provider value={config}>
      <DeviceProvider device={isMobile() ? "mobile" : "desktop"}>
        {/* @ts-ignore */}
        <SwaggerUI {...(config as SwaggerUIProps)} tryItOutEnabled={true} />
      </DeviceProvider>
    </ConfigContext.Provider>
  );
}

export default App;
