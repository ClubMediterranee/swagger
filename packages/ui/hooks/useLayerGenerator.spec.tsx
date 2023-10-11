import { Globals } from '@react-spring/web';
import { render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { act } from 'react-dom/test-utils';

import useLayerGenerator from './useLayerGenerator';

type input = Record<string, unknown> | ((index: number) => Record<string, unknown>);

const layerStylesAPIMock = {
  start: jest.fn((i: input) => {
    if (typeof i === 'function') {
      return i(0);
    }

    return i;
  }),
};
const triggerStylesAPIMock = {
  start: jest.fn((i: input) => {
    if (typeof i === 'function') {
      return i(0);
    }

    return i;
  }),
};

jest.mock('react-dom', () => {
  const original = jest.requireActual('react-dom');
  return {
    ...original,
    createPortal: jest.fn((modal) => modal),
  };
});
jest.mock('@react-spring/web', () => {
  const original = jest.requireActual('@react-spring/web');
  return {
    ...original,
    useScroll: () => ({ scrollY: { to: (cb: (x: number) => number) => cb(5) } }),
    useSprings: () => [[{ pointerEvents: 'auto' }], triggerStylesAPIMock],
    useSpring: () => [{ pointerEvents: 'auto' }, layerStylesAPIMock],
  };
});

describe('useLayerGenerator()', () => {
  beforeAll(() => {
    Globals.assign({
      skipAnimation: true,
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const rect = {
    x: 0,
    y: 0,
    width: 250,
    height: 100,
    top: 20,
    left: 50,
  } as DOMRect;

  const layerProps = {
    content: <div>Layer content!</div>,
    title: 'Layer title!',
    closeLabel: 'Close layer',
  };

  it('returns an object', () => {
    const { result } = renderHook(() => useLayerGenerator(layerProps, 1));

    const expected = {
      layer: expect.anything(),
      openLayer: expect.any(Function),
      target: null,
      triggerStyles: [{ pointerEvents: 'auto' }],
    };

    expect(result.current).toEqual(expected);
    expect(result.current.layer).toMatchSnapshot('Layer Snapshot');
  });

  describe('openLayer()', () => {
    it('call springs functions', () => {
      const { result } = renderHook(() => useLayerGenerator(layerProps, 1));

      act(() => result.current.openLayer(rect, 0));

      expect(layerStylesAPIMock.start).toHaveBeenCalledTimes(1);
      expect(triggerStylesAPIMock.start).toHaveBeenCalledTimes(1);
      expect(layerStylesAPIMock.start).toHaveBeenCalledWith({
        config: { friction: 30, mass: 1.5, tension: 180 },
        from: {
          insetInlineStart: 50,
          top: 20,
          transform: 'scale(0.244140625, 0.13020833333333334)',
          pointerEvents: 'none',
          opacity: 0.2,
          transformOrigin: 'top left',
          zIndex: 1,
          x: '0%',
        },
        to: {
          insetInlineStart: 0,
          top: 0,
          transform: 'scale(1, 1)',
          pointerEvents: 'auto',
          opacity: 1,
          transformOrigin: 'top left',
          zIndex: 1,
        },
      });
      expect(triggerStylesAPIMock.start).toHaveReturnedWith({
        config: { mass: 1.5, tension: 180, friction: 30 },
        from: {
          insetInlineStart: 0,
          top: 0,
          transform: 'scale(1, 1)',
          willChange: 'transform, opacity, inset, filter',
          pointerEvents: 'auto',
          opacity: 1,
          filter: 'blur(0px)',
          transformOrigin: 'top left',
          position: 'relative',
          zIndex: 10,
        },
        to: {
          insetInlineStart: -50,
          top: -20,
          transform: 'scale(4.096, 4.096)',
          pointerEvents: 'none',
          opacity: 0,
          filter: 'blur(10px)',
          transformOrigin: 'top left',
          position: 'relative',
          zIndex: 10,
        },
      });
    });
  });

  describe('closeLayer()', () => {
    it('call springs functions', async () => {
      const { result } = renderHook(() => useLayerGenerator(layerProps, 1));
      render(result.current.layer);

      act(() => result.current.openLayer(rect, 0));

      const closeLayerButton = screen.getByRole('button', { name: 'Close layer' });

      await userEvent.click(closeLayerButton);

      expect(layerStylesAPIMock.start).toHaveBeenCalledTimes(2);
      expect(triggerStylesAPIMock.start).toHaveBeenCalledTimes(2);
      expect(layerStylesAPIMock.start).toHaveBeenNthCalledWith(2, {
        config: { friction: 30, mass: 1.5, tension: 180 },
        to: {
          insetInlineStart: 50,
          top: 20,
          transform: 'scale(0.244140625, 0.13020833333333334)',
          pointerEvents: 'none',
          opacity: -1,
          transformOrigin: 'top left',
          zIndex: -1,
        },
      });
      expect(triggerStylesAPIMock.start).toHaveNthReturnedWith(2, {
        config: { friction: 30, mass: 1.5, tension: 180 },
        onRest: expect.any(Function),
        to: {
          filter: 'blur(0px)',
          insetInlineStart: 0,
          opacity: 1,
          pointerEvents: 'auto',
          position: 'relative',
          top: 0,
          transform: 'scale(1, 1)',
          transformOrigin: 'top left',
          willChange: 'transform, opacity, inset, filter',
          zIndex: 0,
        },
      });
    });
  });
});
