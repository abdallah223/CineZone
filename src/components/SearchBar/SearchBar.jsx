import { useEffect, useState } from "react";
import Dropdown from "./Dropdown/Dropdown";
import styles from "./SearchBar.module.css";
import { Search } from "lucide-react";
import SearchResults from "./SearchResults/SearchResults";

export default function SearchBar() {
  const [collapsed, setCollapsed] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 900px)");
    const handleScreenChange = (e) => {
      setCollapsed(e.matches);
    };
    handleScreenChange(mediaQuery);
    mediaQuery.addEventListener("change", handleScreenChange);
    return () => {
      mediaQuery.removeEventListener("change", handleScreenChange);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isClickInsideSearchbar = event.target.closest(
        `.${styles.searchBarContainer}`
      );
      if (!isClickInsideSearchbar && showResults) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showResults]);

  // Handle input changes
  const handleInputChange = (e) => {
    setQuery(e.target.value);
    // Show results if there is text in the input
    if (e.target.value.trim()) {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  // Handle category changes from dropdown
  const handleCategoryChange = (option) => {
    setCategory(option.value);
    // If there's already a query, show updated results
    if (query.trim()) {
      setShowResults(true);
    }
  };

  return (
    <div
      className={`${styles.searchBarContainer} ${
        collapsed ? styles.wrapped : ""
      }`}
    >
      <div className={styles.searchBar}>
        <form>
          <button
            className={styles.searchBtn}
            type="submit"
            onClick={(e) => {
              if (collapsed) {
                e.preventDefault();
                setCollapsed(false);
              }
            }}
          >
            <Search className={styles.searchIcon} />
          </button>
          <input
            placeholder="Search"
            type="search"
            autoComplete="off"
            onChange={handleInputChange}
            value={query}
            name="main-search"
            onFocus={() => query.trim() && setShowResults(true)}
          />

          <Dropdown
            options={[
              { label: "All", value: "all" },
              { label: "Movies", value: "movies" },
              { label: "Series", value: "series" },
            ]}
            defaultLabel={category}
            onChange={handleCategoryChange}
          />
        </form>
      </div>
      {!collapsed && (
        <div className={styles.closeBtnContainer}>
          <button
            className={`${styles.closeBtn} ${styles.icon}`}
            onClick={() => setCollapsed(true)}
          >
            <span className={styles.icon}>
              <ion-icon name="close-circle-outline"></ion-icon>
            </span>
          </button>
        </div>
      )}
      {showResults && <SearchResults query={query} category={category} />}
    </div>
  );
}
