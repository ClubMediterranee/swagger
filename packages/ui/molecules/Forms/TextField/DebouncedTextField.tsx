import { TextField, TextFieldProps } from "@clubmed/trident-ui/molecules/Forms/TextField";
import debounce from "lodash/debounce";
import { useEffect, useMemo, useRef } from "react";

const useDebounce = (callback: any, timeout: number) => {
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

export function DebouncedTextField<Value = any>({
  debounceTimeout,
  onChange,
  ...props
}: TextFieldProps<Value> & { debounceTimeout: number }) {
  const debouncedRequest = useDebounce(onChange, debounceTimeout);

  return <TextField {...props} onChange={debouncedRequest} />;
}
