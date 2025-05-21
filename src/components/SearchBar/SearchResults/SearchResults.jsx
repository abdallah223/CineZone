import { useEffect, useState } from "react";

const URL = import.meta.env.VITE_API_BASE_URL;
const IMAGEURL = import.meta.env.VITE_API_IMAGE_URL;
const KEY = import.meta.env.VITE_API_KEY;
import styles from "./SearchResults.module.css";

export default function SearchResults({ query, category = "all" }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query || query.trim() === "") {
      setResults([]);
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchResults = async () => {
      setLoading(true);
      setError(null);

      try {
        let endpoint = "";

        if (category === "movies") {
          endpoint = `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&query=${encodeURIComponent(
            query
          )}&include_adult=false`;
        } else if (category === "series") {
          endpoint = `https://api.themoviedb.org/3/search/tv?api_key=${KEY}&query=${encodeURIComponent(
            query
          )}&include_adult=false`;
        } else {
          endpoint = `https://api.themoviedb.org/3/search/multi?api_key=${KEY}&query=${encodeURIComponent(
            query
          )}&include_adult=false`;
        }

        const response = await fetch(endpoint, { signal });

        if (!response.ok) {
          throw new Error("Failed to fetch results");
        }

        const data = await response.json();
        setResults(data.results.slice(0, 6));
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("An error occurred while fetching search results");
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchResults, 500);

    return () => {
      clearTimeout(timeoutId);
      controller.abort(); // 🚫 cancel previous fetch if it’s still running
    };
  }, [query, category]);
  useEffect(() => {
    if (!query || query.trim() === "") {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      setError(null);

      try {
        let endpoint = "";

        if (category === "movies") {
          endpoint = `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&query=${encodeURIComponent(
            query
          )}&include_adult=false`;
        } else if (category === "series") {
          endpoint = `https://api.themoviedb.org/3/search/tv?api_key=${KEY}&query=${encodeURIComponent(
            query
          )}&include_adult=false`;
        } else {
          endpoint = `https://api.themoviedb.org/3/search/multi?api_key=${KEY}&query=${encodeURIComponent(
            query
          )}&include_adult=false`;
        }

        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error("Failed to fetch results");
        }

        const data = await response.json();
        setResults(data.results.slice(0, 6));
      } catch (err) {
        setError("An error occurred while fetching search results");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchResults();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query, category]);

  if (loading) {
    return (
      <div className={styles.searchResults}>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.searchResults}>
        <div className={styles.error}>{error}</div>
      </div>
    );
  }

  if (results.length === 0 && query && query.trim() !== "") {
    return (
      <div className={styles.searchResults}>
        <div className={styles.noResults}>No results found for "{query}"</div>
      </div>
    );
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <div className={styles.searchResults}>
      <h3 className={styles.resultsTitle}>Search Results</h3>
      <div className={styles.resultsList}>
        {results.map((item) => (
          <div className={styles.resultItem} key={item.id}>
            <div className={styles.posterContainer}>
              {item.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                  alt={item.title || item.name}
                  className={styles.poster}
                />
              ) : (
                <div className={styles.noPoster}>No Image</div>
              )}
            </div>
            <div className={styles.itemDetails}>
              <h4 className={styles.itemTitle}>{item.title || item.name}</h4>
              <div className={styles.itemMeta}>
                <span className={styles.year}>
                  {(item.release_date || item.first_air_date || "").substring(
                    0,
                    4
                  )}
                </span>
                <span className={styles.type}>
                  {item.media_type === "tv" ? "TV Series" : "Movie"}
                </span>
                {item.vote_average > 0 && (
                  <span className={styles.rating}>
                    ★ {item.vote_average.toFixed(1)}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {results.length > 0 && (
        <div className={styles.viewAllContainer}>
          <button className={styles.viewAllBtn}>View All Results</button>
        </div>
      )}
    </div>
  );
}
