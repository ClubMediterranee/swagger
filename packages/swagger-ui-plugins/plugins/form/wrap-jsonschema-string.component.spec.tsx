import { render, screen } from "@testing-library/react";
import { List, Map } from "immutable";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import { wrapJsonschemaStringComponent } from "./wrap-jsonschema-string.component";

describe("wrapJsonschemaStringComponent", () => {
  it("falls back to the Swagger UI base component for binary schemas", () => {
    const Base = vi.fn(() => <div data-testid="base-component">base</div>);
    const Wrapped = wrapJsonschemaStringComponent(Base, {
      authSelectors: { authorized: () => Map() }
    } as any);

    render(<Wrapped schema={Map({ type: "string", format: "binary" })} errors={List()} description="file" onChange={vi.fn()} />);

    expect(screen.getByTestId("base-component")).toBeInTheDocument();
    expect(Base).toHaveBeenCalledTimes(1);
  });
});
