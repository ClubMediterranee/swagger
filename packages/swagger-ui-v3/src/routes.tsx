import React from "react";
import type {RouteProps} from "react-router";

export const routes: RouteProps & Record<string, any>[] = [
  {
    label: "Home",
    hidden: true,
    element: React.lazy(() => import( "./views/swagger/swagger.view")),
    path: "/",
    index: true
  },
  {
    label: "Discover",
    path: "/discover",
    element: React.lazy(() => import("./views/discover/discover.view")),
    columns: []
  },
  {
    label: "Migration notes",
    path: "/migration-notes",
    element: React.lazy(() => import("./views/migrations/migration-notes.view"))
  },
  {
    label: "Webhooks",
    path: "/webhooks",
    element: React.lazy(() => import("./views/webhooks/webhooks.view"))
  },
  {
    label: "Status",
    path: "https://status.api.clubmed/",
    external: true
  },
  {
    label: "About",
    path: "/about",
    element: React.lazy(() => import("./views/migrations/migration-notes.view"))
  }
];

//
// const nav: HeaderNavItemProps[] = [
//   {
//     label: "Discover",
//     url: "/",
//     columns: [
//       {
//         sections: [
//           {
//             title: "Our products",
//             url: "/",
//             links: [
//               {
//                 label: "All inclusive sun holidays",
//                 url: "/o/all-inclusive-sun-holidays"
//               },
//               {
//                 label: "All Inclusive ski holidays",
//                 url: "/o/all-inclusive-ski-holidays"
//               },
//               {
//                 label: "Ski comparator",
//                 url: "/l/ski-comparator"
//               },
//               {
//                 label: "Organized travel tours",
//                 url: "/l/organized-travel-tours"
//               }
//             ]
//           }
//         ]
//       },
//       {
//         sections: [
//           {
//             title: "All Inclusive by Club Med",
//             url: "/o",
//             links: [
//               {
//                 label: "Discover the All Inclusive",
//                 url: "/o"
//               },
//               {
//                 label: "Sports at Club Med",
//                 url: "/o"
//               },
//               {
//                 label: "Childcares",
//                 url: "/o"
//               }
//             ]
//           },
//           {
//             title: "Club Med Experiences",
//             url: "/o",
//             links: [
//               {
//                 label: "Familly holidays",
//                 url: "/o"
//               },
//               {
//                 label: "Short stays",
//                 url: "/o"
//               }
//             ]
//           }
//         ]
//       }
//     ]
//   },
//   {
//     label: "Destinations",
//     url: "/d",
//     columns: [
//       {
//         sections: [
//           {
//             title: "Europe & Mediterranea",
//             url: "/d/europe",
//             links: [
//               {
//                 label: "France",
//                 url: "/d/europe/france"
//               },
//               {
//                 label: "Greece",
//                 url: "/d/europe/greece"
//               },
//               {
//                 label: "Italy",
//                 url: "/d/europe/italy"
//               },
//               {
//                 label: "Portugal",
//                 url: "/d/europe/portugal"
//               },
//               {
//                 label: "Sicily",
//                 url: "/d/europe/sicily"
//               },
//               {
//                 label: "Spain",
//                 url: "/d/europe/spain"
//               },
//               {
//                 label: "Turkey",
//                 url: "/d/europe/turkey"
//               }
//             ]
//           },
//           {
//             title: "Alps",
//             url: "/d/alps",
//             links: [
//               {
//                 label: "France",
//                 url: "/d/europe/france"
//               },
//               {
//                 label: "Italy",
//                 url: "/d/europe/italy"
//               },
//               {
//                 label: "Switzerland",
//                 url: "/d/europe/switzerland"
//               },
//               {
//                 label: "Alps in Summer",
//                 url: "/d/europe/alps"
//               }
//             ]
//           }
//         ]
//       },
//       {
//         sections: [
//           {
//             title: "Europe & Mediterranea",
//             url: "/d/europe",
//             links: [
//               {
//                 label: "France",
//                 url: "/d/europe/france"
//               },
//               {
//                 label: "Greece",
//                 url: "/d/europe/greece"
//               },
//               {
//                 label: "Italy",
//                 url: "/d/europe/italy"
//               },
//               {
//                 label: "Portugal",
//                 url: "/d/europe/portugal"
//               },
//               {
//                 label: "Sicily",
//                 url: "/d/europe/sicily"
//               },
//               {
//                 label: "Spain",
//                 url: "/d/europe/spain"
//               },
//               {
//                 label: "Turkey",
//                 url: "/d/europe/turkey"
//               }
//             ]
//           },
//           {
//             title: "Alps",
//             url: "/d/alps",
//             links: [
//               {
//                 label: "France",
//                 url: "/d/europe/france"
//               },
//               {
//                 label: "Italy",
//                 url: "/d/europe/italy"
//               },
//               {
//                 label: "Switzerland",
//                 url: "/d/europe/switzerland"
//               },
//               {
//                 label: "Alps in Summer",
//                 url: "/d/europe/alps"
//               }
//             ]
//           }
//         ]
//       },
//       {
//         sections: [
//           {
//             title: "Europe & Mediterranea",
//             url: "/d/europe",
//             links: [
//               {
//                 label: "France",
//                 url: "/d/europe/france"
//               },
//               {
//                 label: "Greece",
//                 url: "/d/europe/greece"
//               },
//               {
//                 label: "Italy",
//                 url: "/d/europe/italy"
//               },
//               {
//                 label: "Portugal",
//                 url: "/d/europe/portugal"
//               },
//               {
//                 label: "Sicily",
//                 url: "/d/europe/sicily"
//               },
//               {
//                 label: "Spain",
//                 url: "/d/europe/spain"
//               },
//               {
//                 label: "Turkey",
//                 url: "/d/europe/turkey"
//               }
//             ]
//           },
//           {
//             title: "Alps",
//             url: "/d/alps",
//             links: [
//               {
//                 label: "France",
//                 url: "/d/europe/france"
//               },
//               {
//                 label: "Italy",
//                 url: "/d/europe/italy"
//               },
//               {
//                 label: "Switzerland",
//                 url: "/d/europe/switzerland"
//               },
//               {
//                 label: "Alps in Summer",
//                 url: "/d/europe/alps"
//               }
//             ]
//           }
//         ]
//       },
//       {
//         sections: [
//           {
//             title: "Europe & Mediterranea",
//             url: "/d/europe",
//             links: [
//               {
//                 label: "France",
//                 url: "/d/europe/france"
//               },
//               {
//                 label: "Greece",
//                 url: "/d/europe/greece"
//               },
//               {
//                 label: "Italy",
//                 url: "/d/europe/italy"
//               },
//               {
//                 label: "Portugal",
//                 url: "/d/europe/portugal"
//               },
//               {
//                 label: "Sicily",
//                 url: "/d/europe/sicily"
//               },
//               {
//                 label: "Spain",
//                 url: "/d/europe/spain"
//               },
//               {
//                 label: "Turkey",
//                 url: "/d/europe/turkey"
//               }
//             ]
//           },
//           {
//             title: "Alps",
//             url: "/d/alps",
//             links: [
//               {
//                 label: "France",
//                 url: "/d/europe/france"
//               },
//               {
//                 label: "Italy",
//                 url: "/d/europe/italy"
//               },
//               {
//                 label: "Switzerland",
//                 url: "/d/europe/switzerland"
//               },
//               {
//                 label: "Alps in Summer",
//                 url: "/d/europe/alps"
//               }
//             ]
//           }
//         ]
//       },
//       {
//         sections: [
//           {
//             title: "Cruises destinations",
//             url: "/o",
//             links: [
//               {
//                 label: "link",
//                 url: "/"
//               }
//             ]
//           },
//           {
//             title: "Discovery travel tours",
//             url: "/o",
//             links: [
//               {
//                 label: "link",
//                 url: "/"
//               }
//             ]
//           },
//           {
//             title: "New resorts",
//             url: "/o",
//             links: [
//               {
//                 label: "link",
//                 url: "/"
//               }
//             ]
//           },
//           {
//             title: "Best sellers",
//             url: "/o",
//             links: [
//               {
//                 label: "link",
//                 url: "/"
//               }
//             ]
//           },
//           {
//             title: "Title",
//             url: "/",
//             links: [
//               {
//                 label: "Travel conditions",
//                 url: "/l/travel-conditions"
//               }
//             ]
//           }
//         ]
//       }
//     ]
//   },
//   {
//     label: "About",
//     url: "/about"
//   }
// ];
