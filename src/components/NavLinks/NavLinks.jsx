import { NavLink } from "react-router-dom";
import styles from "./NavLinks.module.css";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Movies", path: "/movies" },
  { name: "Tv Shows", path: "/tv-shows" },
  { name: "Watchlist", path: "/watchlist" },
];

const NavLinks = ({
  onLinkClick = () => {},
  hideOnMobile = true,
  vertical = false,
}) => {
  return (
    <ul
      className={
        `${styles.navList}` +
        (hideOnMobile ? ` ${styles.hideOnMobile}` : "") +
        (vertical ? ` ${styles.vertical}` : "")
      }
    >
      {navItems.map(({ name, path }) => (
        <li key={name}>
          <NavLink
            to={path}
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
            onClick={onLinkClick}
          >
            {name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;
