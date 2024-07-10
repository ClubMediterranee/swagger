import debounce from "lodash/debounce.js";
import { FunctionComponent, ReactNode, useEffect, useMemo, useRef } from "react";

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

export function withDebounce<
  Cmp extends FunctionComponent<{
    onChange(name: string, value: any): void;
    value: any;
  }>
>(
  render: Cmp
): <Value = string>(
  props: Omit<Parameters<Cmp>[0], "onChange" | "value"> & {
    onChange(name: string, value: Value): void;
    value: Value;
    debounceTimeout: number;
  }
) => ReactNode {
  return (props) => {
    const { debounceTimeout, onChange, ...restProps } = props;
    const debouncedRequest = useDebounce(onChange, debounceTimeout);

    return render({ ...restProps, onChange: debouncedRequest });
  };
}
