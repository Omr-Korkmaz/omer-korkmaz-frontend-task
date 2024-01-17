import React from "react";
import useFetchApi from "../../hooks/useFetchApi";
import { OmdbApiParams, OmdbApiRating } from "../../types/omdbParams";
import { swapiApiParams } from "../../types/swapiApiParams";
import MovieRating from "../MovieRating";
import { Typography, Box } from "@mui/material";
import { parseAndConvertToPercentageUtils } from "../../utils/parseAndConvertToPercentageUtils";
import Loading from "../Loading";

interface MovieDetailsProps {
  selectedItem: swapiApiParams | null;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ selectedItem }) => {
  console.log("getfull", selectedItem?.fullName);

  const fullName = selectedItem?.fullName || ""; //  fix type complain -  need a default value

  const apiKey = "b9a5e69d";
  const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(
    fullName
  )}`;

  const {
    data: omdbData,
    isLoading: omdbLoading,
    error: omdbError,
  } = useFetchApi<OmdbApiParams>(apiUrl);

  return (
    <section>
      {!selectedItem ? (
        <Box sx={{ padding: "20px" }}>
          <Typography>No movie selected from the list</Typography>{" "}
        </Box>
      ) : (
        <Box sx={{ padding: "20px" }}>
          <Typography sx={{ fontSize: "1.6rem", width: "100%" }}>
            {selectedItem.fullName}
          </Typography>
          <Box
            sx={{
              display: "flex",
              marginBottom: "16px",
              flexDirection: "row",
              width: "100%",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            {omdbLoading && <Loading loading={omdbLoading} />}

            {omdbError && (
              <Box>
                {" "}
                <Typography variant="body2" color="error">
                  Error SwapiApi: {omdbError.message}
                </Typography>
              </Box>
            )}
            {!omdbLoading && !omdbError && (
              <Box
                sx={{
                  width: "220px",

                  height: "200px",
                  overflow: "hidden",
                  borderRadius: "3px",
                  marginTop: "16px",
                }}
              >
                <img
                  src={omdbData?.Poster}
                  alt={omdbData?.Title}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>
            )}

            <Box sx={{ width: "100%", padding: "10px" }}>
              <Typography color="text.secondary" sx={{ fontSize: "0.9rem" }}>
                {selectedItem.opening_crawl}
              </Typography>
            </Box>
          </Box>

          <Typography sx={{ fontSize: "0.9rem" }}>
            Directed by: {selectedItem.director}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "10px 0",
              gap: "5px",
            }}
          >
            <Box>
              <Typography sx={{ fontSize: "0.9rem", marginBottom: "4px" }}>
                Average Rating
              </Typography>
            </Box>

            <Box flexGrow={1}>
              <MovieRating movie={selectedItem} />
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: "20px" }}>
            {omdbData?.Ratings ? (
              omdbData?.Ratings.map((rating: OmdbApiRating, index: number) => (
                <div key={index}>
                  <Typography
                    sx={{
                      border: "1px solid #4B9CD3",
                      borderRadius: "20px",
                      padding: "7px",
                      color: "#4B9CD3",
                      fontSize: "0.9rem",
                    }}
                  >
                    {rating.Source
                      ? rating.Source
                      : `There is no rate yet ${rating.Source}`}{" "}
                    {`${parseAndConvertToPercentageUtils(rating.Value)}%`}
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
