import TitledSection from "./TitledSection";
import FetchedSLider from "./FetchedSlider";
import MovieCard from "./MediaCards/MovieCard";
import { KEY, fetchMoviesWithDetails } from "../utils/fetching";
import { getTop5GenresByName } from "../utils/fetching";
import { useEffect, useState } from "react";

export default function MoviesGenreslist() {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genres = await getTop5GenresByName();
        setGenres(genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchGenres();
  }, []);
  return (
    <>
      {genres.map((genre) => (
        <TitledSection
          key={genre.id}
          title={genre.name}
          link={`movies/${genre.id}`}
        >
          <FetchedSLider
            endpoint={`https://api.themoviedb.org/3/discover/movie?api_key=${KEY}&with_genres=${genre.id}&language=en-US`}
            fetchFunction={fetchMoviesWithDetails}
            slideContent={(movie, index) => (
              <MovieCard movie={movie} index={index} />
            )}
            options={{ perPage: 4 }}
          />
        </TitledSection>
      ))}
    </>
  );
}
