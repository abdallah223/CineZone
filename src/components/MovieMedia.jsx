import { useState, useEffect, useRef } from "react";
import YouTube from "react-youtube";
import FetchedSlider from "./FetchedSlider";
import { fetchMovieTrailers, fetchMoviePosters } from "../utils/fetching";

export default function MovieMedia({ movieId, type }) {
  const [activeTab, setActiveTab] = useState("trailers");
  const [loadedTabs, setLoadedTabs] = useState({
    trailers: true,
    posters: false,
  });
  const sectionRef = useRef(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (!loadedTabs[tab]) {
      setLoadedTabs((prev) => ({ ...prev, [tab]: true }));
    }
  };

  useEffect(() => {
    const handleHashNavigation = () => {
      if (window.location.hash === "#media" && sectionRef.current) {
        setTimeout(() => {
          sectionRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      }
    };

    handleHashNavigation();

    window.addEventListener("hashchange", handleHashNavigation);

    return () => {
      window.removeEventListener("hashchange", handleHashNavigation);
    };
  }, [movieId]);

  if (!movieId) return <p>Loading...</p>;

  return (
    <section id="media" className="media" ref={sectionRef}>
      <div className="toggele-tabs">
        <h4 className="title">Media</h4>
        <button
          className={`tab ${activeTab === "trailers" ? "active" : ""}`}
          onClick={() => handleTabClick("trailers")}
        >
          Trailers
        </button>
        <button
          className={`tab ${activeTab === "posters" ? "active" : ""}`}
          onClick={() => handleTabClick("posters")}
        >
          Posters
        </button>
      </div>

      {loadedTabs.trailers && (
        <div
          className={`media-content ${
            activeTab === "trailers" ? "active" : "hidden"
          }`}
        >
          <FetchedSlider
            fetchFunction={fetchMovieTrailers}
            param={[type]}
            endpoint={movieId}
            slideContent={(trailer, index) => (
              <div key={index} className="trailer">
                <YouTube
                  videoId={trailer.key}
                  opts={{
                    width: "100%",
                    height: "100%",
                    playerVars: {
                      autoplay: 0,
                      controls: 1,
                      modestbranding: 1,
                      rel: 0,
                      showinfo: 0,
                      playsinline: 1,
                    },
                  }}
                  className="youtube-wrapper"
                />
              </div>
            )}
            options={{
              type: "slide",
              perPage: 2,
              gap: "1rem",
              pagination: true,
              breakpoints: {
                450: {
                  perPage: 1,
                  focus: 0,
                  gap: "1rem",
                  padding: { right: "0", left: "0" },
                },
                640: { perPage: 1, focus: "center" },
                768: {
                  perPage: 1,
                  focus: 0,
                  gap: "1rem",
                  padding: { right: "0", left: "0" },
                },
                1000: {
                  perPage: 1,
                  focus: 0,
                  padding: { right: "0", left: "0" },
                },
                1024: {
                  perPage: 2,
                  focus: 0,
                  gap: "1rem",
                  padding: { right: "20%", left: "0" },
                },
              },
            }}
          />
        </div>
      )}

      {loadedTabs.posters && (
        <div
          className={`media-content ${
            activeTab === "posters" ? "active" : "hidden"
          }`}
        >
          <FetchedSlider
            fetchFunction={fetchMoviePosters}
            param={type}
            endpoint={movieId}
            options={{
              type: "slider",
              perPage: 5,
              gap: "1rem",
            }}
            slideContent={(poster, index) => (
              <div key={index}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${poster.filePath}`}
                  alt={`Poster ${index}`}
                  style={{ width: "100%", borderRadius: "8px" }}
                />
              </div>
            )}
          />
        </div>
      )}
    </section>
  );
}
