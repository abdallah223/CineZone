import { NavLink } from "react-router-dom";
import styles from "./NavLinks.module.css";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Movies", path: "/movies" },
  { name: "Series", path: "/series" },
  { name: "Categories", path: "/categories" },
];

const NavLinks = () => {
  return (
    <ul className={styles.navList}>
      {navItems.map(({ name, path }) => (
        <li key={name}>
          <NavLink
            to={path}
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            {name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;
