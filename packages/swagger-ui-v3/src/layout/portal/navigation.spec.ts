import { describe, expect, it } from "vitest";

import { getPortalNavigation, OPENAPI_ID, PORTAL_URL, type PortalNavigationItem } from "./navigation";

describe("portal navigation handoff", () => {
  it("resolves CMS-relative parent and child links against the portal, not the API host", () => {
    const input: PortalNavigationItem[] = [
      {
        id: "discover",
        label: "Discover",
        icon: "WithView",
        href: "/en-US/pages/discover",
        items: [{ label: "Webhooks", href: "/en-US/pages/webhooks", target: "_blank", rel: "noopener noreferrer" }]
      }
    ];
    const [item] = getPortalNavigation(input, "/doc/");

    expect(item).toMatchObject({
      href: `${PORTAL_URL}/en-US/pages/discover`,
      items: [{ href: `${PORTAL_URL}/en-US/pages/webhooks`, target: "_blank", rel: "noopener noreferrer" }]
    });
    expect(input[0]).toHaveProperty("href", "/en-US/pages/discover");
  });

  it("keeps OpenAPI on the current Swagger deployment when CMS ordering or labels change", () => {
    const items: PortalNavigationItem[] = [
      { id: "home", label: "Home", icon: "Home", href: "/" },
      { id: OPENAPI_ID, label: "Reference API", icon: "DocumentUserDetails", href: "https://api.clubmed.com/doc", target: "_blank" }
    ];
    const navigation = getPortalNavigation(items, "/custom/doc/");

    expect(navigation[1]).toMatchObject({ href: "/custom/doc/", target: undefined, "aria-current": "page" });
    expect(navigation[0]).not.toHaveProperty("aria-current");
  });

  it("preserves external destinations and their new-tab policy", () => {
    const [item] = getPortalNavigation(
      [
        {
          id: "status",
          label: "Status",
          icon: "CheckOutlined",
          href: "https://status.api.clubmed/",
          target: "_blank",
          rel: "noopener noreferrer"
        }
      ],
      "/doc/"
    );

    expect(item).toMatchObject({ href: "https://status.api.clubmed/", target: "_blank", rel: "noopener noreferrer" });
  });
});
