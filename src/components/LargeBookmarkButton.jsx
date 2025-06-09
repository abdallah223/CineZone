import { addToWatchlist, removeFromWatchlist } from "../utils/watchlist";
import { showToast, confirmAction } from "../utils/alerts";
import { useState } from "react";

export default function BookmarkButton({ movie, onloadWatchlist }) {
  const [bookmarked, setBookmarked] = useState(movie.bookmarked || false);
  const handleAddWatchlist = async () => {
    try {
      await addToWatchlist(movie);
      setBookmarked(!bookmarked);
      showToast("Added to watchlist");
    } catch (err) {
      showToast(err.message || "Failed to add to watchlist", "error");
    }
  };
  const handleRemoveWatchList = async () => {
    const confirmed = await confirmAction(
      "Remove from Watchlist?",
      "This action cannot be undone."
    );
    if (!confirmed) return;
    await removeFromWatchlist(movie.id);
    onloadWatchlist && (await onloadWatchlist());
    setBookmarked(false);
    showToast("Removed from watchlist");
  };
  return (
    <button
      className="button active"
      onClick={bookmarked ? handleRemoveWatchList : handleAddWatchlist}
    >
      <span className="text">
        {bookmarked ? "In Watchlist" : "Add to Watchlist"}
      </span>
      <span className="icon">
        <ion-icon
          name={bookmarked ? "bookmark" : "bookmark-outline"}
        ></ion-icon>
      </span>
    </button>
  );
}
