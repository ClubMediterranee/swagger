import { DeviceProvider } from "@clubmed/trident-ui/contexts/Device";
import { Meta, StoryFn } from "@storybook/react";

import { Footer } from "./Footer";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Footer",
  component: Footer,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  parameters: { layout: "fullscreen" },
  tags: ["no-tests"]
} as Meta<typeof Footer>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof Footer> = (args) => {
  return (
    <div style={{ width: "100vw", maxWidth: "100%" }} dir="ltr">
      <DeviceProvider device="mobile">
        <Footer {...args} />
      </DeviceProvider>
    </div>
  );
};

export const Base = Template.bind({});
Base.args = {
  contact: {
    phoneCost: "Toll free number",
    phoneNumber: "+1 (88) 932-2582"
  },
  socialNetworks: [
    { label: "Social Piaf", href: "#social-bird", icon: "Twitter" },
    { label: "Social Neurchi", href: "#social-neurchi", icon: "Pinterest" },
    { label: "Social Food", href: "#social-food", icon: "Instagram" }
  ],
  corporateLinks: [
    {
      label: "Link 1",
      href: "#link-one",
      description:
        "World class service in dream locations. With everything you expect from an all-inclusive and much more. Club Med organizes events for all types of groups. "
    },
    {
      label: "Link 2",
      href: "#link-two",
      description:
        "World class service in dream locations. With everything you expect from an all-inclusive and much more. Club Med organizes events for all types of groups. "
    },
    {
      label: "Link 3",
      href: "#link-three",
      description:
        "World class service in dream locations. With everything you expect from an all-inclusive and much more. Club Med organizes events for all types of groups. "
    }
  ],
  columns: [
    {
      label: "Usefull Links",
      links: [
        { label: "Usefull Link 1", href: "#userfull-one" },
        { label: "Usefull Link 2", href: "#userfull-two" },
        { label: "Usefull Link 3", href: "#userfull-three" },
        { label: "Usefull Link 4", href: "#userfull-four" },
        { label: "Usefull Link 5", href: "#userfull-five" },
        { label: "Usefull Link 6", href: "#userfull-six" }
      ]
    },
    {
      label: "Resources Links",
      links: [
        { label: "Resource Link 1", href: "#resource-one" },
        { label: "Resource Link 2", href: "#resource-two" },
        { label: "Resource Link 3", href: "#resource-three" }
      ]
    },
    {
      label: "Services Links",
      links: [
        { label: "Service Link 1", href: "#service-one" },
        { label: "Service Link 2", href: "#service-two" },
        { label: "Service Link 3", href: "#service-three" },
        { label: "Service Link 4", href: "#service-four" }
      ]
    }
  ],
  legalLinks: [
    { label: "Terms and conditions", href: "#legal-one" },
    { label: "Privacy policy", href: "#legal-two" },
    { label: "Cookies", href: "#legal-three" },
    { label: "Accessibility", href: "#legal-four" },
    { label: "Contact us", href: "#legal-five" }
  ],
  reviews: {
    hasGoogle: true,
    hasTripAdvisor: true,
    label: "Travelers reviews brought to you by"
  },
  cookiesConsentLabel: "consent cookie"
};
