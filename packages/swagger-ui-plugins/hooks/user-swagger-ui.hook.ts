import type { FooterProps } from "@clubmed/ui/organisms/Footer/Footer";
import SwaggerUI, { SwaggerUIProps } from "swagger-ui-react";

import type { InitOAuthOptions, System } from "../interfaces/System";
import { Oauth2Plugin } from "../plugins/auth/oauth2.plugin";
import { BaseLayoutPlugin } from "../plugins/layout/base-layout.plugin";
import { TopbarPlugin } from "../plugins/topbar/topbar.plugin";

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
  oauth?: InitOAuthOptions;
  nav?: { label: string; url: string }[];
  footer?: FooterProps;
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
    layout: "StandaloneLayout",
    defaultModelsExpandDepth: 0,
    docExpansion: "list",
    fieldsPersistence: ["api_key"],
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
      if (!request.url.endsWith("swagger.json")) {
        request.url += `${request.url.includes("?") ? "&" : "?"}timestamp=${Date.now()}`;
      }

      return request;
    };
  }

  const PLUGINS = [BaseLayoutPlugin, TopbarPlugin, Oauth2Plugin, ...(baseOpts.overridePlugins || [])];
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
      .map((plugin) =>
        PLUGINS.find(
          (p) =>
            (
              p as {
                name: string;
              }
            ).name === plugin
        )
      )
      .filter(Boolean) as any[];
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
