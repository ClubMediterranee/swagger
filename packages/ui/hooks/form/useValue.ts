import {useEffect, useState} from "react";

export interface UseValueProps<Value = string> {
  name: string;
  initialValue?: Value;
  onChange?: (name: string, value: Value) => void;
  defaultValue?: Value | string;
}

export function useValue<Value = string>({name, initialValue, onChange, defaultValue = ""}: UseValueProps<Value>) {
  const [value, setLocalValue] = useState<Value>((initialValue || defaultValue) as Value);

  useEffect(() => {
    initialValue !== void 0 && setLocalValue(initialValue);
  }, [initialValue]);

  function setValue(value2: Value) {
    setLocalValue(value2);
    onChange && onChange(name, value2);
  }

  function resetValue() {
    setValue(defaultValue as Value);
  }

  return {
    value,
    setValue,
    resetValue
  };
}
