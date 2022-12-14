import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";

const API_LINK = 'https://react-movie-http-e2e89-default-rtdb.firebaseio.com/demomovies.json';

const App = () => {

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addMovieHandler = async (movie) => {
    const response = await fetch(API_LINK,{
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type': 'application/json' 
      }
    })
    const data = await response.json();
    console.log(data);
  }

  const fetchMovieHandler = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_LINK);
      if (!response.ok) {
        throw new Error('Unable to fetch data.');
      }
      const data = await response.json();
      // console.log(data);
      let responseMovies = [];
      for(let key in data){
        responseMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate
        })
      }
      setMovies(responseMovies);
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
        <AddMovie onAdd={addMovieHandler}/>
      </section>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!loading && movies.length > 0 && <MoviesList movies={movies} />}
        {!loading && movies.length === 0 && !error && <p>No Movies.</p>}
        {loading && <p>Loading....</p>}
        {!loading && error && <p>{error}</p>}
        {/* {error && <button onClick={onCancelRequestHandler}>Cancel</button>} */}
      </section>
    </React.Fragment>
  );
};

export default App;