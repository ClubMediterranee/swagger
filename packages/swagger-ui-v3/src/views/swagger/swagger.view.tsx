import { useSwaggerUI } from "@clubmed/swagger-ui-plugins/hooks/use-swagger-ui.hook";
import { FiltersPlugin } from "@clubmed/swagger-ui-plugins/plugins/filter/filters.plugin";
import { RequestSnippetGeneratorPlugin } from "@clubmed/swagger-ui-plugins/plugins/request-snippets/request-snippets.plugin";
import { useConfig } from "@clubmed/ui/contexts/config.context";
import { useEffect } from "react";
import SwaggerUI from "swagger-ui-react";

import { StandaloneLayoutPlugin } from "../../layout/standalone-layout.plugin";

export function SwaggerView({ subView }: { subView?: React.LazyExoticComponent<any> }) {
  const { config: configPreset, setConfig } = useConfig();

  const config = useSwaggerUI({
    ...configPreset,
    overridePlugins: [StandaloneLayoutPlugin],
    plugins: [FiltersPlugin, StandaloneLayoutPlugin, RequestSnippetGeneratorPlugin]
  });

  useEffect(() => {
    setConfig({
      ...config,
      subView
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subView]);

  return <SwaggerUI {...(config as any)} tryItOutEnabled={true} />;
}

export default SwaggerView;
