import SearchBar from "../SearchBar/SearchBar";
import NavLinks from "../NavLinks/NavLinks";
import Logo from "../Logo";
import LightButton from "../LightButton";
import { useNavigate } from "react-router-dom";
import { logout, getFirstName } from "../../utils/auth";
import { confirmAction } from "../../utils/alerts";
import UserMenu from "../UserMenu/UserMenu";
import SidebarMenu from "../SideBar/SidebarMenu";
import { useEffect, useState } from "react";

export default function NavBar() {
  const [user, setUser] = useState("");

  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = async function () {
    const confirmed = await confirmAction(
      "Are you sure you want to log out?",
      "This action cannot be undone.",
      "Logout"
    );
    if (!confirmed) return;
    logout();
  };
  useEffect(() => {
    const getUser = async function () {
      const user = await getFirstName();
      setUser(user);
    };
    getUser();
  });

  return (
    <div className="header-top">
      <div className="header-left">
        <Logo />
        <NavLinks hideOnMobile />
      </div>
      <div className="header-right">
        <SearchBar />
        <a href="./watchlist.html" className="watchlist">
          <div className="icon">
            <ion-icon name="bookmark-outline"></ion-icon>
          </div>
          <span className="text">Watchlist</span>
        </a>
        <div className="user-info">
          {user ? (
            <UserMenu
              username={user}
              onLogout={handleLogout}
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
        <SidebarMenu />
      </div>
    </div>
  );
}
