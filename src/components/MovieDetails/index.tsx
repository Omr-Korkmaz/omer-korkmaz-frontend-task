import React from "react";

interface MovieDetailsProps {
  selectedItem: any | null;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ selectedItem }) => {
  if (!selectedItem) {
    return <div>No movie selected</div>;
  }

  return (
    <div>
      <h2>{selectedItem.title}</h2>
      {selectedItem.direction && <p>Direction: {selectedItem.direction}</p>}
    </div>
  );
};

export default MovieDetails;
