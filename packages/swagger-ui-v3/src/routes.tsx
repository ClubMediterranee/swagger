import {SwaggerView} from "./views/swagger/swagger.view";
import {RouteProps} from "react-router/dist/lib/components";

export const routes: RouteProps & Record<string, any>[] = [
  {
    label: "Home",
    hidden: true,
    element: SwaggerView,
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
  // {
  //   label: "Webhooks",
  //   path: "/webhooks",
  //   element: React.lazy(() => import("./views/webhooks/webhooks.view"))
  // },
  {
    label: "Status",
    path: "https://status.api.clubmed/",
    external: true
  }
];
