import { Button } from "@clubmed/trident-ui/molecules/Buttons/Button";
import { useConfig } from "@clubmed/ui/contexts/config.context";
import { Header } from "@clubmed/ui/organisms/Header";
import React, { PropsWithChildren } from "react";
import { useLocation } from "react-router-dom";

import { Search } from "../components/search.component";
import { routes } from "../routes";
import { RouterLink } from "./router-link.component";

const Footer = React.lazy(() => import("@clubmed/ui/organisms/Footer/Footer"));

export interface LayoutProps {}

export function Layout({ children }: PropsWithChildren<LayoutProps>) {
  const { config, setConfig } = useConfig();
  const location = useLocation();
  const shouldDisabledActions = location.pathname !== "/";
  const { enableAuthorize } = routes.find((route) => route.path === location.pathname) || {};

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
    <div className={"swagger-ui"}>
      <Header version={config.version} Link={RouterLink} homepageUrl="/" openMenu="Open menu" items={config.nav.filter(Boolean)}>
        <Button
          theme={config.showAdvancedFilters ? "black" : "blackStroke"}
          variant="icon"
          icon="Filters"
          disabled={shouldDisabledActions}
          onClick={() => onClick("filters")}
        />
        <Search disabled={shouldDisabledActions} value={config.search} onChange={onChange} />
        <Button
          theme="blackStroke"
          variant="icon"
          icon="PeopleSingle"
          disabled={!(!shouldDisabledActions || enableAuthorize)}
          onClick={() => onClick("authorize")}
        />
      </Header>
      <div className="min-h-screen">{children}</div>
      {config.footer ? <Footer {...config.footer} /> : null}
    </div>
  );
}
