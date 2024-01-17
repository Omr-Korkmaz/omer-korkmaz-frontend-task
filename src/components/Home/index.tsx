import React, { useEffect, useState } from "react";
import MovieDetails from "../MovieDetails";
import Filter from "../Filter";
import useFetchApi from "../../hooks/useFetchApi";
import { swapiApiResponse, swapiApiParams } from "../../types/swapiApiParams";
import { Box, Grid, Typography } from "@mui/material";
import Loading from "../Loading";
import MovieTable from "../MovieTable";
import filterUtils from "../../utils/filterUtils";
import convertLatinToRomanUtils from "../../utils/convertLatintoRomanUtils";
import Sort from "../Sort";
import axios from "axios";
import {sortDataUtils} from "../../utils/sortDataUtils";

const Home: React.FC = () => {
  const {
    data: swapiData,
    isLoading: swapiLoading,
    error: swapiError,
  } = useFetchApi<swapiApiResponse<swapiApiParams>>(
    "https://swapi.dev/api/films/?format=json"
  );

  const swapiResult = swapiData?.results;

  const updatedSwapiData = swapiResult?.map((item) => ({
    ...item,
    fullName: `Episode ${convertLatinToRomanUtils(item?.episode_id)} - ${
      item?.title
    }`,
  }));

  const [modifiedSwapiData, setModifiedSwapiData] = useState<any>([]);

  useEffect(() => {
    const fetchDataFromSecondApi = async () => {
      const apiKey = "b9a5e69d";

      try {
        const modifiedDataPromises = await (updatedSwapiData || []).map(
          async (item) => {
            const response = await axios.get(
              `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(
                item?.fullName
              )}`
            );
            const rating = response.data?.Ratings;

            console.log("rate", rating);

            return { ...item, rating };
          }
        );

        const modifiedData = await Promise.all(modifiedDataPromises);

        setModifiedSwapiData(modifiedData);
      } catch (error) {
        console.error(`Error fetching data from OMDB API: ${error}`);
      }
    };

    fetchDataFromSecondApi();
  }, [swapiData]);

  console.log("modifiedSwapiData", modifiedSwapiData);

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
      (item: { episode_id: number }) => item.episode_id === itemId
    );
    setSelectedItem(selectedItem ? selectedItem : null);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setSelectedItem(null);
  };


  const modifiedfilteredSwapiData = modifiedSwapiData
    ? filterUtils(modifiedSwapiData, filter)
    : [];


  const modifiedSortedSwapiData = sortDataUtils(modifiedfilteredSwapiData, sortingCriteria);

  return (
    <section>
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
          sx={{
            height: "100vh",
            borderLeft: "1px solid gray",
            paddingRight: "20px",
          }}
        >
          <MovieDetails selectedItem={selectedItem} />
        </Grid>
      </Grid>
    </section>
  );
};

export default Home;
