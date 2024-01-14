import { useState, useEffect } from 'react';
import { ApiParams } from '../types/apiParams';

interface UseFetchResult {
  data: ApiParams[] | null;
  loading: boolean;
  error: Error | null;
}

const useFetch = (url: string): UseFetchResult => {
  const [data, setData] = useState<ApiParams[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();
        setData(result.results);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("An unexpected error occurred"));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
