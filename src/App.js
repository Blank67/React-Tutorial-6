import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

const App = () => {

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovieHandler = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/film");
      if (!response.ok) {
        throw new Error('Unable to fetch data.');
      }
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
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }, [])

  useEffect(() => {
    fetchMovieHandler();
  }, [fetchMovieHandler]);


  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!loading && movies.length > 0 && <MoviesList movies={movies} />}
        {!loading && movies.length === 0 && !error && <p>No Movies.</p>}
        {loading && <p>Loading....</p>}
        {!loading && error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
};

export default App;
