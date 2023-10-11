import {SwaggerUIProps} from "swagger-ui-react";
import {System} from "../interfaces/System";

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

  config = {
    // brandName: "ClubMed",
    // appName: "API",
    // url: "https://api.integ.clubmed.com/doc/swagger.json",
    // oauth2RedirectUrl: `${window.location.origin}/doc/o2c.html`,
    // deepLinking: true,
    // disableBrowserCache: false,
    // filter: true,
    defaultModelsExpandDepth: 0,
    docExpansion: "list",
    fieldsPersistence: [
      "api_key"
    ],
    // tagsSwitches: [
    //   {label: "Deprecated", value: "deprecated"},
    //   {label: "Admin", value: "admin"}
    // ],
    syntaxHighlight: {
      activate: true,
      theme: "agate"
    },
    useUnsafeMarkdown: true,
    ...(config || {}),
    // presets: config.presets || [
    //   "apis"
    // ],
    plugins: config.plugins || [
      "SidebarPlugin",
      "TopbarPlugin",
      "StandaloneLayoutPlugin",
      "OperationsPlugin",
      "OAuth2Plugin",
      "HighlightPlugin",
      "FooterPlugin"
    ]
  };

  if (config.appName?.toLowerCase() === "api" || config.disableBrowserCache) {
    config.requestInterceptor = (request: any) => {
      if (!request.url.endsWith("swagger.json")) {
        request.url += `${request.url.includes("?") ? "&" : "?"}timestamp=${Date.now()}`;
      }

      return request;
    };
  }

  // map presets
  if (config.presets) {
    config.presets = config.presets.map((plugin) => {
      return undefined;
    }).filter(Boolean) as any[];
  }

  if (config.plugins) {
    config.plugins = config.plugins.map((plugin) => {
      return undefined;
    }).filter(Boolean) as any[];
  }

  function onComplete(system: System) {
    console.log("== onComplete ==", system);
  }

  return {
    ...config,
    onComplete
  } as SwaggerUIProps;
}
