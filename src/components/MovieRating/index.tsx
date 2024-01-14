import React from 'react';
import useFetchApi from '../../hooks/useFetchApi';
import { OmdbApiParams, OmdbApiRating } from '../../types/omdbParams';

import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
interface MovieRatingProps {
  title: string;
}

const MovieRating: React.FC<MovieRatingProps> = ({ title }) => {
  const apiKey = '63fd3c86';
  const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(title)}`;
  const { data: omdbData, loading: omdbLoading, error: omdbError } = useFetchApi<OmdbApiParams>(apiUrl);

  console.log("omdbData", omdbData?.Title);

  const imdbRating = parseFloat(omdbData?.Ratings?.find((rating: OmdbApiRating) => rating.Source === 'Internet Movie Database')?.Value) || 0;
  const rottenTomatoesRating = parseInt(omdbData?.Ratings?.find((rating: OmdbApiRating) => rating.Source === 'Rotten Tomatoes')?.Value) || 0;
  const metacriticRating = parseInt(omdbData?.Ratings?.find((rating: OmdbApiRating) => rating.Source === 'Metacritic')?.Value) || 0;

  let sum = 0;
  let divisor = 0;

  if (imdbRating) {
    sum += imdbRating * 10;
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


  const roundedRating = Math.round(averageRating)/10;

  const stars: JSX.Element[] = [];

  for (let i = 0; i < roundedRating; i++) {
    stars.push(<StarIcon key={i} style={{ fill: 'orange', fontSize: 24 }} />);
  }

  for (let i = roundedRating; i < 10; i++) {
    stars.push(<StarOutlineIcon key={i} style={{ color: 'grey', fontSize: 24 }} />);
  }
  


  return (
    <div>
      <p>IMDB Rating: {imdbRating}</p>
      <p>Rotten Tomatoes Rating: {rottenTomatoesRating}</p>
      <p>Metacritic Rating: {metacriticRating}</p>
      <p>Average Rating: {roundedRating}</p>

      <div>
{stars}
      </div>

    </div>
  );
};

export default MovieRating;
