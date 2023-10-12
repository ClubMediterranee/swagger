import {Meta, StoryFn} from "@storybook/react";

import {useState} from "react";

import {Backdrop} from "./Backdrop";

export default {
  title: "UI-Library/Component/Molecules/Backdrop",
  component: Backdrop,
  parameters: {
    layout: "fullscreen"
  }
} as Meta<typeof Backdrop>;

const Template: StoryFn<typeof Backdrop> = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        <div
          className="h-screen w-screen object-cover"
          style={{
            backgroundImage: "url('https://fakeimg.pl/1000x1000')",
            backgroundSize: "cover"
          }}
        />
      </button>
      <Backdrop {...args} isVisible={isOpen} onClose={() => setIsOpen(false)}>
        <button
          onClick={() => {
            setIsOpen(false);
          }}
        >
          Close
        </button>
      </Backdrop>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const Sweep_Mode = Template.bind({});
Sweep_Mode.args = {
  sweep: true
};
