import {
  Dispatch,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { KEYS } from './constants';

export const useTabControls = (
  items: Array<object>,
  initialIndex: number,
  callback?: (arg0: number) => void,
): [
  number,
  Dispatch<SetStateAction<number>>,
  RefObject<HTMLButtonElement[]>,
  () => void,
  () => void,
] => {
  const [activeItem, setActiveItem] = useState(initialIndex);
  const refsArray = useRef<HTMLButtonElement[]>([]);

  const goTo = useCallback(
    (direction: -1 | 1) => {
      const newIndex = (activeItem + direction + items.length) % items.length;
      setActiveItem(newIndex);
      refsArray.current[newIndex] && refsArray.current[newIndex].focus();
    },
    [activeItem, items.length],
  );

  const goToNext = useCallback(() => {
    const isRTL = document.documentElement.dir === 'rtl';
    isRTL ? goTo(-1) : goTo(1);
  }, [goTo]);

  const goToPrev = useCallback(() => {
    const isRTL = document.documentElement.dir === 'rtl';
    isRTL ? goTo(1) : goTo(-1);
  }, [goTo]);

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (items.length > 1) {
        switch (event.which) {
          case KEYS.ARROW_RIGHT:
          case KEYS.ARROW_DOWN:
            event.preventDefault();
            goToNext();
            return;
          case KEYS.ARROW_LEFT:
          case KEYS.ARROW_UP:
            event.preventDefault();
            goToPrev();
            return;
          case KEYS.HOME:
            event.preventDefault();
            setActiveItem(0);
            return;
          case KEYS.END:
            event.preventDefault();
            setActiveItem(items.length - 1);
            return;
          default:
        }
      }
    },
    [goToNext, goToPrev, items.length],
  );

  useEffect(() => {
    const refs = refsArray.current;

    refs.forEach((ref) => ref.addEventListener('keydown', onKeyDown, false));

    return () => {
      refs.forEach((ref) => ref?.removeEventListener('keydown', onKeyDown, false));
    };
  }, [items, onKeyDown]);

  useEffect(() => {
    callback && callback(activeItem);
  }, [activeItem, callback]);

  return [activeItem, setActiveItem, refsArray, goToNext, goToPrev];
};
