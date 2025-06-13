import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import CategoriesAside from "../components/CategoriesAside";
import MovieCard from "../components/MediaCards/MovieCard";
import { URL, KEY, fetchMoviesWithDetails } from "../utils/fetching";
import Loader from "../components/Loaders/FilmLoader";

export default function Movies() {
  const { genreId } = useParams();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(+genreId || 28);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const handleCategoryClick = (id) => {
    setSelectedGenre(id);
    navigate(`/movies/${id}`);
  };
  const fetchMoreMovies = async () => {
    try {
      const data = await fetchMoviesWithDetails(
        `https://api.themoviedb.org/3/discover/movie?api_key=${KEY}&with_genres=${selectedGenre}&language=en-US&page=${page}`
      );

      if (data.length === 0) {
        setHasMore(false);
      } else {
        setMovies((prevMovies) => [...prevMovies, ...data]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (e) {
      console.error("Error fetching movies:", e);
    }
  };

  useEffect(() => {
    const resetAndFetch = async () => {
      setMovies([]);
      setPage(1);
      setHasMore(true);
      const data = await fetchMoviesWithDetails(
        `${URL}discover/movie?api_key=${KEY}&with_genres=${selectedGenre}&language=en-US&page=1`
      );
      setMovies(data);
      setPage(2);
    };
    resetAndFetch();
  }, [selectedGenre]);

  return (
    <section className="movies-page layout">
      <CategoriesAside
        onLinksClick={handleCategoryClick}
        currentCategory={selectedGenre}
        type="movie"
      />
      <div className="movie-grid-container">
        <InfiniteScroll
          dataLength={movies.length}
          next={fetchMoreMovies}
          hasMore={hasMore}
          loader={<Loader />}
          endMessage={<p>No more movies to load.</p>}
          className="hide-scrollbar"
          style={{ height: "100vh", minHeight: "800px" }}
        >
          <div className="movie-grid">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </section>
  );
}
