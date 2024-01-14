import React, { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import Movie from '../Movie';
import MovieDetails from '../MovieDetails';
import Filter from '../Filter';
import filterUtils from '../../utils/filterUtils';

import styles from './home.module.css'

interface SelectedItem {
  episode_id: number;
}

function Home() {
  const { data, loading, error } = useFetch('https://swapi.dev/api/films/?format=json');
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);
  const [filter, setFilter] = useState<string>('');

  const handleItemClick = (itemId: number) => {
    const selectedItem = data?.find((item) => item.episode_id === itemId);
    setSelectedItem(selectedItem ?  selectedItem : null);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setSelectedItem(null); // Reset selected item
  };

  const filteredData = data ? filterUtils(data, filter) : [];

  return (
    <div className={styles.container}>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
<div className={styles.filterContainer} >
      <Filter onFilterChange={handleFilterChange} />
      </div>

      <div className={styles.buttomContainer}>
      <div>
        {/* List Component */}
        {filteredData.map((item: any, index: number) => (
          <Movie key={index} item={item} onItemClick={handleItemClick} />
        ))}
      </div>

      <div>
        {/* Detail Component */}
        {selectedItem && (
          <MovieDetails selectedItem={selectedItem} />
        )}
      </div>
      </div>
    </div>
  );
}

export default Home;
