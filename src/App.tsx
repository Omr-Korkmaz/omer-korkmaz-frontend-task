import React, { useState, useEffect } from 'react';
import useFetch from './hooks/useFetch';
import Movie from './components/Movie';
import MovieDetails from './components/MovieDetails';
import Filter from './components/Filter';
import filterUtils from './utils/filterUtils';

interface SelectedItem {
  episode_id: number;
}

function App() {
  const { data, loading, error } = useFetch('https://swapi.dev/api/films/?format=json');
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);
  const [filter, setFilter] = useState<string>('');

  const handleItemClick = (itemId: number) => {
    const selectedItem = data?.find((item) => item.episode_id === itemId);
    setSelectedItem(selectedItem ? { episode_id: selectedItem.episode_id } : null);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setSelectedItem(null); // Reset selected item when the filter changes
  };

  const filteredData = data ? filterUtils(data, filter) : [];

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      <Filter onFilterChange={handleFilterChange} />

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
  );
}

export default App;
