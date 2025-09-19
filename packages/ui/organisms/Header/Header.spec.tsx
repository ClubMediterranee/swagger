import { render, screen } from "@testing-library/react";
import type { ComponentProps } from "react";
import { describe, expect, it } from "vitest";

import { Header } from "./Header.js";

const LanguagesMobile = () => (
  <div
    data-testid="languages-for-mobile"
    className="mx-8 flex items-center justify-end gap-4 border-b border-pearl p-20 font-sans text-b3 font-semibold"
    data-name="Languages"
  >
    <a className="decoration-none link-container cursor-pointer text-b3 text-inherit capitalize" data-name="Link" href="/?locale=fr-CH">
      <span className="link-underline">f</span>
      <span className="hoverable link-underline">
        r<span className="inline-block"></span>
      </span>
    </a>
    <span>|</span>
    <a className="decoration-none link-container cursor-pointer text-b3 text-inherit capitalize" data-name="Link" href="/?locale=de-CH">
      <span className="link-underline">d</span>
      <span className="hoverable link-underline">
        e<span className="inline-block"></span>
      </span>
    </a>
    <span>|</span>
    <span className="capitalize">en</span>
  </div>
);

const props = {
  homepageUrl: "/",
  openMenu: "open menu",
  items: [
    {
      label: "Discover",
      url: "/l/discover-club-med",
      columns: [
        {
          sections: [
            {
              title: "Our products",
              url: "/s",
              links: [
                {
                  label: "All inclusive sun holidays",
                  url: "/o/all-inclusive-sun-holidays"
                },
                {
                  label: "All Inclusive ski holidays",
                  url: "/o/all-inclusive-ski-holidays"
                },
                {
                  label: "Ski comparator",
                  url: "/l/ski-comparator"
                },
                {
                  label: "Organized travel tours",
                  url: "/l/organized-travel-tours"
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  topBurgerMenuContent: <LanguagesMobile />
};

describe("<Header />", () => {
  it("renders the Header", () => {
    render(<Header {...(props as ComponentProps<typeof Header>)} />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  describe("when it has children", () => {
    it("renders the children", () => {
      render(
        <Header {...(props as ComponentProps<typeof Header>)}>
          <div>child</div>
        </Header>
      );
      expect(screen.getByText("child")).toBeInTheDocument();
    });
  });
});
