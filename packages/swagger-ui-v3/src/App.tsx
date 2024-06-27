import { ConfigContext } from "@clubmed/swagger-ui-plugins/contexts/config.context";
import { useSwaggerUI } from "@clubmed/swagger-ui-plugins/hooks/user-swagger-ui.hook";
import { DeviceProvider } from "@clubmed/trident-ui/contexts/Device";
import SwaggerUI, { SwaggerUIProps } from "swagger-ui-react";

import { StandaloneLayoutPlugin } from "./layout/standalone-layout.plugin";
import { routes } from "./routes";

export const isMobile = () => {
  return /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(window.navigator.userAgent);
};

function App() {
  const nav: { label: string; url: string }[] = routes
    .filter((route) => !route.hidden)
    .map((route) => {
      return {
        ...route,
        label: String(route.label),
        url: String(route.path)
      };
    });

  const config = useSwaggerUI({
    nav,
    disableBrowserCache: true,
    overridePlugins: [StandaloneLayoutPlugin],
    plugins: ["TopbarPlugin", "StandaloneLayoutPlugin"],
    contact: "mailto:lvisdigiapi@clubmed.com",
    oauth: {
      usePkceWithAuthorizationCodeGrant: true,
      allowedFlows: ["authorization_code", "implicit"],
      allowedScopes: ["openid", "email", "profile", "api_admin"],
      defaultSelectedScopes: ["openid", "email", "profile"]
    },
    persistAuthorization: true,
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
          description:
            "Visit the Corporate Club Med site, to learn more about the Group, the ownership and sustainable development policy.",
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
      ],
      newsletter: {
        label: "Sign up to our newsletter",
        cta: {
          label: "Sign up",
          href: "/sign-up"
        }
      }
    }
  });

  return (
    <ConfigContext.Provider value={config}>
      <DeviceProvider device={isMobile() ? "mobile" : "desktop"}>
        {/* @ts-ignore */}
        <SwaggerUI {...(config as SwaggerUIProps)} tryItOutEnabled={true} />
      </DeviceProvider>
    </ConfigContext.Provider>
  );
}

export default App;
