import {JsonEditorField} from "../JsonEditorField/index.ts";
import {Meta, StoryObj} from "@storybook/react";
import {Select} from "./Select.tsx";

export default {
  title: "Forms/Select",
  component: Select,
  parameters: {
    layout: "centered",
    backgrounds: {default: "pearl"}
  },
  args: {

  },
  argTypes: {},
  render(args) {
    return <div style={{"width": "300px"}}>
      <Select {...args} />
    </div>
  }
} satisfies Meta<typeof Select>;

type Story = StoryObj<typeof JsonEditorField>;

export const Default: Story = {
  args: {}
}