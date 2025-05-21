import TrendingCarousel from "./ThumbnailCarousel";

export default function HomeLayout() {
  return (
    <div className="container">
      <div className="section-heading">
        <div className="title">
          <h3>Trending</h3>
        </div>
        <div className="more">
          <a href="#">See More</a>
        </div>
      </div>
      <TrendingCarousel />
    </div>
  );
}
