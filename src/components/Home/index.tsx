import { useState } from "react";
import MovieDetails from "../MovieDetails";
import Filter from "../Filter";
import useFetchApi from "../../hooks/useFetchApi";
import { swapiApiResponse, swapiApiParams } from "../../types/swapiApiParams";
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import styles from "./home.module.css";
import MovieRating from "../MovieRating";
import Loading from "../Loading";
import filterUtils from "../../utils/filterUtils";

import convertLatinToRomanUtils from "../../utils/convertLatintoRomanUtils";

interface SelectedItem {
  episode_id: number;
}

type ApiParamsResponse = swapiApiResponse<swapiApiParams>;

function Home() {
  const {
    data: swapiData,
    isLoading: swapiLoading,
    error: swapiError,
  } = useFetchApi<ApiParamsResponse>(
    "https://swapi.dev/api/films/?format=json"
  );

  const swapiResult = swapiData?.results;

  console.log("swapiResult", swapiResult);

  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);
  const [filter, setFilter] = useState<string>("");
  const [sortingCriteria, setSortingCriteria] = useState({
    column: "release_date",
    order: "asc",
  });

  const parseDate = (dateString: string) => {
    return new Date(dateString);
  };

  const handleSort = (column: string) => {
    const order =
      sortingCriteria.column === column && sortingCriteria.order === "asc"
        ? "desc"
        : "asc";
    setSortingCriteria({ column, order });
  };

  const handleItemClick = (itemId: number) => {
    const selectedItem = swapiResult?.find(
      (item: swapiApiParams) => item.episode_id === itemId
    );
    setSelectedItem(selectedItem ? selectedItem : null);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setSelectedItem(null);
  };

  const filteredData = swapiResult ? filterUtils(swapiResult, filter) : [];

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortingCriteria.column === "release_date") {
      const dateA: any = parseDate(a[sortingCriteria.column]);
      const dateB: any = parseDate(b[sortingCriteria.column]);
      return sortingCriteria.order === "asc" ? dateA - dateB : dateB - dateA;
    } else if (sortingCriteria.column === "episode_id") {
      return sortingCriteria.order === "asc"
        ? a[sortingCriteria.column] - b[sortingCriteria.column]
        : b[sortingCriteria.column] - a[sortingCriteria.column];
    }
    // else if (sortingCriteria.column === "rate") {
    //   const rateA = getMovieRate(a.title);
    //   const rateB = getMovieRate(b.title);
    //   return sortingCriteria.order === "asc" ? rateA - rateB : rateB - rateA;
    // }

    const comparison = sortingCriteria.order === "asc" ? 1 : -1;
    return a[sortingCriteria.column] > b[sortingCriteria.column]
      ? comparison
      : -comparison;
  });

  // const getMovieRate = (title: string) => {

  //   return Math.random() * 10;
  // };

  return (
    <section className={styles.container}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Filter onFilterChange={handleFilterChange} onSort={handleSort} />
        </Grid>

        {swapiLoading && (
          <Grid item xs={6}>
            <Loading loading={swapiLoading} />
            {swapiError && (
              <div>
                <p>Error: {swapiError}</p>
              </div>
            )}
          </Grid>
        )}

        {!swapiLoading && !swapiError && (
          <Grid item xs={6}>
            <div>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 450 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        align="center"
                        onClick={() => handleSort("episode_id")}
                      >
                        Episode
                      </TableCell>
                      <TableCell
                        align="center"
                        onClick={() => handleSort("title")}
                      >
                        Name
                      </TableCell>
                      <TableCell
                        align="center"
                        onClick={() => handleSort("rate")}
                      >
                        Rate
                      </TableCell>
                      <TableCell
                        align="center"
                        onClick={() => handleSort("release_date")}
                      >
                        Release Date
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sortedData.map((row) => (
                      <TableRow
                        key={row.episode_id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                        onClick={() => handleItemClick(row.episode_id)}
                        style={{
                          cursor: "pointer",
                          backgroundColor:
                            row.episode_id === selectedItem?.episode_id
                              ? "#eee"
                              : "inherit",
                        }}
                      >
                        <TableCell align="left">
                          EPISODE {row.episode_id}
                        </TableCell>
                        <TableCell align="left">
                          Episode {convertLatinToRomanUtils(row.episode_id)} -{" "}
                          {row.title}
                        </TableCell>
                        <TableCell align="left">
                          <MovieRating selectedItem={row} />
                        </TableCell>
                        <TableCell align="left">{row.release_date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Grid>
        )}

        <Grid
          item
          xs={6}
          sx={{ height: "100vh", borderLeft: "1px solid gray" }}
        >
          <div>
            <MovieDetails selectedItem={selectedItem} />
          </div>
        </Grid>
      </Grid>
    </section>
  );
}

export default Home;
