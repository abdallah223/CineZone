import { fetchingDataList, KEY, URL, IMAGEURL } from "../utils/fetching";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function BannerList({ itemsNumber }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const region = new Intl.Locale(navigator.language).region || "US";
      try {
        const movies = await fetchingDataList(
          `${URL}movie/upcoming?api_key=${KEY}&region=${region}&page=1`
        );
        const updatedMovies = movies
          .filter((movie) => new Date(movie.releaseDate) > new Date())
          .sort((a, b) => b.popularity - a.popularity);
        setMovies(updatedMovies.slice(0, itemsNumber));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMovies();
  }, [itemsNumber]);

  return (
    <>
      {movies.map((movie) => (
        <FullWidthMovieBanner movie={movie} key={movie.id} />
      ))}
    </>
  );
}

function FullWidthMovieBanner({ movie }) {
  return (
    <section className="comming-soon sec-margin">
      <div
        className="comming-item"
        style={{
          backgroundImage: `url("${IMAGEURL}original${movie.backdropPath}")`,
        }}
      >
        <div className="overlay">
          <Link to={`/movie/${movie.id}#media`} className="button active">
            <span className="text">Watch trailer</span>
            <span className="btn-icon">
              <ion-icon name="film-outline"></ion-icon>
            </span>
          </Link>
          <div className="soon-details">
            <h4 className="title">{movie.title}</h4>
            <span className="date">{movie.releaseDate}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
