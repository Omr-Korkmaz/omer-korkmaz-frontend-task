import useFetchApi from '../hooks/useFetchApi';

interface ApiResult {
  data: any;
  loading: boolean;
  error: any;
}

const Api = async (url: string) => {
//   const { data, loading, error } = useFetchApi(url);

//   if (loading) {
//     console.log('Loading data...');
//   }

//   if (error) {
//     console.error('Error fetching data:', error.message);
//   }

//   return { data, loading, error };
}

export default Api;
