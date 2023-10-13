import {Meta, StoryFn} from "@storybook/react";

import {Icon} from "./Icon";

import {
  Actions,
  Activities,
  Brand,
  Covid,
  Food,
  HTC,
  type Iconics,
  Places,
  ResortFill,
  ResortFillEC,
  ResortOutline,
  ResortOutlineEC,
  Room,
  Services,
  Socials,
  Transports,
  Utilities
} from "../assets/icons";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "UI-Library/Component/Atoms/Icon",
  component: Icon,
  parameters: {
    layout: "centered"
  }
} satisfies Meta<typeof Icon>;

const SECTIONS = {
  Actions,
  Activities,
  Brand,
  Covid,
  Food,
  "Happy To Care": HTC,
  Places,
  "Resort Filled": ResortFill,
  "Resort Filled Exclusive Collection": ResortFillEC,
  "Resort Outline": ResortOutline,
  "Resort Outline Exclusive Collection": ResortOutlineEC,
  Room,
  Services,
  Socials,
  Transports,
  Utilities
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof Icon> = () => {
  return (
    <div className="flex flex-col gap-y-32 font-sans">
      {Object.entries(SECTIONS).map(([section, icons]) => (
        <div key={section}>
          <h1 className="text-h1 mb-16 font-serif">{section}</h1>
          <div className="flex flex-wrap gap-20">
            {Object.keys(icons).map((name) => (
              <abbr key={name} title={name}>
                <div
                  style={{maxWidth: 80, width: 80}}
                  className="rounded-16 border-grey flex h-full flex-col items-center border p-8"
                >
                  <Icon className="my-auto" width="40px" name={name as Iconics}/>
                  <span className="text-b5 max-w-full truncate">{name}</span>
                </div>
              </abbr>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export const Base = Template.bind({});
