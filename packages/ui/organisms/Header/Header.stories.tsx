import { DeviceProvider } from "@clubmed/trident-ui/contexts/Device";
import { ButtonAnchor } from "@clubmed/trident-ui/molecules/Buttons/ButtonAnchor";
import { Meta, StoryObj } from "@storybook/react";

import { Header } from "./Header";

export default {
  title: "Header",
  component: Header,
  parameters: { layout: "fullscreen" },
  tags: ["no-tests"],
  args: {
    items: [
      {
        label: "Discover",
        url: "/l/discover-club-med",
        columns: [
          {
            sections: [
              {
                title: "Our products",
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
                title: "All Inclusive by Club Med",
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
                title: "Club Med Experiences",
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
                title: "Europe & Mediterranea",
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
                title: "Alps",
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
                title: "Europe & Mediterranea",
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
                title: "Alps",
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
                title: "Europe & Mediterranea",
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
                title: "Alps",
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
                title: "Europe & Mediterranea",
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
                title: "Alps",
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
                title: "Cruises destinations",
                url: "/o",
                links: [
                  {
                    label: "link",
                    url: "/"
                  }
                ]
              },
              {
                title: "Discovery travel tours",
                url: "/o",
                links: [
                  {
                    label: "link",
                    url: "/"
                  }
                ]
              },
              {
                title: "New resorts",
                url: "/o",
                links: [
                  {
                    label: "link",
                    url: "/"
                  }
                ]
              },
              {
                title: "Best sellers",
                url: "/o",
                links: [
                  {
                    label: "link",
                    url: "/"
                  }
                ]
              },
              {
                title: "Title",
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
                title: "Title",
                url: "/",
                links: [
                  {
                    label: "Exclusive Collection range",
                    url: "/o"
                  }
                ]
              },
              {
                title: "Title",
                url: "/",
                links: [
                  {
                    label: "Club Med 2 cruises",
                    url: "/o"
                  }
                ]
              },
              {
                title: "Title",
                url: "/",
                links: [
                  {
                    label: "Exclusive Collection resorts",
                    url: "/o"
                  }
                ]
              },
              {
                title: "Title",
                url: "/",
                links: [
                  {
                    label: "Exclusive Collection spaces",
                    url: "/o"
                  }
                ]
              },
              {
                title: "Title",
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
    ],
    openMenu: "Open menu"
  }
} satisfies Meta<typeof Header>;

export const Base: StoryObj<typeof Header> = {
  render: (args) => {
    return (
      <DeviceProvider device="mobile">
        <div>
          <Header {...args}>
            <ButtonAnchor theme="blackStroke" variant="icon" icon="PeopleSingle" href="/" label="Account" />
          </Header>
          <div className="bg-red h-screen w-full" />
        </div>
      </DeviceProvider>
    );
  }
};

const TextContent = () => (
  <div
    data-testid="languages-for-mobile"
    className="bg-red text-b3 border-pearl mx-8 flex items-center justify-center gap-4 border-b p-20 font-sans font-semibold text-white"
    data-name="Languages"
  >
    <a className="text-b3 decoration-none link-container cursor-pointer capitalize text-inherit" data-name="Link" href="/?locale=fr-CH">
      <span className="hoverable link-underline">
        Before Menu Items<span className="inline-block"></span>
      </span>
    </a>
  </div>
);

/**
 * Use to display a ***content*** in top of the items submenu for `mobile view`.
 */
export const WithTopBurgerMenuContent: StoryObj<typeof Header> = {
  render: (args) => {
    return (
      <DeviceProvider device="mobile">
        <div>
          <Header {...args} topBurgerMenuContent={<TextContent />}>
            <ButtonAnchor theme="blackStroke" variant="icon" icon="PeopleSingle" href="/" label="Account" />
          </Header>
          <div className="bg-red h-screen w-full" />
        </div>
      </DeviceProvider>
    );
  }
};
