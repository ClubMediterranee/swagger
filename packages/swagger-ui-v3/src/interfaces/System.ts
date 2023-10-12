import {SwaggerUIProps} from "swagger-ui-react";

export interface System {
  specSelectors: {
    loadingStatus(): string;
    servers(): Map<string, any> | undefined;
    schemes(): Map<string, any> | undefined;
    securityDefinitions(): Map<string, any> | undefined;
  };
  errSelectors: {},
  getConfigs(): Record<string, any> & SwaggerUIProps;

  getComponent(name: stringn, bool?: boolean): React.Component;
}
