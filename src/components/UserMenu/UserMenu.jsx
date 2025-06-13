import React, { useState } from "react";
import styles from "./UserMenu.module.css";

export default function UserMenu({
  username,
  onLogout,
  forceShowName = false,
}) {
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => setOpen(!open);

  return (
    <div className={styles.userMenuContainer} onClick={toggleDropdown}>
      <div className={styles.userDisplay}>
        <span className={styles.userIcon}>
          <ion-icon name="person-circle-outline"></ion-icon>
        </span>
        <span
          className={`${styles.name} ${
            forceShowName ? styles.forceVisible : ""
          }`}
        >
          {username}
        </span>
        <ion-icon name="chevron-down-outline"></ion-icon>
      </div>

      {open && (
        <div className={styles.dropdown}>
          <div className={styles.dropdownItem} onClick={onLogout}>
            <span>Logout</span>
          </div>
        </div>
      )}
    </div>
  );
}
