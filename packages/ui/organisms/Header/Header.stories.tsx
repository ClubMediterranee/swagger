import { Icon } from "@clubmed/trident-icons";
import { DeviceProvider } from "@clubmed/trident-ui/contexts/Devices/Device";
import { Button } from "@clubmed/trident-ui/molecules/Buttons/v2/Button";
import { Meta, StoryObj } from "@storybook/react";

import { DesktopMenu, DesktopMenuItem, DesktopMenuItemColumn, DesktopMenuLink, DesktopMenuSection } from "./Desktop/DesktopMenu.js";
import { Header } from "./Header.js";
import { MobileMenu, MobileMenuItem, MobileMenuItems, MobileMenuLink, MobileMenuSection } from "./Mobile/MobileMenu.js";
import type { NavItem } from "./types/NavItem.js";

interface RightSectionProps {
  withButton?: boolean;
  withLocales?: boolean;
}

const RightSection = ({ withButton = false, withLocales = false }: RightSectionProps) => {
  return (
    <div className="flex gap-x-8">
      {withButton && (
        <Button component="a" className="hidden md:flex" color="black" href="/">
          Button
        </Button>
      )}
      <Button component="a" aria-label="Account" color="black" href="/account" icon="PeopleSingle" theme="outline" variant="circle" />
      {items && (
        <MobileMenu openMenu="open menu">
          {(isOpen) => (
            <MobileMenuItems isOpen={isOpen}>
              {withLocales && (
                <Locales className="mx-8 flex items-center justify-end gap-4 border-b border-pearl p-20 font-sans text-b3 font-semibold" />
              )}
              {items.map((item) => (
                <MobileMenuItem key={item.url} item={item}>
                  {item.columns.map((column) => {
                    return column.sections.map((section) => (
                      <MobileMenuSection key={section.label} section={section}>
                        {section.links.map((link) => (
                          <MobileMenuLink key={link.label} link={link} />
                        ))}
                      </MobileMenuSection>
                    ));
                  })}
                </MobileMenuItem>
              ))}
            </MobileMenuItems>
          )}
        </MobileMenu>
      )}
      <div className="hidden md:flex">
        {withLocales && <Locales className="mx-8 flex items-center gap-4 font-sans text-b3 font-semibold" />}
      </div>
    </div>
  );
};

export default {
  title: "Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "The Header component takes children as a render prop, and its only prop."
      }
    }
  },
  args: {
    children: (
      <>
        <a href={"/"} title="Club Med Homepage relative">
          <div className="w-[30px] md:w-[160px] ">
            <div className={"flex flex-col"}>
              <Icon name="ClubMed" width="100%" aspectRatio className="hidden md:block text-ultramarine" />
              <Icon name="Trident" width="100%" aspectRatio className="ml-8 md:hidden text-ultramarine" />
            </div>
          </div>
        </a>
        <DesktopMenu>
          {({ activeItem, resetMenu, setMenu }) => {
            return items?.map((item, index) => (
              <DesktopMenuItem key={item.url} index={index} item={item} activeItem={activeItem} setMenu={setMenu} resetMenu={resetMenu}>
                {item.columns.map((column, columnIndex) => {
                  return (
                    <DesktopMenuItemColumn key={columnIndex}>
                      {column.sections.map(({ links, label, url }) => {
                        return (
                          <DesktopMenuSection key={label} label={label} url={url} links={links}>
                            {links.map((link) => {
                              return <DesktopMenuLink key={link.label} link={link} />;
                            })}
                          </DesktopMenuSection>
                        );
                      })}
                    </DesktopMenuItemColumn>
                  );
                })}
              </DesktopMenuItem>
            ));
          }}
        </DesktopMenu>
        <RightSection />
      </>
    )
  }
} satisfies Meta<typeof Header>;

export const Base: StoryObj<typeof Header> = {
  render: (args) => {
    return (
      <DeviceProvider device="all">
        <div>
          <Header {...args} />
          <div className="h-screen w-full bg-red" />
        </div>
      </DeviceProvider>
    );
  }
};

export const WithButton: StoryObj<typeof Header> = {
  render: (args) => {
    return (
      <DeviceProvider device="all">
        <div>
          <Header {...args} />
          <div className="h-screen w-full bg-red" />
        </div>
      </DeviceProvider>
    );
  }
};

WithButton.args = {
  children: (
    <>
      <a href={"/"} title="Club Med Homepage relative">
        <div className="w-[30px] md:w-[160px] ">
          <div className={"flex flex-col"}>
            <Icon name="ClubMed" width="100%" aspectRatio className="hidden md:block text-ultramarine" />
            <Icon name="Trident" width="100%" aspectRatio className="ml-8 md:hidden text-ultramarine" />
          </div>
        </div>
      </a>
      <DesktopMenu>
        {({ activeItem, resetMenu, setMenu }) => {
          return items?.map((item, index) => (
            <DesktopMenuItem key={item.url} index={index} item={item} activeItem={activeItem} setMenu={setMenu} resetMenu={resetMenu}>
              {item.columns.map((column, columnIndex) => {
                return (
                  <DesktopMenuItemColumn key={columnIndex}>
                    {column.sections.map(({ links, label, url }) => {
                      return (
                        <DesktopMenuSection key={label} label={label} url={url} links={links}>
                          {links.map((link) => {
                            return <DesktopMenuLink key={link.label} link={link} />;
                          })}
                        </DesktopMenuSection>
                      );
                    })}
                  </DesktopMenuItemColumn>
                );
              })}
            </DesktopMenuItem>
          ));
        }}
      </DesktopMenu>
      <RightSection withButton />
    </>
  )
};

export const WithLocales: StoryObj<typeof Header> = {
  render: (args) => {
    return (
      <DeviceProvider device="all">
        <div>
          <Header {...args} />
          <div className="h-screen w-full bg-red" />
        </div>
      </DeviceProvider>
    );
  }
};

WithLocales.args = {
  children: (
    <>
      <a href={"/"} title="Club Med Homepage relative">
        <div className="w-[30px] md:w-[160px] ">
          <div className={"flex flex-col"}>
            <Icon name="ClubMed" width="100%" aspectRatio className="hidden md:block text-ultramarine" />
            <Icon name="Trident" width="100%" aspectRatio className="ml-8 md:hidden text-ultramarine" />
          </div>
        </div>
      </a>
      <DesktopMenu>
        {({ activeItem, resetMenu, setMenu }) => {
          return items?.map((item, index) => (
            <DesktopMenuItem key={item.url} index={index} item={item} activeItem={activeItem} setMenu={setMenu} resetMenu={resetMenu}>
              {item.columns.map((column, columnIndex) => {
                return (
                  <DesktopMenuItemColumn key={columnIndex}>
                    {column.sections.map(({ links, label, url }) => {
                      return (
                        <DesktopMenuSection key={label} label={label} url={url} links={links}>
                          {links.map((link) => {
                            return <DesktopMenuLink key={link.label} link={link} />;
                          })}
                        </DesktopMenuSection>
                      );
                    })}
                  </DesktopMenuItemColumn>
                );
              })}
            </DesktopMenuItem>
          ));
        }}
      </DesktopMenu>
      <RightSection withLocales />
    </>
  )
};

export const WithButtonAndLocales: StoryObj<typeof Header> = {
  render: (args) => {
    return (
      <DeviceProvider device="all">
        <div>
          <Header {...args} />
          <div className="h-screen w-full bg-red" />
        </div>
      </DeviceProvider>
    );
  }
};

WithButtonAndLocales.args = {
  children: (
    <>
      <a href={"/"} title="Club Med Homepage relative">
        <div className="w-[30px] md:w-[160px] ">
          <div className={"flex flex-col"}>
            <Icon name="ClubMed" width="100%" aspectRatio className="hidden md:block text-ultramarine" />
            <Icon name="Trident" width="100%" aspectRatio className="ml-8 md:hidden text-ultramarine" />
          </div>
        </div>
      </a>
      <DesktopMenu>
        {({ activeItem, resetMenu, setMenu }) => {
          return items?.map((item, index) => (
            <DesktopMenuItem key={item.url} index={index} item={item} activeItem={activeItem} setMenu={setMenu} resetMenu={resetMenu}>
              {item.columns.map((column, columnIndex) => {
                return (
                  <DesktopMenuItemColumn key={columnIndex}>
                    {column.sections.map(({ links, label, url }) => {
                      return (
                        <DesktopMenuSection key={label} label={label} url={url} links={links}>
                          {links.map((link) => {
                            return <DesktopMenuLink key={link.label} link={link} />;
                          })}
                        </DesktopMenuSection>
                      );
                    })}
                  </DesktopMenuItemColumn>
                );
              })}
            </DesktopMenuItem>
          ));
        }}
      </DesktopMenu>
      <RightSection withButton withLocales />
    </>
  )
};

const Locales = ({ className }: { className: string }) => (
  <div className={className} data-name="Languages">
    <a className="decoration-none link-container cursor-pointer text-b3 text-inherit capitalize" data-name="Link" href="/?locale=fr-BE">
      <span className="link-underline">fr</span>
    </a>
    <span>|</span>
    <span className="capitalize">nl</span>
  </div>
);

const items = [
  {
    label: "Discover",
    url: "/l/discover-club-med",
    columns: [
      {
        sections: [
          {
            label: "Our products",
            url: "/",
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
      },
      {
        sections: [
          {
            label: "All Inclusive by Club Med",
            url: "/o",
            links: [
              {
                label: "Discover the All Inclusive",
                url: "/o"
              },
              {
                label: "Sports at Club Med",
                url: "/o"
              },
              {
                label: "Childcares",
                url: "/o"
              }
            ]
          },
          {
            label: "Club Med Experiences",
            url: "/o",
            links: [
              {
                label: "Familly holidays",
                url: "/o"
              },
              {
                label: "Short stays",
                url: "/o"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    label: "Destinations",
    url: "/d",
    columns: [
      {
        sections: [
          {
            label: "Europe & Mediterranea",
            url: "/d/europe",
            links: [
              {
                label: "France",
                url: "/d/europe/france"
              },
              {
                label: "Greece",
                url: "/d/europe/greece"
              },
              {
                label: "Italy",
                url: "/d/europe/italy"
              },
              {
                label: "Portugal",
                url: "/d/europe/portugal"
              },
              {
                label: "Sicily",
                url: "/d/europe/sicily"
              },
              {
                label: "Spain",
                url: "/d/europe/spain"
              },
              {
                label: "Turkey",
                url: "/d/europe/turkey"
              }
            ]
          },
          {
            label: "Alps",
            url: "/d/alps",
            links: [
              {
                label: "France",
                url: "/d/europe/france"
              },
              {
                label: "Italy",
                url: "/d/europe/italy"
              },
              {
                label: "Switzerland",
                url: "/d/europe/switzerland"
              },
              {
                label: "Alps in Summer",
                url: "/d/europe/alps"
              }
            ]
          }
        ]
      },
      {
        sections: [
          {
            label: "Europe & Mediterranea",
            url: "/d/europe",
            links: [
              {
                label: "France",
                url: "/d/europe/france"
              },
              {
                label: "Greece",
                url: "/d/europe/greece"
              },
              {
                label: "Italy",
                url: "/d/europe/italy"
              },
              {
                label: "Portugal",
                url: "/d/europe/portugal"
              },
              {
                label: "Sicily",
                url: "/d/europe/sicily"
              },
              {
                label: "Spain",
                url: "/d/europe/spain"
              },
              {
                label: "Turkey",
                url: "/d/europe/turkey"
              }
            ]
          },
          {
            label: "Alps",
            url: "/d/alps",
            links: [
              {
                label: "France",
                url: "/d/europe/france"
              },
              {
                label: "Italy",
                url: "/d/europe/italy"
              },
              {
                label: "Switzerland",
                url: "/d/europe/switzerland"
              },
              {
                label: "Alps in Summer",
                url: "/d/europe/alps"
              }
            ]
          }
        ]
      },
      {
        sections: [
          {
            label: "Europe & Mediterranea",
            url: "/d/europe",
            links: [
              {
                label: "France",
                url: "/d/europe/france"
              },
              {
                label: "Greece",
                url: "/d/europe/greece"
              },
              {
                label: "Italy",
                url: "/d/europe/italy"
              },
              {
                label: "Portugal",
                url: "/d/europe/portugal"
              },
              {
                label: "Sicily",
                url: "/d/europe/sicily"
              },
              {
                label: "Spain",
                url: "/d/europe/spain"
              },
              {
                label: "Turkey",
                url: "/d/europe/turkey"
              }
            ]
          },
          {
            label: "Alps",
            url: "/d/alps",
            links: [
              {
                label: "France",
                url: "/d/europe/france"
              },
              {
                label: "Italy",
                url: "/d/europe/italy"
              },
              {
                label: "Switzerland",
                url: "/d/europe/switzerland"
              },
              {
                label: "Alps in Summer",
                url: "/d/europe/alps"
              }
            ]
          }
        ]
      },
      {
        sections: [
          {
            label: "Europe & Mediterranea",
            url: "/d/europe",
            links: [
              {
                label: "France",
                url: "/d/europe/france"
              },
              {
                label: "Greece",
                url: "/d/europe/greece"
              },
              {
                label: "Italy",
                url: "/d/europe/italy"
              },
              {
                label: "Portugal",
                url: "/d/europe/portugal"
              },
              {
                label: "Sicily",
                url: "/d/europe/sicily"
              },
              {
                label: "Spain",
                url: "/d/europe/spain"
              },
              {
                label: "Turkey",
                url: "/d/europe/turkey"
              }
            ]
          },
          {
            label: "Alps",
            url: "/d/alps",
            links: [
              {
                label: "France",
                url: "/d/europe/france"
              },
              {
                label: "Italy",
                url: "/d/europe/italy"
              },
              {
                label: "Switzerland",
                url: "/d/europe/switzerland"
              },
              {
                label: "Alps in Summer",
                url: "/d/europe/alps"
              }
            ]
          }
        ]
      },
      {
        sections: [
          {
            label: "Cruises destinations",
            url: "/o",
            links: [
              {
                label: "link",
                url: "/"
              }
            ]
          },
          {
            label: "Discovery travel tours",
            url: "/o",
            links: [
              {
                label: "link",
                url: "/"
              }
            ]
          },
          {
            label: "New resorts",
            url: "/o",
            links: [
              {
                label: "link",
                url: "/"
              }
            ]
          },
          {
            label: "Best sellers",
            url: "/o",
            links: [
              {
                label: "link",
                url: "/"
              }
            ]
          },
          {
            label: "Title",
            url: "/",
            links: [
              {
                label: "Travel conditions",
                url: "/l/travel-conditions"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    label: "Luxury range",
    url: "/l/club-med-exclusive-collection",
    columns: [
      {
        sections: [
          {
            label: "Title",
            url: "/",
            links: [
              {
                label: "Exclusive Collection range",
                url: "/o"
              }
            ]
          },
          {
            label: "Title",
            url: "/",
            links: [
              {
                label: "Club Med 2 cruises",
                url: "/o"
              }
            ]
          },
          {
            label: "Title",
            url: "/",
            links: [
              {
                label: "Exclusive Collection resorts",
                url: "/o"
              }
            ]
          },
          {
            label: "Title",
            url: "/",
            links: [
              {
                label: "Exclusive Collection spaces",
                url: "/o"
              }
            ]
          },
          {
            label: "Title",
            url: "/",
            links: [
              {
                label: "Villas & Châlets",
                url: "/o"
              }
            ]
          }
        ]
      }
    ]
  }
] satisfies NavItem[];
