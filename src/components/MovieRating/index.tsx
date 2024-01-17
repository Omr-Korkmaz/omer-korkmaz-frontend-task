import React from "react";
import useFetchApi from "../../hooks/useFetchApi";
import { OmdbApiParams } from "../../types/omdbParams";
import { swapiApiParams } from "../../types/swapiApiParams";
import { calculateAverageRating } from "../../utils/ratingUtils";
import Rating from "@mui/material/Rating";
import { Box, Typography } from "@mui/material";
import Loading from "../Loading";

interface MovieRatingProps {
  movie: swapiApiParams | null;
}

const MovieRating: React.FC<MovieRatingProps> = ({ movie }) => {
  const apiKey = "63fd3c86";
  const fullName = movie?.fullName || ""; //  fix type complain -  need a default value
  const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(
    fullName
  )}`;

  const {
    data: omdbData,
    isLoading: omdbLoading,
    error: omdbError,
  } = useFetchApi<OmdbApiParams>(apiUrl);

  const averageRating = omdbData ? calculateAverageRating(omdbData) : null;
  const numberOfStart = averageRating ? averageRating / 10 : null;

  return (
    <section>
      {omdbLoading && <Loading loading={omdbLoading} />}

      {omdbError && (
        <Typography variant="body2" color="error">
          Error OMDBAPI: {omdbError.message}
        </Typography>
      )}

      {!omdbLoading && !omdbError && (
        <Box>
          <Rating size="small"  name="ratingStar" readOnly value={numberOfStart} max={10} />
        </Box>
      )}
    </section>
  );
};

export default MovieRating;
