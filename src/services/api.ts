import useFetch from '../hooks/useFetch';

interface ApiResult {
  data: any;
  loading: boolean;
  error: any;
}

const Api = async (url: string): Promise<ApiResult> => {
  const { data, loading, error } = useFetch(url);

  if (loading) {
    console.log('Loading data...');
  }

  if (error) {
    console.error('Error fetching data:', error.message);
  }

  return { data, loading, error };
}

export default Api;
