import { OmdbApiParams, OmdbApiRating } from "../types/omdbParams";

import { swapiApiParams, SwapiApiRating } from "../types/swapiApiParams";

export const calculateAverageRating = (
  swapiData: swapiApiParams | undefined
) => {
  const imdbRating =
    parseFloat(
      swapiData?.rating?.find(
        (rating: SwapiApiRating) => rating.Source === "Internet Movie Database"
      )?.Value
    ) || 0;
  const rottenTomatoesRating =
    parseInt(
      swapiData?.ratings?.find(
        (rating: SwapiApiRating) => rating.Source === "Rotten Tomatoes"
      )?.Value
    ) || 0;
  const metacriticRating =
    parseInt(
      swapiData?.ratings?.find(
        (rating: SwapiApiRating) => rating.Source === "Metacritic"
      )?.Value
    ) || 0;

  let sum = 0;
  let divisor = 0; // we need to find exact average. forexample if one rating auth. is not provide rate we should divide 2 not 2 :)

  if (imdbRating) {
    sum += imdbRating * 10; // convert the rate 2 digits and max 100.  (it provides like 7.4 )
    divisor += 1;
  }

  if (rottenTomatoesRating) {
    sum += rottenTomatoesRating;
    divisor += 1;
  }

  if (metacriticRating) {
    sum += metacriticRating;
    divisor += 1;
  }

  const averageRating = divisor > 0 ? sum / divisor : 0;

  console.log("aassssas", averageRating);
  return averageRating;
};
