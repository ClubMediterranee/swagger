import { useConfig } from "@clubmed/swagger-ui-plugins/contexts/config.context";
import { System } from "@clubmed/swagger-ui-plugins/interfaces/System";
import { Footer } from "@clubmed/ui/organisms/Footer/Footer";
import React, { Suspense } from "react";
import { Route, Routes } from "react-router";

import { routes } from "../routes";

export default function CustomStandaloneLayout(props: System) {
  const { getComponent } = props;
  const Container = getComponent("Container");
  const Topbar = getComponent("Topbar", true);
  const config = useConfig();

  return (
    <Container className="swagger-ui">
      {Topbar ? <Topbar /> : null}
      <Routes>
        {routes
          .filter((route) => route.element && !route.external)
          .map((route) => {
            return (
              <Route
                key={route.path}
                {...route}
                element={
                  <Suspense fallback={<></>}>
                    <route.element basePath={route.path} {...props} />
                  </Suspense>
                }
              />
            );
          })}
      </Routes>

      {config.footer ? <Footer {...config.footer} /> : null}
    </Container>
  );
}
