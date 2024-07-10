import { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, waitFor, within } from "@storybook/test";

import { ArrayTextField } from "./ArrayTextField";

export default {
  title: "Forms/ArrayTextField",
  component: ArrayTextField,
  parameters: {
    layout: "centered",
    backgrounds: { default: "pearl" }
  },
  args: {
    value: [],
    onChange: fn()
  },
  argTypes: {},
  render(args) {
    return (
      <div style={{ width: "600px", height: "400px" }}>
        <ArrayTextField {...args} />
      </div>
    );
  }
} satisfies Meta<typeof ArrayTextField>;

type Story = StoryObj<typeof ArrayTextField>;

/**
 * This component allow to fill multiple text fields. Click on the `+` button to add a new text field.
 */
export const Default: Story = {
  args: {
    id: "id",
    label: "An array text field",
    name: "array-field",
    value: []
  },
  async play({ args, canvasElement }) {
    const canvas = within(canvasElement);

    const addButton = canvas.getByTestId("add-new-value-array-field");

    await userEvent.click(addButton);

    let inputs = canvas.getAllByRole("textbox");

    await userEvent.type(inputs[0], "id==AGAC", {
      delay: 100
    });

    await waitFor(() => expect(args.onChange).toHaveBeenCalledWith("array-field", ["id==AGAC"]));
    await expect(inputs[0]).toHaveValue("id==AGAC");

    await userEvent.click(addButton);

    inputs = canvas.getAllByRole("textbox");

    await userEvent.type(inputs[1], "type==VILLAGE", {
      delay: 100
    });

    expect(inputs[1]).toHaveValue("type==VILLAGE");

    const removeButton = canvas.getByTestId("remove-value-array-field-0");

    await userEvent.click(removeButton);

    inputs = canvas.getAllByRole("textbox");

    await expect(inputs.length).toBe(1);

    await waitFor(() => expect(args.onChange).toHaveBeenCalledWith("array-field", ["type==VILLAGE"]));
  }
};
