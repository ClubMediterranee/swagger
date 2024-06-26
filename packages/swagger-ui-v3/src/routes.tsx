import { SwaggerView } from "@clubmed/swagger-ui-plugins/views/swagger.view";
import React, { ReactNode } from "react";
import { RouteProps } from "react-router";

export const routes: (RouteProps & { element?: any } & Record<string, unknown>)[] = [
  {
    label: "Home",
    hidden: true,
    element: SwaggerView as unknown as ReactNode,
    path: "/",
    index: true
  },
  // {
  //   label: "Discover",
  //   path: "/discover",
  //   element: React.lazy(() => import("./views/discover/discover.view")),
  //   columns: []
  // },
  // {
  //   label: "Migration notes",
  //   path: "/migration-notes",
  //   element: React.lazy(() => import("./views/migrations/migration-notes.view"))
  // },
  {
    label: "Webhooks",
    path: "/webhooks",
    element: React.lazy(() => import("./views/webhooks/webhooks.view")),
    index: false
  },
  {
    label: "Status",
    path: "https://status.api.clubmed/",
    external: true,
    index: false
  }
];
