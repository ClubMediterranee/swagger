import { useEffect } from "react";

export function useInterval(fetch: (initial: boolean) => any, delay = 10000, deps: any[] = []) {
  useEffect(() => {
    const interval = setInterval(() => {
      fetch(false);
    }, delay);

    fetch(true);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
