'use client';

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type FunctionComponent,
  type PropsWithChildren,
} from 'react';

const QUERIES = {
  MOBILE: '(min-width: 0)',
  TABLET: '(min-width: 640px)',
  DESKTOP: '(min-width: 768px)',
}; // this is all so incredibly temporary don't sue me

type Devices = Lowercase<keyof typeof QUERIES>;

type Direction = 'ltr' | 'rtl';

interface Props {
  device: Devices;
  direction?: Direction;
}
export interface DeviceContext {
  desktop: boolean;
  mobile: boolean;
  tablet: boolean;
  direction: Direction;
}

const DeviceContext = createContext<DeviceContext | null>(null);

const reducer = (state: DeviceContext, action: { type: string; payload: boolean }) => {
  switch (action.type) {
    case 'mobile':
      return state;
    case 'desktop':
      return {
        ...state,
        desktop: action.payload,
      };
    case 'tablet':
      return {
        ...state,
        tablet: action.payload,
      };
    default:
      return state;
  }
};

const getInitialState = ({ device, direction }: { device: Devices; direction: Direction }) => {
  if (typeof window !== 'undefined') {
    return {
      direction,
      desktop: window.matchMedia(QUERIES.DESKTOP).matches,
      mobile: true,
      tablet: window.matchMedia(QUERIES.TABLET).matches,
    };
  }

  return {
    direction,
    desktop: device === 'desktop',
    mobile: true,
    tablet: device === 'tablet' || device === 'desktop',
  };
};

export const DeviceProvider: FunctionComponent<PropsWithChildren<Props>> = ({
  children,
  device,
  direction = 'ltr',
}) => {
  const [state, dispatch] = useReducer(reducer, { device, direction }, getInitialState);

  useEffect(() => {
    const mqlDesktop = window.matchMedia(QUERIES.DESKTOP);
    const mqlTablet = window.matchMedia(QUERIES.TABLET);

    const listenerDesktop = ({ matches }: MediaQueryListEventMap['change']) => {
      dispatch({ type: 'desktop', payload: matches });
    };
    const listenerTablet = ({ matches }: MediaQueryListEventMap['change']) => {
      dispatch({ type: 'tablet', payload: matches });
    };

    mqlDesktop.addEventListener('change', listenerDesktop, { passive: true });
    mqlTablet.addEventListener('change', listenerTablet, { passive: true });

    return () => {
      mqlDesktop.removeEventListener('change', listenerDesktop);
      mqlTablet.removeEventListener('change', listenerTablet);
    };
  }, []);

  return <DeviceContext.Provider value={state}>{children}</DeviceContext.Provider>;
};

export function useDevice(device: Devices): boolean;
export function useDevice(direction: 'direction'): Direction;
export function useDevice(device: Devices | 'direction') {
  const context = useContext(DeviceContext);

  if (context === null) {
    throw new Error('useDevice(string) should be used in DeviceContext.Provider');
  }

  return context[device];
}
