import { act, fireEvent, renderHook } from "@testing-library/react";

import { useOnClickOutside } from "./useOnClickOutside";

describe("useOnClickOutside(", () => {
  it("should call the handler when a clicking outside the element (single ref)", () => {
    const containerRef = { current: document.createElement("div") };
    const handler = vi.fn();

    renderHook(() => {
      useOnClickOutside(containerRef, handler);
    });

    expect(handler).toHaveBeenCalledTimes(0);

    // Simulate click outside the container
    act(() => {
      fireEvent.mouseDown(document);
    });

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("should NOT call the handler when a clicking inside the element", () => {
    const containerRef = { current: document.createElement("div") };
    const handler = vi.fn();

    renderHook(() => {
      useOnClickOutside(containerRef, handler);
    });

    // Simulate click inside the container
    act(() => {
      fireEvent.mouseDown(containerRef.current);
    });

    expect(handler).toHaveBeenCalledTimes(0);
  });

  it("should NOT call the handler when clicking a non-connected element", () => {
    const containerRef = { current: document.createElement("div") };
    const handler = vi.fn();

    renderHook(() => {
      useOnClickOutside(containerRef, handler);
    });

    // Simulate click on a non-connected element
    act(() => {
      const element = document.createElement("div");
      document.body.appendChild(element);
      document.body.removeChild(element);
      fireEvent.mouseDown(element);
    });

    expect(handler).toHaveBeenCalledTimes(0);
  });
});
