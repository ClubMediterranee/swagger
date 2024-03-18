import isEqual from "lodash/isEqual";
import uniqBy from "lodash/uniqBy.js";
import { useCallback, useEffect, useState } from "react";

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

export function useLocalStorage<Type = any>(key: string, initialValue: Type) {
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

  return {
    value,
    setItem
  };
}

export function useListStorage<Type = string>(key: string, initialValue: any[] = []) {
  const { value, setItem: setValue } = useLocalStorage<{ id: Type; lastUpdate: Date }[]>(key, initialValue)!;
  function pushValue(addValue: Type) {
    const newValue = uniqBy(
      [
        {
          id: addValue,
          lastUpdate: new Date()
        },
        ...(value as any[])
      ],
      "id"
    );

    setStorageValue(key, newValue);
    setValue(newValue as any);
  }

  function setLastUpdate(id: Type) {
    const newValue = (value as any[]).map((item) => {
      if (item.id === id) {
        item.lastUpdate = new Date();
      }

      return item;
    });

    setStorageValue(key, newValue);
    setValue(newValue as any);
  }

  function removeValue(id: Type) {
    const newValue = (value as any[]).filter((item) => item.id !== id);

    setStorageValue(key, newValue);
    setValue(newValue as any);
  }

  return { options: value!, pushValue, setLastUpdate, removeValue };
}
