import React, { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import Filter from '../Filter';
import styles from './movieList.module.css';
import Movie from '../Movie';
import MovieDetails from '../MovieDetails';
import filterUtils from '../../utils/filterUtils';

interface MovieListProps {
  onSelectMovie: (movie: any) => void;
}

const MovieList: React.FC<MovieListProps> = ({ onSelectMovie }) => {


  return (
    <div>

    </div>
  );
};

export default MovieList;
