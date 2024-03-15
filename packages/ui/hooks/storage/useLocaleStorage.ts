import isEqual from "lodash/isEqual";
import { Dispatch, useCallback, useEffect, useState } from "react";

export function getStorageValue<Type = any>(key: string, initialValue?: Type): Type | undefined {
  try {
    const item = window.localStorage.getItem(key);
    return (item && JSON.parse(item)) || initialValue;
  } catch {}

  return initialValue;
}

export function setStorageValue(key: string, value: any) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function useLocalStorage<Type = any>(key: string, initialValue: Type): [Type, Dispatch<Type>] {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, initialValue);
  });

  const setItem = (newValue: Type) => {
    setValue(newValue);
    setStorageValue(key, newValue);
  };

  useEffect(() => {
    const newValue = getStorageValue(key);

    if (!isEqual(value, newValue)) {
      setValue(newValue || initialValue);
    }
  }, []);

  const handleStorage = useCallback(
    (event: StorageEvent) => {
      if (event.key === key && event.newValue !== value) {
        setValue((event.newValue || initialValue) as unknown as Type);
      }
    },
    [value]
  );

  useEffect(() => {
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [handleStorage]);

  return [value!, setItem];
}
