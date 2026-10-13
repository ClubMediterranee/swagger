import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";

import { GroupButtons } from "./GroupButtons";

describe("GroupButtons v2 callbacks", () => {
  it("propagates selections through a value adapter without relying on an event target", () => {
    const changed = vi.fn();
    function Filter() {
      const [value, setValue] = useState<string[]>([]);
      return (
        <GroupButtons
          name="tags"
          value={value}
          choices={[{ label: "Products", value: "products" }]}
          onChange={(_, next) => {
            changed("tags", next);
            setValue(next);
          }}
        />
      );
    }
    render(<Filter />);
    fireEvent.click(screen.getByRole("button", { name: "Products" }));
    expect(changed).toHaveBeenLastCalledWith("tags", ["products"]);
    fireEvent.click(screen.getByRole("button", { name: "Products" }));
    expect(changed).toHaveBeenLastCalledWith("tags", []);
  });
});
