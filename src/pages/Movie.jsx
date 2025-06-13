import Header from "../components/Header";
import TitledSection from "../components/TitledSection";
import FetchedSlider from "../components/FetchedSlider";
import {
  KEY,
  URL,
  IMAGEURL,
  fetchingMovieCast,
  fetchMoviesWithDetails,
} from "../utils/fetching";
import PageContainer from "../components/layout/PageContainer";
import MovieMedia from "../components/MovieMedia";
import Reviews from "../components/Reviews";
import MovieCard from "../components/MediaCards/MovieCard";
import { useParams } from "react-router-dom";
import camelcaseKeys from "camelcase-keys";
import { useState, useEffect } from "react";
import { setBookmarkedPropToMovie } from "../utils/watchlist";
import LargeBookmarkButton from "../components/LargeBookmarkButton";

export default function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `${URL}movie/${id}?api_key=${KEY}&language=en-US`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const apiData = await response.json();
        const bookmarkedMovie = await setBookmarkedPropToMovie(apiData);
        const data = camelcaseKeys(bookmarkedMovie, { deep: true });
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <>
      <Header bgImg={`${IMAGEURL}w1280${movie.backdropPath}`}>
        <div className="movie-header container">
          <div className="film-poster">
            <img
              src={
                movie?.posterPath
                  ? `${IMAGEURL}w500${movie.posterPath}`
                  : "/images/poster.png"
              }
              alt="Movie Poster"
            />
          </div>
          <div className="trending-container">
            <div className="trending-data">
              <div className="title">
                <h3>{movie.title}</h3>
              </div>
              <div className="meta-data">
                <ul>
                  <li className="type">
                    <span>Movie </span>
                  </li>
                  <li className="geners">
                    <p>{movie.genres?.map((g) => g.name).join(", ")}</p>
                  </li>
                  <li className="rate">
                    <span className="icon">
                      <ion-icon name="star"></ion-icon>
                    </span>
                    <span className="text">
                      {movie.voteAverage?.toFixed(1)} / 10
                    </span>
                  </li>
                  <li className="duration">
                    <span className="icon">
                      <ion-icon name="timer-outline"></ion-icon>
                    </span>
                    <span className="text">
                      {Math.floor(movie.runtime / 60)}:
                      {(movie.runtime % 60).toString().padStart(2, "0")}
                    </span>
                  </li>
                  <li className="year">
                    <span className="icon">
                      <ion-icon name="calendar-outline"></ion-icon>
                    </span>
                    <span className="text">
                      {movie.releaseDate?.slice(0, 4)}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="overview">
                <p>{movie.overview}</p>
              </div>
              <div className="buttons">
                <LargeBookmarkButton movie={movie} />
              </div>
            </div>
          </div>
        </div>
      </Header>
      <PageContainer>
        <TitledSection title="Cast">
          <FetchedSlider
            slideContent={(movie) => (
              <div className="artist-card">
                <div className="photo">
                  <img
                    src={
                      movie.profilePath
                        ? `${IMAGEURL}w500${movie.profilePath}`
                        : "/images/profile.png"
                    }
                    alt=""
                  />
                </div>
                <div className="details">
                  <div className="title">
                    <h5>{movie.name}</h5>
                  </div>
                  <div className="role">
                    <span>{movie.character}</span>
                  </div>
                </div>
              </div>
            )}
            endpoint={`${URL}movie/${movie.id}/credits?api_key=${KEY}&language=en-US"`}
            fetchFunction={fetchingMovieCast}
            options={{ perPage: 5, gap: "1rem" }}
          ></FetchedSlider>
        </TitledSection>
        <MovieMedia movieId={movie.id} />
        <Reviews movieId={movie.id} />
        <TitledSection title="More Like This">
          <FetchedSlider
            slideContent={(movie, index) => (
              <MovieCard movie={movie} index={index} />
            )}
            endpoint={`${URL}movie/${movie.id}/similar?api_key=${KEY}`}
            fetchFunction={fetchMoviesWithDetails}
            options={{ perPage: 4 }}
          ></FetchedSlider>
        </TitledSection>
      </PageContainer>
    </>
  );
}
