import React from "react";
import { RouteProps } from "react-router";

declare global {
  interface Window {
    basename: string;
  }
}

export const routes: (RouteProps & { element?: any } & Record<string, unknown>)[] = [
  {
    label: "Documentation",
    //hidden: true,
    element: React.lazy(() => import("./views/swagger/swagger.view")),
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
    element: React.lazy(() => import("./views/swagger/swagger.view")),
    subView: React.lazy(() => import("./views/swagger/webhooks/webhooks.view")),
    index: false,
    enableAuthorize: true
  },
  {
    label: "Status",
    path: "https://status.api.clubmed/",
    external: true,
    index: false
  }
];
