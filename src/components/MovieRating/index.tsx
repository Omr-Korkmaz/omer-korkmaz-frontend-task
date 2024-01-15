import React from "react";
import useFetchApi from "../../hooks/useFetchApi";
import { OmdbApiParams } from "../../types/omdbParams";

import { swapiApiParams, swapiApiResponse } from "../../types/swapiApiParams";
import { calculateAverageRating } from "../../utils/ratingUtils";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

import convertLatinToRomanUtils from "../../utils/convertLatintoRomanUtils";

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
    loading: omdbLoading,
    error: omdbError,
  } = useFetchApi<OmdbApiParams>(apiUrl);

  console.log("omdbData", omdbData);

  const averageRating = omdbData ? calculateAverageRating(omdbData) : null;

  const numberOfStart = averageRating ? averageRating / 10 : null;

  const stars: JSX.Element[] = [];

  for (let i = 0; i < numberOfStart!; i++) {
    stars.push(<StarIcon key={i} style={{ fill: "orange", fontSize: 20 }} />);
  }

  for (let i = numberOfStart!; i < 10; i++) {
    stars.push(
      <StarOutlineIcon key={i} style={{ color: "grey", fontSize: 20 }} />
    );
  }

  return (
    <div>
      <div>{stars}</div>
    </div>
  );
};

export default MovieRating;