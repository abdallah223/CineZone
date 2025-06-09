import styles from "./NoResults.module.css";
export default function NoResults({
  message = "No items right now",
  icon = <ion-icon name="cloud-offline-outline"></ion-icon>,
  subMessage = "Check back later or try adjusting your filters",
  className = "",
}) {
  return (
    <div className={`${styles.noResults} ${className}`}>
      <div className={styles.iconContainer}>
        <span className={styles.icon} role="img" aria-label="No results">
          {icon}
        </span>
      </div>
      <h3 className={styles.message}>{message}</h3>
      {subMessage && <p className={styles.subMessage}>{subMessage}</p>}
    </div>
  );
}
