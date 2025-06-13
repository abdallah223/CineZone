import { IMAGEURL } from "../../utils/fetching";
import styles from "./MediaCard.module.css";
import { Link } from "react-router-dom";
import BookmarkButton from "./BookmarkButton";

export default function MovieCard({ movie, onloadWatchlist }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Link to={`/movie/${movie.id}`}>
          <div className={styles.image}>
            <img
              src={
                movie?.posterPath
                  ? `${IMAGEURL}w500${movie.posterPath}`
                  : "/images/poster.png"
              }
              alt="Movie Poster"
            />
          </div>
        </Link>
        <div className={styles.cardWrapper}>
          <ul>
            <li>
              <h4 className={styles.title}>{movie.title}</h4>
            </li>
            <li>
              <p className={styles.genere}>
                Genere :{" "}
                <span>
                  {movie.genres
                    ?.slice(0, 2)
                    .map((g) => g.name)
                    .join(", ")}
                </span>
              </p>
            </li>
            <li>
              <p className={styles.rate}>Rate :</p>
              <div className={`${styles.rate} iconed-text`}>
                <span className="icon">
                  <ion-icon name="star"></ion-icon>
                </span>
                <span className={styles.text}>
                  {movie.voteAverage?.toFixed(1)} / 10
                </span>
              </div>
            </li>
            <li>
              <p className={styles.duration}>Duration : </p>
              <span>
                <div className={`${styles.duration} iconed-text`}>
                  <span className={`icon`}>
                    <ion-icon name="timer-outline"></ion-icon>
                  </span>
                  <span className={styles.text}>
                    {Math.floor(movie.runtime / 60)}:
                    {(movie.runtime % 60).toString().padStart(2, "0")}
                  </span>
                </div>
              </span>
            </li>
            <li>
              <p className={styles.country}>
                Country :{" "}
                <span>
                  {movie.productionCountries
                    ?.map((country) => country.name)
                    .join(", ")}
                </span>
              </p>
            </li>
            <li className={styles.overview}>
              <p>{movie.overview}</p>
            </li>
            <li>
              <Link
                to={`/movie/${movie.id}`}
                className={`button active ${styles.center}`}
              >
                <span className={styles.text}>View More</span>
                <span className={styles.btnIcon}>
                  <ion-icon name="chevron-forward-outline"></ion-icon>
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <div className={styles.cardDetails}>
          <div className={styles.title}>
            <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
            {/* <button
              className={styles.bookmark}
              onClick={bookmarked ? handleRemoveWatchList : handleAddWatchlist}
            >
              <ion-icon
                class={styles.toggleable}
                name={bookmarked ? "bookmark" : "bookmark-outline"}
              ></ion-icon>
            </button> */}
            <BookmarkButton movie={movie} onloadWatchlist={onloadWatchlist} />
          </div>
          <div className={styles.rows}>
            <div className={styles.row}>
              <div className={`${styles.rate} iconed-text`}>
                <span className={`icon`}>
                  <ion-icon name="star"></ion-icon>
                </span>
                <span className={styles.text}>4.8 / 5.0</span>
              </div>
              <p className={styles.geners}>
                {movie.genres
                  ?.slice(0, 2)
                  .map((g) => g.name)
                  .join(", ")}
              </p>
            </div>
            <div className={styles.row}>
              <div className={`${styles.duration} iconed-text`}>
                <span className={`icon`}>
                  <ion-icon name="timer-outline"></ion-icon>
                </span>
                <span className={styles.text}>
                  {Math.floor(movie.runtime / 60)}:
                  {(movie.runtime % 60).toString().padStart(2, "0")}
                </span>
              </div>
              <p className={styles.year}>{movie.releaseDate?.slice(0, 4)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
