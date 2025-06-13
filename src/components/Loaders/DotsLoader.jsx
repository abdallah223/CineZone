import styles from "./Loader.module.css";
export default function DotsLoader() {
  return (
    <div className={styles.dotsContainer}>
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className={styles.dot}
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  );
}
