import debounce from "lodash/debounce.js";
import { useEffect, useMemo, useRef } from "react";

export const useDebounce = (callback: any, timeout: number) => {
  const ref = useRef<any>();

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  return useMemo(() => {
    const func = (...args: any[]) => {
      ref.current?.(...args);
    };

    return debounce(func, timeout);
  }, [timeout]);
};
