import styles from "./Loader.module.css";

export default function FilmLoader() {
  return (
    <div className={styles.container}>
      <div className={styles.filmStrip}>
        <div className={styles.sprocketRow}>
          {[...Array(12)].map((_, i) => (
            <div key={`top-${i}`} className={styles.sprocketHole} />
          ))}
        </div>
        <div className={`${styles.sprocketRow} ${styles.sprocketBottom}`}>
          {[...Array(12)].map((_, i) => (
            <div key={`bottom-${i}`} className={styles.sprocketHole} />
          ))}
        </div>
        <div className={styles.frameContainer}>
          {[...Array(8)].map((_, i) => (
            <div
              key={`set1-${i}`}
              className={styles.frame}
              style={{
                backgroundColor: i % 2 === 0 ? "#03E1F5" : "#0299A6",
              }}
            />
          ))}
          {[...Array(8)].map((_, i) => (
            <div
              key={`set2-${i}`}
              className={styles.frame}
              style={{
                backgroundColor: i % 2 === 0 ? "#03E1F5" : "#0891b2",
              }}
            />
          ))}
        </div>
      </div>
      <div className={styles.loadingText}>
        <h2 className={styles.title}>Loading</h2>
      </div>
    </div>
  );
}
