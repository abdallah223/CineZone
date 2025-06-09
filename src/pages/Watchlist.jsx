import { useEffect, useState } from "react";
import { getWatchlist, removeFromWatchlist } from "../utils/watchlist";
import MovieCard from "../components/MediaCards/MovieCard";
import SeriesCard from "../components/MediaCards/SeriesCard";
import TitledSection from "../components/TitledSection";
import Loader from "../components/FilmLoader";

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);

  const loadWatchlist = async () => {
    const list = await getWatchlist();
    setWatchlist(list);
  };

  useEffect(() => {
    loadWatchlist();
  }, []);

  const handleRemove = async (id) => {
    await removeFromWatchlist(id);
    await loadWatchlist();
  };

  return (
    <TitledSection title="Watchlist">
      <div className="movie-grid">
        {watchlist.map((movie) => (
          <div key={movie.id}>
            {movie.title && (
              <MovieCard movie={movie} onloadWatchlist={loadWatchlist} />
            )}
            {movie.name && (
              <SeriesCard movie={movie} onloadWatchlist={loadWatchlist} />
            )}
            <button
              onClick={async () => {
                await handleRemove(movie.id);
                alert("Removed from watchlist!");
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </TitledSection>
  );
}
