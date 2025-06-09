import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CategoriesAside from "../components/CategoriesAside";
import PageContainer from "../components/layout/PageContainer";
import SeriesCard from "../components/MediaCards/SeriesCard";
import { KEY, fetchMoviesWithDetails } from "../utils/fetching";
import { useParams, useNavigate } from "react-router-dom";

export default function Series() {
  const { genreId } = useParams();
  const navigate = useNavigate();
  const [series, setSeries] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(+genreId || 10759);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const handleCategoryClick = (id) => {
    setSelectedGenre(id);
    navigate(`/series/${id}`);
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
        setSeries((prevSeries) => [...prevSeries, ...data]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (e) {
      console.error("Error fetching Series:", e);
    }
  };

  // Reset when the genre changes
  useEffect(() => {
    const resetAndFetch = async () => {
      setSeries([]);
      setPage(1);
      setHasMore(true);
      const data = await fetchMoviesWithDetails(
        `https://api.themoviedb.org/3/discover/tv?api_key=${KEY}&with_genres=${selectedGenre}&language=en-US&page=1`,
        "tv"
      );
      setSeries(data);
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
            dataLength={series.length}
            next={fetchMoreSeries}
            hasMore={hasMore}
            loader={<h4>Loading series...</h4>}
            endMessage={<p>No more series to load.</p>}
            className="hide-scrollbar"
            style={{ height: "100vh", minHeight: "800px" }}
          >
            <div className="movie-grid">
              {series.map((series) => (
                <SeriesCard key={series.id} movie={series} />
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </section>
    </PageContainer>
  );
}
