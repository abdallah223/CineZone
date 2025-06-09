import { addToWatchlist, removeFromWatchlist } from "../../utils/watchlist";
import { showToast, confirmAction } from "../../utils/alerts";
import { useState } from "react";
import styles from "./MediaCard.module.css";

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
      className={styles.bookmark}
      onClick={bookmarked ? handleRemoveWatchList : handleAddWatchlist}
    >
      <ion-icon
        class={styles.toggleable}
        name={bookmarked ? "bookmark" : "bookmark-outline"}
      ></ion-icon>
    </button>
  );
}
