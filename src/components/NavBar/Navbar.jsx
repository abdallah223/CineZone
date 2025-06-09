import SearchBar from "../SearchBar/SearchBar";
import NavLinks from "../NavLinks/NavLinks";
import Logo from "../Logo";
import LightButton from "../LightButton";
import { useNavigate } from "react-router-dom";
import { logout, getCurrentUser } from "../../utils/auth";
import UserMenu from "../UserMenu";

export default function NavBar() {
  const user = getCurrentUser();
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };

  return (
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
        <div className="user-info">
          {user ? (
            <UserMenu
              username={user}
              onLogout={logout}
              className="logout-btn"
            />
          ) : (
            <LightButton
              label="Login"
              onClick={handleLogin}
              className="login-btn"
            />
          )}
        </div>
      </div>
    </div>
  );
}
