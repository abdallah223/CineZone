import { useState, useEffect, useRef } from "react";
import { getFirstName, logout } from "../../utils/auth";
import { confirmAction } from "../../utils/alerts";
import Logo from "../Logo";
import styles from "./SidebarMenu.module.css";
import NavLinks from "../NavLinks/NavLinks";

export default function SidebarMenu() {
  const [user, setUser] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsOpen(false);
    }
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
    const fetchUser = async () => {
      const firstName = await getFirstName();
      setUser(firstName || "Guest");
    };
    fetchUser();
  }, []);
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className={styles.container}>
      <button className={styles.hamburger} onClick={toggleSidebar}>
        <ion-icon name="menu-outline"></ion-icon>
      </button>

      <div
        ref={sidebarRef}
        className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}
      >
        <div className={styles.sidebarTop}>
          <div className={styles.userDisplay}>
            <span className={`${styles.userIcon} ${"icon"}`}>
              <ion-icon name="person-circle-outline"></ion-icon>
            </span>
            <span className={styles.name}>{user}</span>
          </div>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            <ion-icon name="close-outline"></ion-icon>
          </button>
        </div>
        <nav className={styles.nav}>
          <NavLinks onLinkClick={toggleSidebar} hideOnMobile={false} vertical />
        </nav>
        <div>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>
        <div className={styles.footer}>
          <Logo style={{ margin: "0px" }} />
          <span>©copyright 2023</span>
        </div>
      </div>

      {isOpen && <div className={styles.overlay} />}
    </div>
  );
}
