import { fireEvent, render, screen } from "@testing-library/react";
import type { FunctionComponent, PropsWithChildren } from "react";
import { describe, expect, it, vi } from "vitest";

import { Devices, deviceWrapper } from "../../../tests/helpers/device";
import type { NavItem } from "../types/NavItem";
import { MobileMenu, MobileMenuItem, MobileMenuItems, MobileMenuLink, MobileMenuSection } from "./MobileMenu";

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

const createWrapper = (device: Devices) => {
  const Wrapper: FunctionComponent<PropsWithChildren> = ({ children }) => {
    const DeviceProvider = deviceWrapper(device);

    return <DeviceProvider>{children}</DeviceProvider>;
  };

  return Wrapper;
};

describe("<MobileMenu />", () => {
  it("opens the menu on click", async () => {
    render(
      <MobileMenu openMenu="open menu">
        {(isOpen) => (
          <MobileMenuItems isOpen={isOpen}>
            <MobileMenuItem item={items[0]}>
              <MobileMenuSection section={sections[0]}>
                <MobileMenuLink link={sections[0].links[0]} />
              </MobileMenuSection>
            </MobileMenuItem>
          </MobileMenuItems>
        )}
      </MobileMenu>,
      {
        wrapper: createWrapper(Devices.all)
      }
    );

    const trigger = screen.getByRole("button", { name: "open menu" });
    fireEvent.click(trigger);

    expect(screen.getByRole("menu", { name: "Mobile menu" })).toBeInTheDocument();
  });

  it("calls onOpenMenu callback when clicked", async () => {
    const onOpenMenu = vi.fn();
    render(
      <MobileMenu openMenu="open menu" onOpenMenu={onOpenMenu}>
        {(isOpen) => <MobileMenuItems isOpen={isOpen}>items</MobileMenuItems>}
      </MobileMenu>,
      {
        wrapper: createWrapper(Devices.all)
      }
    );

    const trigger = screen.getByRole("button", { name: "open menu" });
    fireEvent.click(trigger);

    expect(onOpenMenu).toHaveBeenCalledTimes(1);
  });

  it("calls collapsable onClick callback when clicked", async () => {
    const onClick = vi.fn();
    render(
      <MobileMenu openMenu="open menu">
        {() => (
          <MobileMenuItems isOpen={true}>
            <MobileMenuItem item={items[0]}>
              <MobileMenuSection section={sections[0]} onClick={onClick}>
                <MobileMenuLink link={sections[0].links[0]} />
              </MobileMenuSection>
            </MobileMenuItem>
          </MobileMenuItems>
        )}
      </MobileMenu>,
      {
        wrapper: createWrapper(Devices.all)
      }
    );
    const collapsable = screen.getByRole("button", { name: sections[0].label });
    fireEvent.click(collapsable);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  describe("<MobileMenuLink />", () => {
    it("renders without href when url is empty string", () => {
      render(
        <MobileMenu openMenu="open menu">
          {() => (
            <MobileMenuItems isOpen={true}>
              <MobileMenuItem item={items[0]}>
                <MobileMenuSection section={sections[0]}>
                  <MobileMenuLink link={{ label: "Link", url: "" }} />
                </MobileMenuSection>
              </MobileMenuItem>
            </MobileMenuItems>
          )}
        </MobileMenu>,
        {
          wrapper: createWrapper(Devices.all)
        }
      );

      const link = screen.getByText("Link");

      expect(link).not.toHaveAttribute("href");
    });

    it("calls onClick callback when clicked", async () => {
      const onClick = vi.fn();
      render(
        <MobileMenu openMenu="open menu">
          {() => (
            <MobileMenuItems isOpen={true}>
              <MobileMenuItem item={items[0]}>
                <MobileMenuSection section={sections[0]}>
                  <MobileMenuLink link={sections[0].links[0]} onClick={onClick} />
                </MobileMenuSection>
              </MobileMenuItem>
            </MobileMenuItems>
          )}
        </MobileMenu>,
        {
          wrapper: createWrapper(Devices.all)
        }
      );

      const link = screen.getByRole("menuitem", { name: "All inclusive sun holidays" });

      fireEvent.click(link);

      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });
});
