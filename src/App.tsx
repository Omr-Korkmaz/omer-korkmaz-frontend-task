import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Movie from "./components/Movie";
import useFetch from "./hooks/useFetch";

function App() {
  const { data, loading, error } = useFetch<any>(
    "https://swapi.dev/api/films/?format=json"
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  console.log("Fetched Data:", data);

  return (
    <div className="App">
      <Movie />
    </div>
  );
}

export default App;
