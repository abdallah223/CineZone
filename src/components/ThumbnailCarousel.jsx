import { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Link } from "react-router-dom";
import LargeBookmarkButton from "./LargeBookmarkButton";
import "@splidejs/react-splide/css";
import { setBookmarkedPropToResults } from "../utils/watchlist";
import NoResults from "./NoResults";

const KEY = import.meta.env.VITE_API_KEY;
const URL = import.meta.env.VITE_API_BASE_URL;
const IMAGEURL = import.meta.env.VITE_API_IMAGE_URL;

let cachedTrendingMovies = null;

const fetchTrendingMovies = async () => {
  const res = await fetch(
    `${URL}trending/movie/week?api_key=${KEY}&language=en-US`
  );
  const data = await res.json();

  const detailed = await Promise.all(
    data.results.map((m) =>
      fetch(
        `https://api.themoviedb.org/3/movie/${m.id}?api_key=${KEY}&language=en-US`
      ).then((res) => res.json())
    )
  ).then((movies) => setBookmarkedPropToResults(movies));

  cachedTrendingMovies = detailed;
  return detailed;
};

const TrendingSlider = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const init = async () => {
      if (cachedTrendingMovies) {
        setMovies(cachedTrendingMovies);
        setSelectedMovie(cachedTrendingMovies[0]);
      } else {
        const data = await fetchTrendingMovies();
        setMovies(data);
        setSelectedMovie(data[0]);
      }
    };

    init();
  }, []);

  if (!selectedMovie) return null;

  return movies.length === 0 ? (
    <NoResults />
  ) : (
    <section
      className="trending-container"
      style={{
        backgroundImage: `url(${IMAGEURL}w780${selectedMovie.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        transition: "background-image 0.5s ease-in-out",
      }}
    >
      <div className="backdrop-overlay"></div>

      <div className="trending-header">
        <div className="info">
          <h2 className="title">{selectedMovie.title}</h2>
          <div className="metadata">
            <span className="tag">Movie</span>
            <span>{selectedMovie.genres?.map((g) => g.name).join(", ")}</span>
            <div className="rate">
              <span className="icon">
                <ion-icon name="star"></ion-icon>
              </span>
              <span>{selectedMovie.vote_average?.toFixed(1)} / 10</span>
            </div>

            <span className="duration">
              <span className="icon">
                <ion-icon name="timer-outline"></ion-icon>
              </span>
              {Math.floor(selectedMovie.runtime / 60)}:
              {(selectedMovie.runtime % 60).toString().padStart(2, "0")}
            </span>
            <span className="year">
              <ion-icon className="icon" name="calendar-outline"></ion-icon>
              {selectedMovie.release_date?.slice(0, 4)}
            </span>
          </div>
          <p className="overview">{selectedMovie.overview}</p>
          <div className="buttons">
            <Link to={`movie/${selectedMovie.id}`} className="explore">
              Explore <ion-icon name="chevron-forward-outline"></ion-icon>
            </Link>
            <LargeBookmarkButton movie={selectedMovie} />
          </div>
        </div>
      </div>

      <div className="thumbnail-slider">
        <Splide
          options={{
            perPage: 5,
            gap: "1rem",
            pagination: false,
            arrows: false,
            breakpoints: {
              768: { perPage: 3 },
              500: { perPage: 2 },
            },
          }}
        >
          {movies.map((movie) => (
            <SplideSlide key={movie.id}>
              <div
                className={`poster ${
                  selectedMovie.id === movie.id ? "active" : ""
                }`}
                style={{
                  backgroundImage: `url(${IMAGEURL}w500${movie.poster_path})`,
                }}
                onClick={() => setSelectedMovie(movie)}
              />
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </section>
  );
};

export default TrendingSlider;
