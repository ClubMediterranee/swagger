import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import type { NavItem } from "../types/NavItem";
import { DesktopMenu, DesktopMenuItem, DesktopMenuItemColumn, DesktopMenuLink, DesktopMenuSection } from "./DesktopMenu.js";

const links = [
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
];

const sections = [
  {
    label: "Our products",
    url: "/s",
    links
  }
];

const items = [
  {
    label: "Discover",
    url: "/l/discover-club-med",
    columns: [
      {
        sections
      }
    ]
  }
] satisfies NavItem[];

describe("<DesktopMenu />", () => {
  it("renders DesktopMenu", () => {
    const { container } = render(
      <DesktopMenu>
        {(props) => (
          <DesktopMenuItem item={items[0]} index={0} {...props}>
            item
          </DesktopMenuItem>
        )}
      </DesktopMenu>
    );
    expect(container).toMatchSnapshot("DesktopMenu");
  });

  describe("renders DesktopMenuItem", () => {
    it("opens and closes the menu", async () => {
      render(
        <DesktopMenu>
          {(props) => (
            <DesktopMenuItem item={items[0]} index={0} {...props}>
              item
            </DesktopMenuItem>
          )}
        </DesktopMenu>
      );

      expect(screen.getByRole("menu").parentElement?.getAttribute("class")).toContain("hidden");

      const trigger = screen.getByRole("link", { name: "Discover" });

      fireEvent.mouseEnter(trigger);

      await waitFor(() => {
        expect(screen.getByRole("menu").parentElement?.getAttribute("class")).not.toContain("hidden");
      });

      fireEvent.mouseLeave(trigger);

      await waitFor(() => {
        expect(screen.getByRole("menu").parentElement?.getAttribute("class")).toContain("hidden");
      });
    });

    it("calls onClick callback on opening", () => {
      const onClick = vi.fn();

      render(
        <DesktopMenu>
          {(props) => (
            <DesktopMenuItem item={items[0]} index={0} {...props} onClick={onClick}>
              item
            </DesktopMenuItem>
          )}
        </DesktopMenu>
      );

      const trigger = screen.getByRole("link", { name: "Discover" });

      fireEvent.click(trigger);

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("renders a link without href when url is empty string", () => {
      render(
        <DesktopMenu>
          {(props) => (
            <DesktopMenuItem item={{ ...items[0], url: "" }} index={0} {...props}>
              item
            </DesktopMenuItem>
          )}
        </DesktopMenu>
      );

      const MenuItem = screen.getByRole("link", { name: "Discover" });

      expect(MenuItem.getAttribute("href")).toBe("#");
    });
  });

  it("renders DesktopMenuItemColumn", () => {
    const { container } = render(
      <DesktopMenu>
        {(props) => (
          <DesktopMenuItem item={items[0]} index={0} {...props}>
            <DesktopMenuItemColumn>Column</DesktopMenuItemColumn>
          </DesktopMenuItem>
        )}
      </DesktopMenu>
    );
    expect(container).toMatchSnapshot("DesktopMenuItemColumn");
  });

  describe("<DesktopMenuItemSection />", () => {
    it("renders DesktopMenuItemSection & DesktopMenuItemLink", () => {
      const { container } = render(
        <DesktopMenu>
          {(props) => (
            <DesktopMenuItem item={items[0]} index={0} {...props}>
              <DesktopMenuItemColumn>
                <DesktopMenuSection {...items[0].columns[0].sections[0]}>
                  <DesktopMenuLink link={links[0]} />
                </DesktopMenuSection>
              </DesktopMenuItemColumn>
            </DesktopMenuItem>
          )}
        </DesktopMenu>
      );
      expect(container).toMatchSnapshot("DesktopMenuItemColumn");
    });

    it("renders DesktopMenuItemSection without href when url is empty string", () => {
      render(
        <DesktopMenu>
          {(props) => (
            <DesktopMenuItem item={items[0]} index={0} {...props}>
              <DesktopMenuItemColumn>
                <DesktopMenuSection {...{ ...items[0].columns[0].sections[0], url: "" }}>
                  <DesktopMenuLink link={links[0]} />
                </DesktopMenuSection>
              </DesktopMenuItemColumn>
            </DesktopMenuItem>
          )}
        </DesktopMenu>
      );

      const trigger = screen.getByText("Our products");

      expect(trigger).not.toHaveAttribute("href");
    });

    it("calls onClick callback when clicked", () => {
      const onClick = vi.fn();

      render(
        <DesktopMenu>
          {(props) => (
            <DesktopMenuItem item={items[0]} index={0} {...props}>
              <DesktopMenuItemColumn>
                <DesktopMenuSection onClick={onClick} {...items[0].columns[0].sections[0]}>
                  <DesktopMenuLink link={links[0]} />
                </DesktopMenuSection>
              </DesktopMenuItemColumn>
            </DesktopMenuItem>
          )}
        </DesktopMenu>
      );

      const trigger = screen.getByRole("menuitem", { name: "Our products" });

      fireEvent.click(trigger);

      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("<DesktopMenuItemLink />", () => {
    it("renders without href when url is empty string", () => {
      const { container } = render(
        <DesktopMenu>
          {(props) => (
            <DesktopMenuItem item={items[0]} index={0} {...props}>
              <DesktopMenuItemColumn>
                <DesktopMenuSection {...items[0].columns[0].sections[0]}>
                  <DesktopMenuLink link={{ ...links[0], url: "" }} />
                </DesktopMenuSection>
              </DesktopMenuItemColumn>
            </DesktopMenuItem>
          )}
        </DesktopMenu>
      );

      expect(container).toMatchSnapshot("DesktopMenuItemLink with empty url");
    });

    it("calls onClick callback when clicked", () => {
      const onClick = vi.fn();

      render(
        <DesktopMenu>
          {(props) => (
            <DesktopMenuItem item={items[0]} index={0} {...props}>
              <DesktopMenuItemColumn>
                <DesktopMenuSection {...items[0].columns[0].sections[0]}>
                  <DesktopMenuLink link={links[0]} onClick={onClick} />
                </DesktopMenuSection>
              </DesktopMenuItemColumn>
            </DesktopMenuItem>
          )}
        </DesktopMenu>
      );

      const trigger = screen.getByRole("menuitem", { name: "All inclusive sun holidays" });

      fireEvent.click(trigger);

      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });
});
