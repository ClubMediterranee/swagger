import SwaggerUI, {SwaggerUIProps} from "swagger-ui-react";
import {ConfigContext} from "../contexts/config.context";
import {userSwaggerUI} from "../hooks/user-swagger-ui.hook.js";

export function SwaggerUIContainer() {
  const config = userSwaggerUI();

  return <ConfigContext.Provider value={config}>
    <SwaggerUI {...(config as SwaggerUIProps)} tryItOutEnabled={true}/>
  </ConfigContext.Provider>
}

export default SwaggerUIContainer;
