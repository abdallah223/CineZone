import Logo from "./Logo";
import NavLinks from "./NavLinks/NavLinks";
export default function Footer() {
  return (
    <footer>
      <div className="footer-container container">
        <div className="row">
          <div className="right">
            <Logo />
            <p className="site-desc">
              CineZone is a website that helps you discover and enjoy movies and
              TV shows. You can find information, trailers, images, reviews, and
              more about any title you want. You can also create you can save
              your preferences, ratings, and lists. CineZone is the ultimate
              website for entertainment lovers
            </p>
          </div>
          <div className="left">
            <h6 className="title">Links</h6>
            <NavLinks />
          </div>
        </div>
        <span className="copy-right">© 2023 by CineZone.com, Inc.</span>
      </div>
    </footer>
  );
}
