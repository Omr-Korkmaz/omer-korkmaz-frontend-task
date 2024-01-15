import React from "react";
import useFetchApi from "../../hooks/useFetchApi";
import { OmdbApiParams, OmdbApiRating } from "../../types/omdbParams";
import { swapiApiParams } from "../../types/swapiApiParams";
import MovieRating from "../MovieRating";
import convertLatinToRomanUtils from "../../utils/convertLatintoRomanUtils";
import { Typography, Box } from "@mui/material";
import {parseAndConvertToPercentage} from '../../utils/parseAndConvertToPercentage'

interface MovieDetailsProps {
  selectedItem: any | null;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ selectedItem }) => {
  let getFullTitle = `Episode ${convertLatinToRomanUtils(
    selectedItem?.episode_id
  )} - ${selectedItem?.title}`;

  console.log("getfull", getFullTitle);

  const apiKey = "63fd3c86";
  const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(
    getFullTitle
  )}`;
  // const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&t=Episode III - Revenge of the Sith
  // )}`;
  const {
    data: omdbData,
    loading: omdbLoading,
    error: omdbError,
  } = useFetchApi<OmdbApiParams>(apiUrl);

  return (
    <section>
      {!selectedItem ? (
        <Box sx={{ padding: "20px" }}>
          {" "}
          <Typography variant="body1">No movie selected</Typography>{" "}
        </Box>
      ) : (
        <Box sx={{ padding: "20px" }}>
          <Typography sx={{ fontSize: "2rem", width: "100%" }}>
            {selectedItem.title}
          </Typography>
          <Box display="flex" sx={{ width: "100%" }}>
            <Box
              sx={{
                width: "300px",
                marginBottom: "16px",
                height: "300px",
                overflow: "hidden",
                borderRadius: "3px",
              }}
            >
              <img
                src={omdbData?.Poster}
                alt={selectedItem.title}
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </Box>

            <Box flexGrow={1} sx={{ width: "100%", padding: "10px" }}>
              <Typography variant="body1" color="text.secondary">
                {selectedItem.opening_crawl}
              </Typography>
            </Box>
          </Box>

          <Typography sx={{}}>Directed by: {selectedItem.director}</Typography>

          <Box
            display="flex"
            sx={{
              justifyContent: "center",
              alignItems: "center",
              margin: "10px 0",
            }}
          >
            <Box>
              <Typography>Average Rating</Typography>
            </Box>

            <Box flexGrow={1}>
              <MovieRating selectedItem={selectedItem} />
            </Box>
          </Box>

          <Box sx={{display:'flex', gap:'20px'}}>
            {omdbData?.Ratings ? (
              omdbData?.Ratings.map((rating: OmdbApiRating, index: number) => (
                <div key={index}>
                  <Typography sx={{border:'1px solid #4B9CD3', borderRadius:'20px', padding:'7px', color:'#4B9CD3'}}>
                    {rating.Source
                      ? rating.Source
                      : `There is no rate yet ${rating.Source}`}{" "}
                    {/* : {rating.Value} */}
 : {`${parseAndConvertToPercentage(rating.Value)}%`}
  
                  </Typography>
                </div>
              ))
            ) : (
              <Typography variant="subtitle1">No ratings available</Typography>
            )}
          </Box>
        </Box>
      )}
    </section>
  );
};

export default MovieDetails;
