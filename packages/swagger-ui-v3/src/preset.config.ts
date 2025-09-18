import { patchSwagger } from "./utils/patch-swagger";

export const presetConfig = {
  disableBrowserCache: true,
  plugins: ["StandaloneLayoutPlugin", "TopBarPlugin", "RequestSnippetGeneratorPlugin"],
  contact: "mailto:lvisdigiapi@clubmed.com",
  deepLinking: false,
  oauth: {
    usePkceWithAuthorizationCodeGrant: true,
    allowedFlows: [
      "implicit",
      "authorization_code",
      {
        flow: "client_credentials",
        names: ["go"],
        scopes: ["pms", "dm"]
      }
    ],
    allowedScopes: ["openid", "email", "profile", "api_admin"],
    defaultSelectedScopes: ["openid", "email", "profile"]
  },
  persistAuthorization: false,
  requestSnippetsEnabled: true,
  requestSnippets: {
    generators: {
      node_axios: {
        title: "Axios",
        syntax: "javascript"
      },
      node_fetch: {
        title: "Fetch",
        syntax: "javascript"
      },
      node_native: {
        title: "NodeJs Native",
        syntax: "javascript"
      }
    }
  },
  responseInterceptor: (response: any) => {
    if (response.url.includes("/swagger.json")) {
      // Modify the response to include a custom property

      response.body = patchSwagger(response.body);
      response.text = JSON.stringify(response.body, null, 2);
    }
    return response;
  },
  footer: {
    columns: [
      {
        label: "Club Med Universe",
        links: [
          {
            label: "Club Med",
            href: "https://clubmed.com"
          },
          {
            label: "Club Med Suppliers",
            href: "https://www.google.com"
          },
          {
            label: "Club Med Loyalty Programme",
            href: "https://www.google.com"
          },
          {
            label: "Responsible Tourism",
            href: "https://www.google.com"
          },
          {
            label: "My Club Med App",
            href: "https://www.google.com"
          }
        ]
      }
    ],
    socialNetworks: [
      {
        label: "Instagram",
        href: "https://www.instagram.com/clubmed",
        icon: "Instagram"
      },
      {
        label: "Facebook",
        href: "https://www.facebook.com/ClubMedFrance",
        icon: "Facebook"
      },
      {
        label: "Twitter",
        href: "https://twitter.com/ClubMedfr",
        icon: "Twitter"
      },
      {
        label: "Youtube",
        href: "https://www.youtube.com/clubmed",
        icon: "YouTube"
      },
      {
        label: "Pinterest",
        href: "https://fr.pinterest.com/clubmed/",
        icon: "Pinterest"
      }
    ],
    corporateLinks: [
      {
        label: "Club Med Corporate",
        description: "Visit the Corporate Club Med site, to learn more about the Group, the ownership and sustainable development policy.",
        href: "https://corporate.clubmed/?lang=en"
      },
      {
        label: "Club Med Jobs",
        description:
          "Looking to participate in the ClubMed adventure? Learn more on the international recruitment page and stay ahead of the latest Club Med HR news.",
        href: "https://www.clubmedjobs.com/en-gb/resort"
      }
    ],
    legalLinks: [
      {
        label: "Legal Information",
        href: "https://www.clubmed.fr/l/informations-legales"
      }
    ]
  }
};
