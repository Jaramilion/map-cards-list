import { apiClient } from "@/client/api";
import { useCallback, useEffect, useState } from "react";

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | []>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    async function fetchCards() {
      setLoading(true);
      try {
        const data = await apiClient<T>({ url });
        setData(data);
      } catch (error) {
        setError(new Error("A Fetch error ocurred", { cause: error }));
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCards();
  }, [url, reloadKey]);

  const retry = useCallback(() => {
    setReloadKey((k) => k + 1);
  }, []);

  return { data, loading, error, retry };
}
