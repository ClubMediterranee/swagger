import { Meta, StoryObj } from "@storybook/react";

import { JsonEditorField } from "../JsonEditorField";
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
    return (
      <div style={{ width: "300px" }}>
        <Select {...args} />
      </div>
    );
  }
} satisfies Meta<typeof Select>;

type Story = StoryObj<typeof JsonEditorField>;

export const Default: Story = {
  args: {}
};
