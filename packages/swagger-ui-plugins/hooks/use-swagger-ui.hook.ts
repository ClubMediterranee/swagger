import type { FooterProps } from "@clubmed/ui/organisms/Footer/Footer";
import SwaggerUI, { type SwaggerUIProps } from "swagger-ui-react";

import type { InitOAuthOptions, System } from "../interfaces/System";
import { Oauth2Plugin } from "../plugins/auth/oauth2.plugin";
import { BaseLayoutPlugin } from "../plugins/layout/base-layout.plugin";

export interface SwaggerUIConfiguration extends Omit<Partial<SwaggerUIProps>, "plugins" | "presets"> {
  brandName: string;
  appName: string;
  url: string;
  filter?: boolean;
  plugins?: (string | any)[];
  presets?: string[];
  oauth2RedirectUrl?: string;
  fieldsPersistence?: string[];
  enableAdvancedFilter?: boolean;
  enableSearch?: boolean;
  enableAuthorize?: boolean;
  tagsSwitches?: { label: string; value: string }[];
  syntaxHighlight?: any;
  useUnsafeMarkdown?: boolean;
  disableBrowserCache?: boolean;
  oauth?: InitOAuthOptions;
  nav?: { label: string; url: string }[];
  footer?: FooterProps;
  contact?: string;
}

declare global {
  interface Window {
    SwaggerUIConfiguration?: Partial<SwaggerUIConfiguration>;
  }
}

export interface UseSwaggerUIOptions extends Partial<SwaggerUIConfiguration> {
  overridePlugins?: SwaggerUIProps["plugins"];
}

export function useSwaggerUI(baseOpts: UseSwaggerUIOptions): SwaggerUIProps {
  let config: Partial<SwaggerUIConfiguration> = window.SwaggerUIConfiguration || {};

  config = {
    enableAdvancedFilter: true,
    enableSearch: true,
    enableAuthorize: true,
    layout: "StandaloneLayout",
    defaultModelsExpandDepth: 0,
    docExpansion: "list",
    fieldsPersistence: ["api_key", "x-api-key"],
    syntaxHighlight: {
      activate: true,
      theme: "agate"
    },
    useUnsafeMarkdown: true,
    nav: baseOpts.nav,
    ...(config || {}),
    ...(baseOpts || {})
  };

  if (baseOpts.disableBrowserCache || config.disableBrowserCache) {
    config.requestInterceptor = (request: any) => {
      if (!request.url.includes("swagger.json")) {
        request.url += `${request.url.includes("?") ? "&" : "?"}timestamp=${Date.now()}`;
      }

      return request;
    };
  }

  const PLUGINS = [BaseLayoutPlugin, Oauth2Plugin, ...(baseOpts.overridePlugins || [])];
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
    config.plugins = ["Oauth2Plugin", "BaseLayoutPlugin"]
      .concat(config.plugins)
      .map((plugin: string | any) => {
        if (typeof plugin === "string") {
          return PLUGINS.find(
            (p) =>
              (
                p as {
                  name: string;
                }
              ).name === plugin
          );
        }
        return plugin;
      })
      .filter(Boolean) as any[];
  }

  if (config.oauth?.allowedFlows) {
    config.oauth!.allowedFlows = config.oauth.allowedFlows.map((item, index) => {
      if (typeof item === "string") {
        return {
          id: index,
          flow: item,
          names: [],
          scopes: config.oauth!.allowedScopes || []
        };
      }

      item.id = index;
      item.names = item.names || [];
      item.scopes = item.scopes || config.oauth!.allowedScopes || [];

      return item;
    });
  }

  function onComplete(system: System) {
    if (config.oauth) {
      system.initOAuth(config.oauth);
    }
  }

  return {
    ...config,
    onComplete
  } as SwaggerUIProps;
}
