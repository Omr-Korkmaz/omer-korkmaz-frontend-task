
import { useQuery } from 'react-query';
import axios from 'axios';

const useFetchApi = <T>(url: string) => {
  return useQuery<T, Error>(['data', url], async () => {
    const response = await axios.get(url);
    return response.data;
  });
};

export default useFetchApi;
