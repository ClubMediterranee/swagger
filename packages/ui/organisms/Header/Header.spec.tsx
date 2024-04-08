import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComponentProps, FunctionComponent, PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";

import { Devices, deviceWrapper } from "../../tests/helpers/device";
import { Header } from "./Header";

const createWrapper = (device: Devices) => {
  const Wrapper: FunctionComponent<PropsWithChildren<any>> = ({ children }) => {
    const DeviceProvider = deviceWrapper(device);

    return (
      <BrowserRouter>
        <DeviceProvider>{children}</DeviceProvider>
      </BrowserRouter>
    );
  };

  return Wrapper;
};

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
  ]
};

describe("<Header />", () => {
  it("renders a Header", () => {
    render(<Header {...(props as ComponentProps<typeof Header>)} />, {
      wrapper: createWrapper(Devices.desktop)
    });
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  describe("when it has children", () => {
    it("renders the children", () => {
      render(
        <Header {...(props as ComponentProps<typeof Header>)}>
          <div>child</div>
        </Header>,
        { wrapper: createWrapper(Devices.desktop) }
      );
      expect(screen.getByText("child")).toBeInTheDocument();
    });
  });

  describe("navigation", () => {
    describe("opening the menu", () => {
      describe("on desktop", () => {
        it("opens the menu on focus and closes it on blur", async () => {
          render(<Header {...(props as ComponentProps<typeof Header>)} />, {
            wrapper: createWrapper(Devices.desktop)
          });

          const trigger = screen.getByRole("link", { name: "Discover" });
          act(() => {
            trigger.focus();
          });
          await waitFor(
            () => {
              expect(screen.getByRole("menu", { name: "desktop-menuItem" })).not.toHaveClass("hidden");
            },
            { timeout: 100 }
          );

          act(() => {
            trigger.blur();
          });
        });
      });
    });

    describe("on mobile", () => {
      it("opens the menu on click and closes it on click", async () => {
        render(<Header {...(props as ComponentProps<typeof Header>)} />, {
          wrapper: createWrapper(Devices.mobile)
        });

        const trigger = screen.getByRole("button", { name: "open menu" });
        await act(() => userEvent.click(trigger));
        await waitFor(
          () => {
            expect(screen.getByRole("menu", { name: "mobile-menu" })).toBeInTheDocument();
          },
          { timeout: 100 }
        );
      });
    });
  });
});
