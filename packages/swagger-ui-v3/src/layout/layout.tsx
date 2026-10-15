import { Button } from "@clubmed/trident-ui/ui/buttons/Button";
import { SidebarLayout } from "@clubmed/trident-ui/ui/SidebarLayout";
import { useConfig } from "@clubmed/ui/contexts/config.context";
import React, { PropsWithChildren } from "react";
import { useHref, useLocation } from "react-router-dom";

import { Search } from "../components/search.component";
import { routes } from "../routes";
import { HeaderLogo } from "./portal/header-logo.component";
import { Languages } from "./portal/languages.component";
import { getPortalNavigation, OPENAPI_ID, PORTAL_URL, portalNavigation } from "./portal/navigation";

const Footer = React.lazy(() => import("@clubmed/ui/organisms/Footer/Footer"));

export interface LayoutProps {}

export function Layout({ children }: PropsWithChildren<LayoutProps>) {
  const { config, setConfig } = useConfig();
  const location = useLocation();
  const shouldDisabledActions = location.pathname !== "/";
  const { enableAuthorize } = routes.find((route) => route.path === location.pathname) || {};
  const swaggerHref = useHref("/");
  const navigation = getPortalNavigation(window.SwaggerUIConfiguration?.portalNavigation ?? portalNavigation, swaggerHref);

  const onClick = (action: string) => {
    switch (action) {
      case "authorize":
        setConfig({
          ...config,
          showAuthorize: true
        });
        break;
      case "filters":
        setConfig({
          ...config,
          showAdvancedFilters: !config.showAdvancedFilters
        });
    }
  };

  const onChange = (_: string | undefined, value: string) => {
    setConfig({
      ...config,
      search: value
    });
  };

  return (
    <div className="swagger-app">
      <SidebarLayout className="portal-shell" items={navigation} activeIndex={navigation.findIndex(({ id }) => id === OPENAPI_ID)}>
        <HeaderLogo data-slot="header-logo" alt="Club Med API home" href={`${PORTAL_URL}/`} />
        <div data-slot="header-actions" className="flex justify-center gap-20">
          <Languages />
        </div>
        <div className="swagger-ui">
          {location.pathname !== "/" && (
            <div role="toolbar" aria-label="API tools" className="sticky top-0 z-1 flex items-center justify-end gap-12 pb-16 bg-white">
              <Button
                theme="outline"
                variant="circle"
                color="black"
                icon="Filters"
                aria-label="Advanced filters"
                disabled={shouldDisabledActions}
                onClick={() => onClick("filters")}
              />
              <Search disabled={shouldDisabledActions} value={config.search} onChange={onChange} />
              <Button
                theme="outline"
                variant="circle"
                color="black"
                icon="PeopleSingle"
                aria-label="Authorize"
                disabled={!(!shouldDisabledActions || enableAuthorize)}
                onClick={() => onClick("authorize")}
              />
            </div>
          )}
          <div>{children}</div>
          {config.footer ? <Footer {...config.footer} /> : null}
        </div>
      </SidebarLayout>
    </div>
  );
}
