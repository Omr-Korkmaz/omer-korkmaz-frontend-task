import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Movie from "./components/Movie";
import useFetch from "./hooks/useFetch";
import MovieList from "./components/MovieList";

function App() {


  return (
    <div className="App">
      <MovieList />
    </div>
  );
}

export default App;
