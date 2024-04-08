import { DeviceProvider } from "@clubmed/trident-ui/contexts/Device";
import type { ReactElement, ReactNode } from "react";

export enum Devices {
  mobile = "mobile",
  tablet = "tablet",
  desktop = "desktop"
}
export enum Queries {
  mobile = "(min-width: 0)",
  tablet = "(min-width: 640px)",
  desktop = "(min-width: 768px)"
}

const getMatches = (device: Devices) => (query: string) => {
  switch (device) {
    case Devices.desktop:
      return query === Queries.desktop;
    case Devices.tablet:
      return query === Queries.tablet;
    case Devices.mobile:
      return query === Queries.mobile;
    default:
      return false;
  }
};

export const deviceWrapper = (device: Devices) => {
  const matcher = getMatches(device);

  vi.mocked(window.matchMedia).mockImplementation((query) => ({
    matches: matcher(query),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    dispatchEvent: vi.fn()
  }));

  const wrapper = ({ children }: { children: ReactElement | ReactNode }) => {
    return <DeviceProvider device={device}>{children}</DeviceProvider>;
  };

  return wrapper;
};
