import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Select } from "./Select";

export default {
  title: "Forms/Select",
  component: Select,
  parameters: {
    layout: "centered",
    backgrounds: { default: "pearl" }
  },
  args: {},
  argTypes: {},
  tags: ["no-tests"],
  render(args) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState<any>("option-1");
    return (
      <div style={{ width: "300px" }}>
        <Select {...args} value={value} onChange={setValue} />
      </div>
    );
  }
} satisfies Meta<typeof Select>;

type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    options: [
      {
        label: "Option 1",
        value: "option-1"
      },
      {
        label: "Option 2",
        value: "option-2"
      },
      {
        label: "Option 3",
        value: "option-3"
      }
    ]
  }
};
