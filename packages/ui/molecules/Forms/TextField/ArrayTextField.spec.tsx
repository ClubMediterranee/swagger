import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ArrayTextField } from "./ArrayTextField";

describe("<ArrayTextField />", () => {
  it("should be render ArrayTextField", async () => {
    const props = {
      onChange: vi.fn(),
      name: "array-field"
    };

    const canvas = render(<ArrayTextField {...props} />);

    const addButton = canvas.getByTestId("add-new-value-array-field");

    await userEvent.click(addButton);

    let inputs = canvas.getAllByRole("textbox");

    await userEvent.type(inputs[0], "id==AGAC", {
      delay: 100
    });

    await waitFor(() => expect(props.onChange).toHaveBeenCalledWith("array-field", ["id==AGAC"]));
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

    await waitFor(() => expect(props.onChange).toHaveBeenCalledWith("array-field", ["type==VILLAGE"]));
  });
});
