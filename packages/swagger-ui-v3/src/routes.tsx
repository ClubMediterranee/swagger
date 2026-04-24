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
    index: true,
    columns: []
  },
  {
    label: "Migration notes redirect",
    element: React.lazy(() => import("./views/migration-notes/migration-notes-redirect.view")),
    path: "/migration-notes/:id",
    hidden: true,
    index: false,
    columns: []
  },
  {
    label: "Migration notes",
    path: "https://portal.api.clubmed/migration-notes",
    index: false,
    columns: []
  },
  {
    label: "Webhooks",
    path: `https://portal.api.clubmed/pages/webhooks`,
    index: false,
    columns: []
  },
  {
    label: "Status",
    path: `https://status.api.clubmed`,
    index: false,
    columns: []
  }
];
