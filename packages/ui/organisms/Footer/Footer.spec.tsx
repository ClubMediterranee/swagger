import {act, render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event/";
import {ComponentProps} from "react";

import {Footer} from "./Footer";
import {Devices, deviceWrapper} from "../../tests/helpers/device";

const footerProps: ComponentProps<typeof Footer> = {
  contact: {
    phoneCost: "Toll free number",
    phoneNumber: "+1 (88) 932-2582"
  },
  columns: [
    {
      label: "Column 1",
      links: [
        {
          label: "Column Link 1",
          href: "https://www.google.com"
        }
      ]
    }
  ],
  socialNetworks: [
    {
      label: "Facebook",
      href: "https://www.facebook.com",
      icon: "Facebook"
    }
  ],
  corporateLinks: [
    {
      label: "Main Link 1",
      description: "Description 1",
      href: "https://www.google.com"
    }
  ],
  legalLinks: [
    {
      label: "Legal Link 1",
      href: "https://www.google.com"
    }
  ],
  newsletter: {
    label: "Sign up to our newsletter",
    cta: {
      label: "Sign up",
      href: "/sign-up"
    }
  },
  reviews: {
    hasGoogle: true,
    hasTripAdvisor: true,
    label: "Travelers reviews brought to you by"
  },
  cookiesConsentLabel: "consent cookie"
};

describe("<Footer />", () => {
  let wrapper: ReturnType<typeof deviceWrapper>;

  beforeEach(() => {
    wrapper = deviceWrapper(Devices.mobile);
  });

  it("renders a Footer", () => {
    render(<Footer {...footerProps} />, {wrapper});
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  describe("on mobile", () => {
    it("opens the collapse when clicking on its title", () => {
      render(<Footer {...footerProps} />, {wrapper});

      act(() => {
        userEvent.click(screen.getByRole("button", {name: "Column 1"}));
      });

      expect(screen.getByRole("presentation")).not.toHaveClass("h-0");
    });
  });
});
