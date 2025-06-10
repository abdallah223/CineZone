import BannerList from "../components/BannerList";
import PageContainer from "../components/layout/PageContainer";
import TrendingCarousel from "../components/ThumbnailCarousel";
import TitledSection from "../components/TitledSection";
import MoviesGenreslist from "../components/MoviesGenreslist";
import Header from "../components/Header";

export default function Home() {
  return (
    <>
      <Header>
        <div className="header-content container">
          <div className="slogan">
            <p>
              <span>Everything</span> you need to know about entertainment.
            </p>
          </div>
          <p className="sub-text">
            CineZone is your daily guide to what’s worth watching. Discover
            trending movies and series, complete with reviews and cast details.
            Save favorites to your watchlist and get smart suggestions tailored
            to your taste.
          </p>
        </div>
      </Header>

      <PageContainer>
        <TitledSection title="Trending">
          <TrendingCarousel />
        </TitledSection>
        <TitledSection title="Comming Soon">
          <BannerList itemsNumber={2} />
        </TitledSection>
        <MoviesGenreslist />
      </PageContainer>
    </>
  );
}
