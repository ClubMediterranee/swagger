import {renderHook} from "@testing-library/react";

import {useDevice} from "./Device";
import {Devices, deviceWrapper} from "../tests/helpers/device";


describe("Device Context", () => {
  describe("useDevice(string)", () => {
    describe("without a Provider", () => {
      it("throws an error", () => {
        jest.spyOn(global.console, "error").mockImplementation(() => null);

        expect(() => renderHook(() => useDevice("mobile"))).toThrow(
          "useDevice(string) should be used in DeviceContext.Provider"
        );
      });
    });

    it("returns a default value", () => {
      const wrapper = deviceWrapper(Devices.mobile);

      const {result} = renderHook(() => useDevice("mobile"), {wrapper});

      expect(result.current).toBe(true);
    });

    it("returns the default value", () => {
      const wrapper = deviceWrapper(Devices.mobile);
      const {result} = renderHook(() => useDevice("desktop"), {wrapper});
      expect(result.current).not.toBe(true);
    });
  });
});
