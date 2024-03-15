import { DeviceProvider } from "@clubmed/trident-ui/contexts/Device";
import SwaggerUI, { SwaggerUIProps } from "swagger-ui-react";

import { ConfigContext } from "./contexts/config.context";
import { userSwaggerUI } from "./hooks/user-swagger-ui.hook";

export const isMobile = () => {
  return /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(window.navigator.userAgent);
};

function App() {
  const config = userSwaggerUI();

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
