import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComponentProps } from "react";

import { Devices, deviceWrapper } from "../../tests/helpers/device";
import { Footer } from "./Footer";

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
    render(<Footer {...footerProps} />, { wrapper });
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Facebook" })).not.toHaveLength(0);
  });

  it("expands and collapses a footer column", async () => {
    const user = userEvent.setup();
    render(<Footer {...footerProps} />, { wrapper });
    const column = screen.getByRole("button", { name: "Column 1" });

    expect(column).toHaveAttribute("aria-expanded", "false");
    await user.click(column);
    expect(column).toHaveAttribute("aria-expanded", "true");
    await user.click(column);
    expect(column).toHaveAttribute("aria-expanded", "false");
  });
});
