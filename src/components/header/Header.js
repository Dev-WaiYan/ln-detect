import React, { useState } from "react";
import Menu from "../menu/Menu";
import styles from "./Header.module.css";
import menuStyles from "../menu/Menu.module.css";
import { useSelector } from "react-redux";

function Header() {
  // Redux - Start
  const user = useSelector((state) => state.user);
  // Redux - End

  // Local state - Start
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  // Locat state - End

  // Handler - Start
  const openMenu = () => {
    setIsOpenMenu(true);
  };

  const closeMenu = () => {
    setIsOpenMenu(false);
  };
  // Handler - End

  return (
    <>
      <div className={styles.container}>
        <button
          className={styles.menuStartPoint}
          onClick={openMenu}
          style={{
            backgroundColor: user.authToken
              ? "rgba(56, 139, 7, 0.87)"
              : "rgba(179, 118, 6, 0.87)",
          }}
        >
          {user.authToken ? "Auth User" : "Guest"}
        </button>
      </div>

      {/* Menu - Start*/}
      {isOpenMenu && (
        <>
          <div className={menuStyles.wrapper}>
            <button className={menuStyles.close} onClick={closeMenu}>
              X
            </button>
          </div>
          <div className={menuStyles.container}>
            <Menu />
          </div>
        </>
      )}
      {/* Menu - End */}
    </>
  );
}

export default Header;
