import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar/SearchBar";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="header">
      <div className="overlay"></div>
      <div className="top-header container">
        <div className="header-top">
          <div className="header-left">
            <Logo />
            <NavLinks />
          </div>
          <div className="header-right">
            <SearchBar />
            <a href="./watchlist.html" className="watchlist">
              <div className="icon">
                <ion-icon name="bookmark-outline"></ion-icon>
              </div>
              <span className="text">Watchlist</span>
            </a>
            <div className="menu-button">
              <div className="menu-open menu">
                <div className="menu-icon icon">
                  <ion-icon name="menu-outline"></ion-icon>
                </div>
              </div>
              <div className="menu-close menu">
                <div className="close-icon icon">
                  <ion-icon name="close-outline"></ion-icon>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="header-content container">
        <div className="slogan">
          <p>
            <span>Everything</span> you need to know about entertainment.
          </p>
        </div>
        <a href="second-page.html" className="button">
          Explore
          <span className="btn-icon">
            <ion-icon name="chevron-forward-outline"></ion-icon>
          </span>
        </a>
      </div>
    </header>
  );
}
