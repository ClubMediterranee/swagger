import SwaggerUI, { SwaggerUIProps } from "swagger-ui-react";

import * as Plugins from "../plugins";

export interface SwaggerUIConfiguration extends Omit<Partial<SwaggerUIProps>, "plugins" | "presets"> {
  brandName: string;
  appName: string;
  url: string;
  filter?: boolean;
  plugins?: string[];
  presets?: string[];
  oauth2RedirectUrl?: string;
  fieldsPersistence?: string[];
  tagsSwitches?: { label: string; value: string }[];
  syntaxHighlight?: any;
  useUnsafeMarkdown?: boolean;
  disableBrowserCache?: boolean;
}

declare global {
  interface Window {
    SwaggerUIConfiguration?: Partial<SwaggerUIConfiguration>;
  }
}

export function userSwaggerUI(): SwaggerUIProps {
  let config: Partial<SwaggerUIConfiguration> = window.SwaggerUIConfiguration || {};
  const isApiLayout = config.appName?.toLowerCase() === "api";

  config = {
    layout: "StandaloneLayout",
    // url: "https://api.integ.clubmed.com/doc/swagger.json",
    // oauth2RedirectUrl: `${window.location.origin}/doc/o2c.html`,
    // deepLinking: true,
    // disableBrowserCache: false,
    // filter: true,
    defaultModelsExpandDepth: 0,
    docExpansion: "list",
    fieldsPersistence: ["api_key"],
    // tagsSwitches: [
    //   {label: "Deprecated", value: "deprecated"},
    //   {label: "Admin", value: "admin"}
    // ],
    syntaxHighlight: {
      activate: true,
      theme: "agate"
    },
    useUnsafeMarkdown: true,
    ...(config || {})
  };

  if (isApiLayout || config.disableBrowserCache) {
    config.requestInterceptor = (request: any) => {
      if (!request.url.endsWith("swagger.json")) {
        request.url += `${request.url.includes("?") ? "&" : "?"}timestamp=${Date.now()}`;
      }

      return request;
    };
  }

  const PLUGINS = { ...(SwaggerUI as any).plugins, ...Plugins };
  const PRESETS = { ...(SwaggerUI as any).presets };

  // map presets
  if (config.presets) {
    config.presets = config.presets
      .map((plugin) => {
        return PRESETS[plugin];
      })
      .filter(Boolean) as any[];
  }

  if (config.plugins) {
    config.plugins = config.plugins
      .map((plugin) => {
        return PLUGINS[plugin];
      })
      .filter(Boolean) as any[];
  }

  function onComplete(/*system: System*/) {}

  return {
    isApiLayout,
    ...config,
    onComplete
  } as SwaggerUIProps;
}
