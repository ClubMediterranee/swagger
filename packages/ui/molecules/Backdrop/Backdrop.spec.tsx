import {render, screen} from "@testing-library/react";

import {Backdrop} from "./Backdrop";

describe("<Backdrop />", () => {
  it("renders a Backdrop component", () => {
    render(
      <Backdrop isVisible>
        <div>backdrop content</div>
      </Backdrop>
    );
    const backdrop = screen.getByRole("presentation");
    expect(backdrop).toBeInTheDocument();
    expect(backdrop).toMatchSnapshot("backdrop");
  });
});
