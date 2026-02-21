import { useCallback, useEffect, useState } from "react";

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | []>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    async function fetchCards() {
      setLoading(true);
      setTimeout(async () => {
        try {
          const response = await fetch(url);
          if (response.ok) {
            const parsedResponse = await response.json();
            setData(parsedResponse);
          }
        } catch (error) {
          setError(new Error("A Fetch error ocurred", { cause: error }));
          console.error(error);
        } finally {
          setLoading(false);
        }
      }, 2000);
    }
    fetchCards();
  }, [url, reloadKey]);

  const retry = useCallback(() => {
    setReloadKey((k) => k + 1);
  }, []);

  return { data, loading, error, retry };
}
