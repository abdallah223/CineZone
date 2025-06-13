import { initDB } from "./db";
import { getCurrentUser } from "./auth";

export async function addToWatchlist(movie) {
  const db = await initDB();
  const username = getCurrentUser();
  if (!username) throw new Error("You must be logged in to access watchlist");

  await db.add("watchlists", {
    username,
    ...movie,
    bookmarked: true,
  });
}

export async function removeFromWatchlist(movieId) {
  const db = await initDB();
  const username = getCurrentUser();
  if (!username) throw new Error("You must be logged in to access watchlist");
  console.log("delete", movieId, username);
  await db.delete("watchlists", [username, movieId]);
}

export async function getWatchlist() {
  const db = await initDB();
  const username = getCurrentUser();
  const index = db.transaction("watchlists").store.index("username");
  return index.getAll(username);
}

export async function setBookmarkedPropToResults(...results) {
  const movies = results.flat();

  const bookmarkedMovies = await getWatchlist();
  const bookmarkedIds = new Set(bookmarkedMovies.map((m) => m.id));

  return movies.map((movie) => ({
    ...movie,
    bookmarked: bookmarkedIds.has(movie.id),
  }));
}
export async function setBookmarkedPropToMovie(movie) {
  const bookmarkedMovies = await getWatchlist();
  const bookmarkedIds = new Set(bookmarkedMovies.map((m) => m.id));

  return {
    ...movie,
    bookmarked: bookmarkedIds.has(movie.id),
  };
}
