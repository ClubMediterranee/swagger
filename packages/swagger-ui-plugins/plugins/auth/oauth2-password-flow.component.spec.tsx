import { fireEvent, render, screen } from "@testing-library/react";
import { ComponentProps } from "react";

import { Oauth2PasswordFlow } from "./oauth2-password-flow.component";

describe("OAuth password form v2 callbacks", () => {
  it("maps values to explicit OAuth state keys instead of using the event as a key", () => {
    const setState = vi.fn();
    const props = {
      username: "",
      passwordType: "basic",
      isAuthorized: false,
      setState
    } satisfies ComponentProps<typeof Oauth2PasswordFlow>;
    render(<Oauth2PasswordFlow {...props} />);

    fireEvent.change(screen.getByRole("textbox"), { target: { value: "test-user" } });
    expect(setState).toHaveBeenLastCalledWith("username", "test-user");

    fireEvent.change(screen.getByLabelText("Password:"), { target: { value: "test-password" } });
    expect(setState).toHaveBeenLastCalledWith("password", "test-password");

    fireEvent.click(screen.getByRole("radio", { name: "Request body" }));
    expect(setState).toHaveBeenLastCalledWith("password_type", "request-body");
  });
});
