import React from "react";
import useFetchApi from "../../hooks/useFetchApi";
import { OmdbApiParams } from "../../types/omdbParams";
import { swapiApiParams } from "../../types/swapiApiParams";
import { calculateAverageRating } from "../../utils/ratingUtils";
import convertLatinToRomanUtils from "../../utils/convertLatintoRomanUtils";
import Rating from "@mui/material/Rating";
import { Typography } from "@mui/material";

interface MovieRatingProps {
  selectedItem: swapiApiParams;
}

const MovieRating: React.FC<MovieRatingProps> = ({ selectedItem }) => {
  let getFullTitle = `Episode ${convertLatinToRomanUtils(
    selectedItem?.episode_id
  )} - ${selectedItem?.title}`;

  const apiKey = "63fd3c86";
  const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(
    getFullTitle
  )}`;

  const {
    data: omdbData,
    isLoading: omdbLoading,
    error: omdbError,
  } = useFetchApi<OmdbApiParams>(apiUrl);

  console.log("omdbData", omdbData);

  const averageRating = omdbData ? calculateAverageRating(omdbData) : null;
  const numberOfStart = averageRating ? averageRating / 10 : null;

  if (omdbLoading) return <div>Loading...</div>;

  if (omdbError)
    return (
      <div>
        <Typography variant="body2" color="error">
          Error loading movie rating: {omdbError.message}
        </Typography>
      </div>
    );

  return (
    <div>
      <Rating name="readOnly" readOnly value={numberOfStart} max={10} />
    </div>
  );
};

export default MovieRating;
