import {renderHook, waitFor} from "@testing-library/react";
import {useValue} from "./useValue";

describe("useValue", () => {
  it("should manage value lifecycle", async () => {
    const onChange = jest.fn();

    const {result} = renderHook(() => useValue({name: "test", onChange}));

    expect(result.current.value).toBe("");
    expect(onChange).not.toHaveBeenCalled();

    result.current.setValue("test");

    await waitFor(() => {
      expect(result.current.value).toBe("test");
    });

    result.current.resetValue();

    await waitFor(() => {
      expect(result.current.value).toBe("");
    });
  });
});
