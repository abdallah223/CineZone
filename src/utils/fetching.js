import camelcaseKeys from "camelcase-keys";
export const URL = import.meta.env.VITE_API_BASE_URL;

export const IMAGEURL = import.meta.env.VITE_API_IMAGE_URL;

export const KEY = import.meta.env.VITE_API_KEY;
import { setBookmarkedPropToResults } from "./watchlist";
import { getCurrentUser } from "./auth";

export async function fetchingDataList(url, limit) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const apiData = await res.json();
    const results = camelcaseKeys(apiData.results, { deep: true });
    return results.slice(0, limit ?? results.length);
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}
export async function fetchingMovieCast(url, limit) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const apiData = await res.json();
    const results = camelcaseKeys(apiData.cast, { deep: true });
    return results.slice(0, limit ?? results.length);
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

export async function getFullMovieDetails(movies, type = "movie") {
  try {
    const detailedMovies = await Promise.all(
      movies.map((m) =>
        fetch(
          `https://api.themoviedb.org/3/${type}/${m.id}?api_key=${KEY}&language=en-US`
        )
          .then((res) => res.json())
          .then((data) => camelcaseKeys(data, { deep: true }))
      )
    );
    if (!getCurrentUser()) return detailedMovies;
    const results = setBookmarkedPropToResults(detailedMovies);
    return results;
  } catch (error) {
    console.error("Error fetching full movie details:", error);
    return [];
  }
}

export async function fetchMoviesWithDetails(endpoint, type = "movie", limit) {
  const list = await fetchingDataList(endpoint, limit);
  const detailed = await getFullMovieDetails(list, type);
  return detailed;
}

export async function fetchMoviePosters(id) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=${KEY}`
    );
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const apiData = await res.json();
    const posters = camelcaseKeys(apiData.posters, { deep: true });
    return posters.filter((poster) => poster.height === 3000);
  } catch (error) {
    console.error("Error fetching movie posters:", error);
    return [];
  }
}
export async function fetchMovieTrailers(id) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${KEY}&language=en-US`
    );
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const apiData = await res.json();
    const trailers = camelcaseKeys(apiData.results, { deep: true });
    return trailers.filter(
      (video) => video.site === "YouTube" && video.type === "Trailer"
    );
  } catch (error) {
    console.error("Error fetching movie trailers:", error);
    return [];
  }
}

export async function fetchingGenresList(type, limit) {
  try {
    const res =
      await fetch(`${URL}genre/${type}/list?api_key=${KEY}&language=en-US
`);
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const apiData = await res.json();

    const results = camelcaseKeys(apiData.genres, { deep: true });
    return results.slice(0, limit ?? results.length);
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

export async function getTop5GenresByName(
  type = "movie",
  topGenreNames = ["Action", "Drama", "Comedy", "Adventure", "Thriller"]
) {
  const url = `${URL}genre/${type}/list?api_key=${KEY}&language=en-US`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch genres");
    const apiData = await response.json();
    const data = camelcaseKeys(apiData, { deep: true });
    const genreMap = new Map(
      data.genres.map((genre) => [genre.name.toLowerCase(), genre])
    );
    const topGenres = topGenreNames
      .map((name) => genreMap.get(name.toLowerCase()))
      .filter(Boolean);
    return topGenres;
  } catch (error) {
    console.error("Error fetching genres:", error);
    return [];
  }
}
