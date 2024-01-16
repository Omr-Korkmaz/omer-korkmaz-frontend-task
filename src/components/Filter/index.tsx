import React, { ChangeEvent } from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from "@mui/material";

interface FilterProps {
  onFilterChange: (filterValue: string) => void;
  filterValue: string;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange, filterValue }) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onFilterChange(value);
  };

  return (
    <TextField
      fullWidth
      label="Filter"
      placeholder="Type to filter..."
      id="filterInput"
      value={filterValue}
      onChange={handleInputChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default Filter;
