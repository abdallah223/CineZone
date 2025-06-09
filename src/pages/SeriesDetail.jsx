/* eslint-disable no-unused-vars */
import Header from "./Header";
import TitledSection from "./TitledSection";
import FetchedSlider from "./FetchedSlider";
import {
  KEY,
  URL,
  IMAGEURL,
  fetchingMovieCast,
  fetchMoviesWithDetails,
} from "../utils/fetching";
import PageContainer from "./layout/PageContainer";
import MovieMedia from "./MovieMedia";
import Reviews from "./Reviews";
import MovieCard from "./MediaCards/MovieCard";
import { useParams } from "react-router-dom";
import camelcaseKeys from "camelcase-keys";
import { useState, useEffect } from "react";

export default function SeriesDetailes() {
  const { id } = useParams();
  const [series, setSeries] = useState(null);
  function formatRuntime(media) {
    const runtime =
      media.runtime ??
      (Array.isArray(media.episode_run_time) &&
      media.episode_run_time.length > 0
        ? media.episode_run_time[0]
        : 0);

    const hours = Math.floor(runtime / 60);
    const minutes = (runtime % 60).toString().padStart(2, "0");

    return `${hours}:${minutes}`;
  }

  useEffect(() => {
    const fetchSeriesDetails = async () => {
      try {
        const response = await fetch(
          `${URL}tv/${id}?api_key=${KEY}&language=en-US`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const apiData = await response.json();
        const data = camelcaseKeys(apiData, { deep: true });
        setSeries(data);
      } catch (error) {
        console.error("Error fetching Series details:", error);
      }
    };

    fetchSeriesDetails();
  });

  if (!series) return <p>Loading...</p>;

  return (
    <>
      <Header bgImg={`${IMAGEURL}w1280${series.backdropPath}`}>
        <div className="movie-header container">
          <div className="film-poster">
            <img src={`${IMAGEURL}w500${series.posterPath}`} alt="" />
          </div>
          <div className="trending-container">
            <div className="trending-data">
              <div className="title">
                <h3>{series.name}</h3>
              </div>
              <div className="meta-data">
                <ul>
                  <li className="type">
                    <span>Series </span>
                  </li>
                  <li className="geners">
                    <p>{series.genres?.map((g) => g.name).join(", ")}</p>
                  </li>
                  <li className="rate">
                    <span className="icon">
                      <ion-icon name="star"></ion-icon>
                    </span>
                    <span className="text">
                      {series.voteAverage?.toFixed(1)} / 10
                    </span>
                  </li>
                  <li className="duration">
                    <span className="icon">
                      <ion-icon name="timer-outline"></ion-icon>
                    </span>
                    <span className="text">
                      {`Avg ${formatRuntime(series)} / episode`}
                    </span>
                  </li>
                  <li className="year">
                    <span className="icon">
                      <ion-icon name="calendar-outline"></ion-icon>
                    </span>
                    <span className="text">
                      {series.firstAirDate?.slice(0, 4)}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="overview">
                <p>{series.overview}</p>
              </div>
              <div className="buttons">
                <a href="#" className="button active">
                  <span className="text">Add to Watchlist</span>
                  <span className="icon">
                    <ion-icon name="bookmark"></ion-icon>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Header>
      <PageContainer>
        <TitledSection title="Cast">
          <FetchedSlider
            slideContent={(cast) => (
              <div className="artist-card">
                <div className="photo">
                  <img
                    src={
                      cast.profilePath
                        ? `${IMAGEURL}w500${cast.profilePath}`
                        : "/images/profile.png"
                    }
                    alt=""
                  />
                </div>
                <div className="details">
                  <div className="title">
                    <h5>{cast.name}</h5>
                  </div>
                  <div className="role">
                    <span>{cast.character}</span>
                  </div>
                </div>
              </div>
            )}
            endpoint={`${URL}cast/${series.id}/credits?api_key=${KEY}&language=en-US"`}
            fetchFunction={fetchingMovieCast}
          ></FetchedSlider>
        </TitledSection>
        <MovieMedia movieId={series.id} />
        <Reviews movieId={series.id} />
        <TitledSection title="More Like This">
          <FetchedSlider
            slideContent={(series, index) => (
              <SeriesCard movie={series} index={index} />
            )}
            endpoint={`${URL}tv/${series.id}/similar?api_key=${KEY}`}
            fetchFunction={fetchMoviesWithDetails}
            options={{ perPage: 4 }}
          ></FetchedSlider>
        </TitledSection>
      </PageContainer>
    </>
  );
}
