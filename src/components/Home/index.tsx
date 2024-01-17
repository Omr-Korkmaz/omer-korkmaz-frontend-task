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
import { calculateAverageRating } from "../../utils/ratingUtils";

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

  const parseDate = (dateString: string) => {
    return new Date(dateString);
  };

  const modifiedfilteredSwapiData = modifiedSwapiData
    ? filterUtils(modifiedSwapiData, filter)
    : [];

  //  i Will move this part to custom hook dont forget :)
  const modifiedSortedSwapiData = [...modifiedfilteredSwapiData].sort(
    (a, b) => {
      const averageRatingA = calculateAverageRating(a);
      const averageRatingB = calculateAverageRating(b);

      console.log("values", averageRatingA, averageRatingB);

      if (sortingCriteria.column === "release_date") {
        const dateA = parseDate(a[sortingCriteria.column]);
        const dateB = parseDate(b[sortingCriteria.column]);
        return sortingCriteria.order === "asc"
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      } else if (sortingCriteria.column === "episode_id") {
        return sortingCriteria.order === "asc"
          ? (a[sortingCriteria.column] as number) -
              (b[sortingCriteria.column] as number)
          : (b[sortingCriteria.column] as number) -
              (a[sortingCriteria.column] as number);
      } else if (sortingCriteria.column === "rate") {
        return sortingCriteria.order === "asc"
          ? averageRatingA - averageRatingB
          : averageRatingB - averageRatingA;
      }

      const comparison = sortingCriteria.order === "asc" ? 1 : -1;
      return (a[sortingCriteria.column] as string) >
        (b[sortingCriteria.column] as string)
        ? comparison
        : -comparison;
    }
  );

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
