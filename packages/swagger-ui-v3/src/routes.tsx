import React from "react";
import { RouteObject, RouteProps } from "react-router";

declare global {
  interface Window {
    basename: string;
  }
}

export const routes: (RouteProps & { element?: any } & Record<string, unknown>)[] = [
  {
    label: "Documentation",
    //hidden: true,
    element: React.lazy(() => import("@clubmed/swagger-ui-plugins/views/swagger.view")),
    path: "/",
    index: true
  },
  // {
  //   label: "Discover",
  //   path: "/discover",
  //   element: React.lazy(() => import("./views/discover/discover.view")),
  //   columns: []
  // },
  {
    label: "Migration notes",
    path: "/migration-notes",
    element: React.lazy(() => import("./views/migrations/migration-notes.view")),
    index: false
  },
  {
    label: "Migration notes",
    path: "/migration-notes/:id",
    element: React.lazy(() => import("./views/migrations/migration-note.view")),
    index: false,
    hidden: true
  },
  {
    label: "Webhooks",
    path: `/webhooks`,
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
