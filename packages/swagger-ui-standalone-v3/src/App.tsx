import { useSwaggerUI } from "@clubmed/swagger-ui-plugins/hooks/use-swagger-ui.hook";
import { FiltersPlugin } from "@clubmed/swagger-ui-plugins/plugins/filter/filters.plugin";
import { RequestSnippetGeneratorPlugin } from "@clubmed/swagger-ui-plugins/plugins/request-snippets/request-snippets.plugin";
import { TopbarPlugin } from "@clubmed/swagger-ui-plugins/plugins/topbar/topbar.plugin";
import { DeviceProvider } from "@clubmed/trident-ui/contexts/Device";
import { ConfigContext } from "@clubmed/ui/contexts/config.context";
import { useState } from "react";
import SwaggerUI, { SwaggerUIProps } from "swagger-ui-react";

import { StandaloneLayoutPlugin } from "./layout/standalone-layout.plugin";

export const isMobile = () => {
  return /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(window.navigator.userAgent);
};

function App() {
  const initial = useSwaggerUI({
    overridePlugins: [StandaloneLayoutPlugin],
    plugins: [FiltersPlugin, TopbarPlugin, StandaloneLayoutPlugin, RequestSnippetGeneratorPlugin]
  });

  const [config, setConfig] = useState<SwaggerUIProps>(initial);

  return (
    <DeviceProvider device={isMobile() ? "mobile" : "desktop"}>
      <ConfigContext.Provider value={{ config, setConfig }}>
        {/* @ts-ignore */}
        <SwaggerUI {...(config as SwaggerUIProps)} tryItOutEnabled={true} />
      </ConfigContext.Provider>
    </DeviceProvider>
  );
}

export default App;
