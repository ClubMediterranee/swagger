import { useState } from "react";

export function useFetch<Data>({ url }: { url: string }) {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isLoadedOnce, setIsLoadedOnce] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<Data | null>(null);
  const [dateUpdate, setDateUpdate] = useState<Date | null>(null);

  async function fetchData() {
    setIsActive(true);

    try {
      const response = await fetch(url).then((res) => res.json());

      setData(response);
      setDateUpdate(new Date());
    } catch (er: unknown) {
      setError(er as Error);
    } finally {
      setIsActive(false);
      setIsLoadedOnce(true);
    }
  }

  return {
    isLoadedOnce,
    isActive,
    setIsActive,
    error,
    dateUpdate,
    fetchData,
    data
  };
}
