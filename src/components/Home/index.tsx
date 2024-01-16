import React, { useState } from "react";
import MovieDetails from "../MovieDetails";
import Filter from "../Filter";
import useFetchApi from "../../hooks/useFetchApi";
import { swapiApiResponse, swapiApiParams } from "../../types/swapiApiParams";
import { Box, Grid, Typography } from "@mui/material";
import styles from "./home.module.css";
import Loading from "../Loading";
import MovieTable from "../MovieTable";
import filterUtils from "../../utils/filterUtils";
import convertLatinToRomanUtils from "../../utils/convertLatintoRomanUtils";
import Sort from "../Sort";

const Home: React.FC = () => {
  const {
    data: swapiData,
    isLoading: swapiLoading,
    error: swapiError,
  } = useFetchApi<swapiApiResponse<swapiApiParams>>(
    "https://swapi.dev/api/films/?format=json"
  );

  const swapiResult = swapiData?.results;

  const modifiedSwapiData = swapiResult?.map((item) => ({
    ...item,
    fullName: `Episode ${convertLatinToRomanUtils(item?.episode_id)} - ${
      item?.title
    }`,
  }));
  console.log("rrate", modifiedSwapiData);

  const [selectedItem, setSelectedItem] = useState<swapiApiParams | null>(null);
  const [filter, setFilter] = useState<string>("");
  const [sortingCriteria, setSortingCriteria] = useState<{
    column: string;
    order: string;
  }>({
    column: "release_date",
    order: "asc",
  });

  const handleSort = (column: string, order: string) => {
    setSortingCriteria({ column, order });
  };

  const handleItemClick = (itemId: number) => {
    const selectedItem = modifiedSwapiData?.find(
      (item) => item.episode_id === itemId
    );
    setSelectedItem(selectedItem ? selectedItem : null);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setSelectedItem(null);
  };

  const parseDate = (dateString: string) => {
    return new Date(dateString);
  };

  const modifiedfilteredSwapiData = modifiedSwapiData
    ? filterUtils(modifiedSwapiData, filter)
    : [];

  const modifiedSortedSwapiData = [...modifiedfilteredSwapiData].sort(
    (a, b) => {
      if (sortingCriteria.column === "release_date") {
        const dateA = parseDate(a[sortingCriteria.column]);
        const dateB = parseDate(b[sortingCriteria.column]);
        return sortingCriteria.order === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
      } else if (sortingCriteria.column === "episode_id") {
        return sortingCriteria.order === "asc"
          ? a[sortingCriteria.column] - b[sortingCriteria.column]
          : b[sortingCriteria.column] - a[sortingCriteria.column];
      } else if (sortingCriteria.column === "rate") {
        console.log("sdsds", a.rate.averageRating);
        return sortingCriteria.order === "asc"
          ? a.rate.averageRating - b.rate.averageRating
          : b.rate.averageRating - a.rate.averageRating;
      }

      const comparison = sortingCriteria.order === "asc" ? 1 : -1;
      return a[sortingCriteria.column] > b[sortingCriteria.column]
        ? comparison
        : -comparison;
    }
  );

  return (
    <section className={styles.container}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              padding: "15px",
              gap: "10px",
              backgroundColor: "#E9F6FF",
            }}
          >
            <Sort onSort={handleSort} sortingCriteria={sortingCriteria} />
            <Filter onFilterChange={handleFilterChange} filterValue={filter} />
          </Box>
        </Grid>

        {swapiLoading && (
          <Grid item xs={6}>
            <Loading loading={swapiLoading} />
          </Grid>
        )}

        {swapiError && (
          <Grid item xs={6}>
            <Typography variant="body2" color="error">
              Error SwapiApi: {swapiError.message}
            </Typography>
          </Grid>
        )}

        {!swapiLoading && !swapiError && (
          <Grid item xs={6}>
            <MovieTable
              data={modifiedSortedSwapiData}
              handleItemClick={handleItemClick}
              selectedItem={selectedItem}
            />
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
};

export default Home;