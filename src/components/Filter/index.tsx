import React, { useState, ChangeEvent } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment } from "@mui/material";


interface FilterProps {
  onFilterChange: (filterValue: string) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [filterValue, setFilterValue] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilterValue(value);
    onFilterChange(value);
  };

  return (
    <Box>
      <TextField
        fullWidth
        label="Filter"
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
    </Box>
  );
};

export default Filter;
