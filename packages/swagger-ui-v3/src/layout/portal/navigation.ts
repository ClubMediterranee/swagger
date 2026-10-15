import type { SidebarLayoutProps } from "@clubmed/trident-ui/ui/SidebarLayout";

export type PortalNavigationItem = SidebarLayoutProps["items"][number] & { id: string };

export const PORTAL_URL = "https://portal.api.clubmed";
export const OPENAPI_ID = "b09963ba-bb79-4608-b1a4-39ea2ab11d31";

// Production CMS navigation snapshot, verified 2026-10-14.
// The host can supply portalNavigation in SwaggerUIConfiguration to keep this in sync with the CMS.
export const portalNavigation: PortalNavigationItem[] = [
  { id: "3e73d493-616d-4f55-aa3f-88492b0ad25b", label: "Home", icon: "Home", href: `${PORTAL_URL}/en-US/` },
  {
    id: "a5279a82-94f5-4f33-9cdc-7145c93f5fb8",
    label: "Discover",
    icon: "WithView",
    href: `${PORTAL_URL}/en-US/pages/discover`,
    items: [
      { label: "ClubMed MCP", href: `${PORTAL_URL}/en-US/pages/mcp-agents` },
      { label: "Webhooks", href: `${PORTAL_URL}/en-US/pages/webhooks` },
      { label: "OpenID Connect", href: `${PORTAL_URL}/en-US/pages/oidc` }
    ]
  },
  { id: "cb9bc37d-65f2-4cf9-9d32-a078cc4f2705", label: "Scenarios", icon: "DocumentChecklist", href: `${PORTAL_URL}/en-US/scenarios` },
  {
    id: "34469189-3c57-4d97-8c51-d9e042b6b7a6",
    label: "Payment SDK",
    icon: "PaymentPlan",
    href: `${PORTAL_URL}/en-US/pages/caps`,
    items: [
      { label: "Quick start", href: `${PORTAL_URL}/en-US/pages/caps-quick-start` },
      { label: "Use the Redirect Mode", href: `${PORTAL_URL}/en-US/pages/caps-use-redirect-mode` },
      { label: "Use the SDK mode", href: `${PORTAL_URL}/en-US/pages/caps-use-sdk-mode` }
    ]
  },
  { id: "5966f4ae-51b4-4cc7-b41b-4737d88c095a", label: "Release notes", icon: "Edit", href: `${PORTAL_URL}/en-US/releases` },
  {
    id: "3f112780-6f3f-46ea-a974-8813493d1f3a",
    label: "Migration notes",
    icon: "DocumentInsurrance",
    href: `${PORTAL_URL}/en-US/migration-notes`
  },
  {
    id: "49625b57-ff79-4b39-9212-f1c1c2d4d922",
    label: "Status page",
    icon: "CheckOutlined",
    href: "https://status.api.clubmed/",
    target: "_blank",
    rel: "noopener noreferrer"
  },
  { id: OPENAPI_ID, label: "OpenAPI", icon: "DocumentUserDetails", href: "https://api.clubmed.com/doc" },
  {
    id: "229e1207-0780-4fb2-9117-e2a2693d66c0",
    label: "Digital Accessibility",
    icon: "Visible",
    href: `${PORTAL_URL}/en-US/pages/digital-accessibility-api-portal`
  }
];

export function getPortalNavigation(items: PortalNavigationItem[], swaggerHref: string): PortalNavigationItem[] {
  return items.map((item) => ({
    ...item,
    ...("href" in item ? { href: new URL(item.href, PORTAL_URL).href } : {}),
    items: item.items?.map((child) => ({ ...child, href: new URL(child.href, PORTAL_URL).href })),
    ...(item.id === OPENAPI_ID ? { href: swaggerHref, target: undefined, "aria-current": "page" as const } : {})
  }));
}
