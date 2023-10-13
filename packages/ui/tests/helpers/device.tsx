import { render } from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';

import { DeviceProvider } from '../../contexts/Device';

export enum Devices {
  mobile = 'mobile',
  tablet = 'tablet',
  desktop = 'desktop',
}
export enum Queries {
  mobile = '(min-width: 0)',
  tablet = '(min-width: 640px)',
  desktop = '(min-width: 768px)',
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

  jest.mocked(window.matchMedia).mockImplementation((query) => ({
    matches: matcher(query),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    dispatchEvent: jest.fn(),
  }));

  const wrapper = ({ children }: { children: ReactElement | ReactNode }) => {
    return <DeviceProvider device={device}>{children}</DeviceProvider>;
  };

  return wrapper;
};

export const deviceRender = (ui: ReactElement, device: Devices) => {
  const wrapper = deviceWrapper(device);

  return render(ui, { wrapper });
};
