// import { OmdbApiParams, OmdbApiRating } from "../types/omdbParams";

// export const calculateAverageRating = (omdbData: OmdbApiParams | undefined) => {
//   const imdbRating =
//     parseFloat(
//       omdbData?.Ratings?.find(
//         (rating: OmdbApiRating) => rating.Source === "Internet Movie Database"
//       )?.Value
//     ) || 0;
//   const rottenTomatoesRating =
//     parseInt(
//       omdbData?.Ratings?.find(
//         (rating: OmdbApiRating) => rating.Source === "Rotten Tomatoes"
//       )?.Value
//     ) || 0;
//   const metacriticRating =
//     parseInt(
//       omdbData?.Ratings?.find(
//         (rating: OmdbApiRating) => rating.Source === "Metacritic"
//       )?.Value
//     ) || 0;

//   let sum = 0;
//   let divisor = 0;

//   if (imdbRating) {
//     sum += imdbRating * 10; // convert the rate 2 digits, max 100.  (it provides like 7.4 )
//     divisor += 1;
//   }

//   if (rottenTomatoesRating) {
//     sum += rottenTomatoesRating;
//     divisor += 1;
//   }

//   if (metacriticRating) {
//     sum += metacriticRating;
//     divisor += 1;
//   }

//   const averageRating = divisor > 0 ? sum / divisor : 0;

//   return averageRating;
// };



import { OmdbApiParams, OmdbApiRating } from "../types/omdbParams";

export interface Ratings {
  imdbRating: number;
  rottenTomatoesRating: number;
  metacriticRating: number;
}

export const calculateRatings = (omdbData: OmdbApiParams | undefined): Ratings => {
  const imdbRating =
    parseFloat(
      omdbData?.Ratings?.find(
        (rating: OmdbApiRating) => rating.Source === "Internet Movie Database"
      )?.Value
    ) || 0;
  const rottenTomatoesRating =
    parseInt(
      omdbData?.Ratings?.find(
        (rating: OmdbApiRating) => rating.Source === "Rotten Tomatoes"
      )?.Value
    ) || 0;
  const metacriticRating =
    parseInt(
      omdbData?.Ratings?.find(
        (rating: OmdbApiRating) => rating.Source === "Metacritic"
      )?.Value
    ) || 0;


    console.log( imdbRating,
      rottenTomatoesRating,
      metacriticRating,)
  return {
    imdbRating,
    rottenTomatoesRating,
    metacriticRating,
  };
};

export const calculateAverageRating = (omdbData: OmdbApiParams | undefined) => {
  const { imdbRating, rottenTomatoesRating, metacriticRating } = calculateRatings(omdbData);

  let sum = 0;
  let divisor = 0;

  if (imdbRating) {
    sum += imdbRating * 10; // convert the rate 2 digits, max 100.  (it provides like 7.4 )
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

  return averageRating;
};

