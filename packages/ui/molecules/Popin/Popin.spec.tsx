import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Popin } from "./Popin";

describe("<Popin />", () => {
  it("keeps portaled content inside its consumer's styling scope", async () => {
    const { container } = render(
      <div className="swagger-ui">
        <Popin title="Filters" closeLabel="Close filters" isVisible onClose={vi.fn()}>
          <input aria-label="Filter value" />
        </Popin>
      </div>
    );

    const input = await screen.findByRole("textbox", { name: "Filter value" });

    expect(container.querySelector(".swagger-ui")).toContainElement(input);
    expect(document.getElementById("backdrop")).not.toBeInTheDocument();
  });

  it("closes and reopens without losing its portal host", async () => {
    const onClose = vi.fn();
    const props = { title: "Filters", closeLabel: "Close filters", onClose };
    const { rerender } = render(
      <Popin {...props} isVisible>
        Filter content
      </Popin>
    );

    await userEvent.click(await screen.findByRole("button", { name: "Close filters" }));
    expect(onClose).toHaveBeenCalledTimes(1);

    rerender(
      <Popin {...props} isVisible={false}>
        Filter content
      </Popin>
    );
    await waitFor(() => expect(screen.queryByText("Filter content")).not.toBeInTheDocument());

    rerender(
      <Popin {...props} isVisible>
        Filter content
      </Popin>
    );
    expect(await screen.findByText("Filter content")).toBeInTheDocument();
  });

  it("isolates simultaneous dialogs and removes their contents on unmount", async () => {
    const first = render(
      <Popin title="First" closeLabel="Close first" isVisible onClose={vi.fn()}>
        First content
      </Popin>
    );
    const second = render(
      <Popin title="Second" closeLabel="Close second" isVisible onClose={vi.fn()}>
        Second content
      </Popin>
    );

    expect(first.container).toContainElement(await screen.findByText("First content"));
    expect(second.container).toContainElement(await screen.findByText("Second content"));

    first.unmount();
    expect(screen.queryByText("First content")).not.toBeInTheDocument();
    expect(screen.getByText("Second content")).toBeInTheDocument();

    second.unmount();
    expect(screen.queryByText("Second content")).not.toBeInTheDocument();
  });
});
