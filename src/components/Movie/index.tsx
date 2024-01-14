import React from "react";

interface MovieProps {
  item: any;
  onItemClick: (itemId: number) => void;
}

const Movie: React.FC<MovieProps> = ({ item, onItemClick }) => {
  return (
    <div onClick={() => onItemClick(item.episode_id)}>
      <h3>{item.title}</h3>
    </div>
  );
};

export default Movie;
