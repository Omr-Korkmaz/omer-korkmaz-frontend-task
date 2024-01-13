import React from 'react'
import useFetch from '../../hooks/useFetch';
import { ApiParams } from '../../types/apiParams';
import Filter from '../Filter';
import styles from './movieList.module.css'

const MovieList:React.FC = () => {


    const { data, loading, error } = useFetch<any>(
        "https://swapi.dev/api/films/?format=json"
      );

      const [filteredMovies, setFilteredMovies] = React.useState<any[]>([]);



      React.useEffect(() => {
        // Initial loading or when data changes
        if (data && data.results) {
            setFilteredMovies(data.results);
        }
      }, [data]);


      const handleFilterChange = (filterValue: string) => {
        if (data && data.results) {
          const filtered = data.results.filter((film: any) =>
            film.title.toLowerCase().includes(filterValue.toLowerCase())
          );
          setFilteredMovies(filtered);
        }
      };





    
      if (loading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error: {error.message}</div>;
      }
    
      console.log("Fetched Data:", data);
    
  return (
    <div>
     <div className={styles.container}>

     <Filter onFilterChange={handleFilterChange} />

    {/* {data.results.map((item: any) => ( */}
    {    filteredMovies.map((item: any) => (

      <p key={item.episode_id}>{item.title}</p>
    ))}
  </div>
    </div>
  )
}

export default MovieList
