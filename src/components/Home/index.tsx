import React, { useState, useEffect } from 'react';
import MovieDetails from '../MovieDetails';
import Filter from '../Filter';
import filterUtils from '../../utils/filterUtils';

import Loading from '../Loading'
import useFetchApi from '../../hooks/useFetchApi';
import {swapiApiResponse, swapiApiParams} from '../../types/swapiApiParams'
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

interface SelectedItem {
  episode_id: number;
}

type ApiParamsResponse = swapiApiResponse<swapiApiParams>;


function Home() {
  const { data, loading, error } = useFetchApi<ApiParamsResponse>('https://swapi.dev/api/films/?format=json');

  const result = data?.results

  console.log("ddddd", data?.results)
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);
  const [filter, setFilter] = useState<string>('');

  const handleItemClick = (itemId: number) => {
    const selectedItem = result?.find((item:any) => item.episode_id === itemId);
    setSelectedItem(selectedItem ? selectedItem : null);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setSelectedItem(null); // Reset selected item
  };

  const filteredData = result ? filterUtils(result, filter) : [];

  return (
    <div>
      
      <div>
            <Filter onFilterChange={handleFilterChange} />
          </div>
      <Grid container spacing={2}>
         
        {/* Left Column */}

        <Loading loading={loading} />
      {error && (
        <div>
          <p>Error: {error.message}</p>
        </div>
      )}
        {!loading && !error && (

        <Grid item xs={6}>
        

          <div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Movies</TableCell>
                    <TableCell align="right">#EPISODE</TableCell>
                    <TableCell align="right">Name&nbsp;(g)</TableCell>
                    <TableCell align="right">Rank&nbsp;(#)</TableCell>
                    <TableCell align="right">Date&nbsp;(g)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData.map((row) => (
                    <TableRow
                      key={row.episode_id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      onClick={() => handleItemClick(row.episode_id)}
                      style={{ cursor: 'pointer', backgroundColor: row.episode_id === selectedItem?.episode_id ? '#eee' : 'inherit' }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">EPISODE- {row.episode_id}</TableCell>
                      <TableCell align="right">{row.title}</TableCell>
                      <TableCell align="right">{row.release_date}</TableCell>
                      <TableCell align="right">will rank</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Grid>
        )}

        {/* Right Column */}
        <Grid item xs={6}>
          <div>
             <MovieDetails selectedItem={selectedItem} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;

