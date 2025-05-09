import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import "./MoviesGrid.css";
import { useEffect, useState } from "react";
const searchURl = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

const Search = () => {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);

  const query = searchParams.get("q");

  const getSearchedMovie = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setMovies(data.results);
  };
  useEffect(() => {
    const searchWithQueryURL = `${searchURl}?${apiKey}&query=${query}`;
    getSearchedMovie(searchWithQueryURL);
  }, [query]);

  return (
    <div className="container">
      <h2 className="title">
        Results for: <span className="query-text">{query}</span>
      </h2>
      <div className="movies-container">
        {movies?.length === 0 && <p>Loading...</p>}
        {movies?.length > 0 &&
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
};
export default Search;
