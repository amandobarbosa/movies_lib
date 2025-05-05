import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

import "./MoviesGrid.css";
const Home = () => {
  const [topMovies, setTopMovies] = useState([]);
  const getTopRatedMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setTopMovies(data.results);
  };
  useEffect(() => {
    const topRatedUrl = `${moviesURL}top_rated?${apiKey}`;
    getTopRatedMovies(topRatedUrl);
  }, []);
  return (
    <div className="container">
      <h2 className="title">Top Movies:</h2>
      <div className="movies-container">
        {topMovies?.length === 0 && <p>Loading...</p>}
        {topMovies?.length > 0 &&
          topMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
};
export default Home;
