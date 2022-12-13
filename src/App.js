import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

const App = () => {

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMovieHandler = async () => {
    setLoading(true);
    const response = await fetch("https://swapi.dev/api/films");
    const data = await response.json();
    const updatedMovies = data.results.map((itm) => {
      return {
        id: itm.episode_id,
        title: itm.title,
        openingText: itm.opening_crawl,
        releaseDate: itm.release_date
      }
    });
    setMovies(updatedMovies);
    setLoading(false);
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!loading && movies.length>0 && <MoviesList movies={movies} />}
        {!loading && movies.length===0 && <p>No Movies.</p>}
        {loading && <p>Loading....</p>}
      </section>
    </React.Fragment>
  );
};

export default App;
