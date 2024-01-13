import React, { useState } from 'react';

interface FilterProps {
  onFilterChange: (filterValue: string) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [filterValue, setFilterValue] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilterValue(value);
    onFilterChange(value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Filter by title"
        value={filterValue}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default Filter;
