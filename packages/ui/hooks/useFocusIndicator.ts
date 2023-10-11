import { SpringValue, useSpring } from '@react-spring/web';
import { RefObject, useEffect, useRef } from 'react';

import useResizeObserver from './useResizeObserver';

const useFocusIndicator = (
  activeItem: number,
  itemsRefs: RefObject<HTMLButtonElement[]>,
  spacerRef?: RefObject<HTMLDivElement>,
  horizontalGrowth = 0,
): [
  {
    [key: string]: SpringValue<string> | SpringValue<number>;
  },
  RefObject<HTMLDivElement>,
  SpringValue<number>,
] => {
  const container = useRef<HTMLDivElement>(null);
  const { width: containerWidth } = useResizeObserver<HTMLDivElement>({ ref: container });
  const [focusIndicatorStyle, focusIndicatorApi] = useSpring(() => ({
    from: {
      left: 0,
      height: 0,
      width: 0,
      translateX: 0,
      opacity: 0,
    },
  }));

  const [{ scrollLeft }, scrollApi] = useSpring(() => ({
    from: { scrollLeft: 0 },
  }));

  useEffect(() => {
    if (!itemsRefs.current || !container.current) {
      return;
    }

    const spacerWidth = spacerRef?.current?.offsetWidth || 0;
    const rect = itemsRefs.current[activeItem].getBoundingClientRect();
    const scrollLeft = container.current?.scrollLeft;

    focusIndicatorApi.start({
      to: {
        height: rect.height,
        width: rect.width + horizontalGrowth * 2,
        translateX:
          rect.left +
          scrollLeft -
          container.current.getBoundingClientRect().left -
          horizontalGrowth,
        opacity: 1,
      },
      config: { mass: 1, tension: 300, friction: 30 },
    });
    scrollApi.start({
      to: {
        scrollLeft: scrollLeft + rect.left - spacerWidth,
      },
    });
  }, [
    activeItem,
    containerWidth,
    focusIndicatorApi,
    horizontalGrowth,
    itemsRefs,
    scrollApi,
    spacerRef,
  ]);

  return [focusIndicatorStyle, container, scrollLeft];
};

export default useFocusIndicator;
