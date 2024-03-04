import React from "react";
import SwaggerUI, {SwaggerUIProps} from "swagger-ui-react";
import {userSwaggerUI} from "./hooks/user-swagger-ui.hook";
import {DeviceProvider} from "@clubmed/trident-ui/contexts/Device";
import {ConfigContext} from "./contexts/config.context";

export const isMobile = () => {
  return /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(window.navigator.userAgent);
};

function App() {
  const config = userSwaggerUI();
  console.log("===={isMobile() ? \"mobile\" : \"desktop\"}", isMobile() ? "mobile" : "desktop");
  return (
    <div className="App">
      <ConfigContext.Provider value={config}>
        <DeviceProvider device={isMobile() ? "mobile" : "desktop"}>
          { /* @ts-ignore */}
          <SwaggerUI {...(config as SwaggerUIProps)} tryItOutEnabled={true}/>
        </DeviceProvider>
      </ConfigContext.Provider>
    </div>
  );
}

export default App;
