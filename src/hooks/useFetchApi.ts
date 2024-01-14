import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

interface UseOmdbApiResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

 const useFetchApi = <T>(url: string): UseOmdbApiResult<T> => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
  
    useEffect(() => {
      const fetchData = async (): Promise<void> => {
        try {
          const response: AxiosResponse<T> = await axios.get(url);
  
          setData(response.data);
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
  

export default useFetchApi;
