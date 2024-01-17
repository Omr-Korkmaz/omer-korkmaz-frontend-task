import React from "react";
import { swapiApiParams } from "../../types/swapiApiParams";
import { calculateAverageRating } from "../../utils/ratingUtils";
import Rating from "@mui/material/Rating";
import { Box, Typography } from "@mui/material";

interface MovieRatingProps {
  movie: swapiApiParams | null;
}

const MovieRating: React.FC<MovieRatingProps> = ({ movie }) => {
  const averageRating = movie ? calculateAverageRating(movie) : null;
  const numberOfStart = averageRating ? averageRating / 10 : null;
  console.log(movie);
  return (
    <section>
      {!movie ? (
        <Box>
         <Typography variant="body2" color="error">There is Movie to show Rating</Typography>
        </Box>
      ) : (
        <Box>
          <Rating
            size="small"
            name="ratingStar"
            readOnly
            value={numberOfStart}
            max={10}
          />
        </Box>
      )}
    </section>
  );
};

export default MovieRating;
