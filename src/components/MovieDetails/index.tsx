import React from "react";
import useFetchApi from "../../hooks/useFetchApi";
import { OmdbApiParams } from "../../types/omdbParams";

interface MovieDetailsProps {
  selectedItem: any | null;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ selectedItem }) => {
  console.log(selectedItem);

  const apiKey = "63fd3c86";
  const title = "The Empire Strikes Back";

  const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(
    title
  )}`;

  const { data, loading, error } = useFetchApi<OmdbApiParams>(apiUrl);

  // const { data: secondApiData, loading: secondApiLoading, error: secondApiError } = useOmdbApi(`https://www.omdbapi.com/?apikey=63fd3c86&t=${encodeURIComponent("Attack of the Clones")}`);

  console.log("dada", data);

  if (!selectedItem) {
    return <div>No movie selected</div>;
  }

  return (
    <div>
      <h2>{selectedItem.title}</h2>
    </div>
  );
};

export default MovieDetails;
