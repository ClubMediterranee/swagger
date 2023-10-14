import {act, renderHook} from "@testing-library/react";
import {getStorageValue, useLocalStorage} from "./useLocaleStorage";

describe("useLocalStorage", (): void => {
  const KEY = "key";
  const VALUE = {
    INITIAL: "initial value",
    CHANGED: "changed value"
  };

  describe("Setup", () => {
    it("Returns initial value", () => {
      const {result} = renderHook(() => useLocalStorage(KEY, VALUE.INITIAL));
      expect(result.current[0]).toMatch(VALUE.INITIAL);
    });

    it("Returns setValue function", () => {
      const {result} = renderHook(() => useLocalStorage(KEY, VALUE.INITIAL));
      expect(typeof result.current[1]).toMatch("function");
    });
  });

  it("When `setValue()` is called, the `value` updates", () => {
    const {result} = renderHook(() => useLocalStorage(KEY, VALUE.INITIAL));

    act(() => {
      result.current[1](VALUE.CHANGED);
    });

    expect(result.current[0]).toMatch(VALUE.CHANGED);
  });

  it("When `value` changes, `localStorage` is updated", () => {
    const {result} = renderHook(() => useLocalStorage(KEY, VALUE.INITIAL));

    act(() => {
      result.current[1](VALUE.CHANGED);
    });

    expect(getStorageValue(KEY)).toBe(VALUE.CHANGED);
  });
});
