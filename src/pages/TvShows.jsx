import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CategoriesAside from "../components/CategoriesAside";
import PageContainer from "../components/layout/PageContainer";
import TvShowCard from "../components/MediaCards/TvShowCard";
import { KEY, fetchMoviesWithDetails } from "../utils/fetching";
import { useParams, useNavigate } from "react-router-dom";

export default function TvShows() {
  const { genreId } = useParams();
  const navigate = useNavigate();
  const [tvShows, setTvShows] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(+genreId || 10759);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const handleCategoryClick = (id) => {
    setSelectedGenre(id);
    navigate(`/tv-shows/${id}`);
  };
  const fetchMoreSeries = async () => {
    try {
      const data = await fetchMoviesWithDetails(
        `https://api.themoviedb.org/3/discover/tv?api_key=${KEY}&with_genres=${selectedGenre}&language=en-US&page=${page}`,
        "tv"
      );

      if (data.length === 0) {
        setHasMore(false);
      } else {
        setTvShows((prevTvShows) => [...prevTvShows, ...data]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (e) {
      console.error("Error fetching TvShows:", e);
    }
  };

  // Reset when the genre changes
  useEffect(() => {
    const resetAndFetch = async () => {
      setTvShows([]);
      setPage(1);
      setHasMore(true);
      const data = await fetchMoviesWithDetails(
        `https://api.themoviedb.org/3/discover/tv?api_key=${KEY}&with_genres=${selectedGenre}&language=en-US&page=1`,
        "tv"
      );
      setTvShows(data);
      setPage(2);
    };
    resetAndFetch();
  }, [selectedGenre]);

  return (
    <PageContainer>
      <section className="movies-page layout">
        <CategoriesAside
          onLinksClick={handleCategoryClick}
          currentCategory={selectedGenre}
          type="tv"
        />
        <div className="movie-grid-container">
          <InfiniteScroll
            dataLength={tvShows.length}
            next={fetchMoreSeries}
            hasMore={hasMore}
            loader={<h4>Loading tv Shows...</h4>}
            endMessage={<p>No more tv Shows to load.</p>}
            className="hide-scrollbar"
            style={{ height: "100vh", minHeight: "800px" }}
          >
            <div className="movie-grid">
              {tvShows.map((tvShows) => (
                <TvShowCard key={tvShows.id} movie={tvShows} />
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </section>
    </PageContainer>
  );
}
