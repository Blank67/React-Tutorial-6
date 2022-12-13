import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

const App = () => {

  const [movies, setMovies] = useState([]);

    const fetchMovieHandler = () => {
        fetch("https://swapi.dev/api/films")
            .then((res) => {
              return res.json(); //Convert data from Json into obj
            })
            .then((data) => {
              const updatedMovies = data.results.map((itm) =>{
                return {
                  id: itm.episode_id,
                  title: itm.title,
                  openingText: itm.opening_crawl,
                  releaseDate: itm.release_date
                }
              });
              setMovies(updatedMovies);
            })
            .catch((err) => console.log("Fetch Error", err));
    };

    return (
        <React.Fragment>
            <section>
                <button onClick={fetchMovieHandler}>Fetch Movies</button>
            </section>
            <section>
                <MoviesList movies={movies} />
            </section>
        </React.Fragment>
    );
};

export default App;
