import { ConfigContext } from "@clubmed/swagger-ui-plugins/contexts/config.context";
import { useSwaggerUI } from "@clubmed/swagger-ui-plugins/hooks/user-swagger-ui.hook";
import { DeviceProvider } from "@clubmed/trident-ui/contexts/Device";
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
