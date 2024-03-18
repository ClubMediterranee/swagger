import { TextField, TextFieldProps } from "@clubmed/trident-ui/molecules/Forms/TextField";

import { useDebounce } from "../../../hooks/useDebounce";

export function DebouncedTextField<Value = any>({
  debounceTimeout,
  onChange,
  ...props
}: TextFieldProps<Value> & { debounceTimeout: number }) {
  const debouncedRequest = useDebounce(onChange, debounceTimeout);

  return <TextField {...props} onChange={debouncedRequest} />;
}
