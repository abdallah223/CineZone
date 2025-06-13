import { useEffect, useState } from "react";
import { getWatchlist } from "../utils/watchlist";
import MovieCard from "../components/MediaCards/MovieCard";
import SeriesCard from "../components/MediaCards/TvShowCard";
import TitledSection from "../components/TitledSection";

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);

  const loadWatchlist = async () => {
    const list = await getWatchlist();
    setWatchlist(list);
  };

  useEffect(() => {
    loadWatchlist();
  }, []);

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
          </div>
        ))}
      </div>
    </TitledSection>
  );
}
