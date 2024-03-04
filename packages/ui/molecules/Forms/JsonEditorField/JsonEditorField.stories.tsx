import {Meta, StoryObj} from "@storybook/react";
import {JsonEditorField} from "./JsonEditorField.tsx";

export default {
  title: "Forms/JsonEditorField",
  component: JsonEditorField,
  parameters: {
    layout: "centered",
    backgrounds: {default: "pearl"}
  },
  args: {
    value: {
      "key": "value"
    }
  },
  argTypes: {},
  render(args) {
    return <div style={{width: "600px", height: "400px"}}><JsonEditorField {...args} /></div>;
  }
} satisfies Meta<typeof JsonEditorField>;

type Story = StoryObj<typeof JsonEditorField>;

export const Default: Story = {
  args: {}
};
