import "swagger-ui-react/swagger-ui.css";
import SwaggerUI from "swagger-ui-react";
import {userSwaggerUI} from "./hooks/user-swagger-ui.hook";
import "@clubmed/ui/styles/globals.css";
import {DeviceProvider, isMobile} from "@clubmed/ui/contexts/Device";
import {ConfigContext} from "./contexts/config.context";

function App() {
  const config = userSwaggerUI();

  return (
    <div className="App">
      <ConfigContext.Provider value={config}>
        <DeviceProvider device={isMobile() ? "mobile" : "desktop"}>
          <SwaggerUI {...config}></SwaggerUI>
        </DeviceProvider>
      </ConfigContext.Provider>
    </div>
  );
}

export default App;
