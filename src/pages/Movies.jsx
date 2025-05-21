import { useEffect, useState } from "react";
const KEY = import.meta.env.VITE_API_KEY;
const imageBase = "https://image.tmdb.org/t/p/w500";

const categories = [
  { name: "Action", id: 28 },
  { name: "Comedy", id: 35 },
  { name: "Drama", id: 18 },
];

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(28); // Default: Action

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${KEY}&with_genres=${selectedGenre}&language=en-US`
      );
      const data = await res.json();
      setMovies(data.results);
    };
    fetchMovies();
  }, [selectedGenre]);

  return (
    <section className="movies-page">
      <h2 className="page-title">🎬 Movies by Category</h2>

      <div className="category-buttons">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={cat.id === selectedGenre ? "active" : ""}
            onClick={() => setSelectedGenre(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="movie-grid">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.id}>
            <div
              className="poster"
              style={{
                backgroundImage: `url(${imageBase}${movie.poster_path})`,
              }}
            ></div>
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <p>★ {movie.vote_average?.toFixed(1)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Movies;
