import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AUTH_TOKEN } from "../../constants/store";
import store from "../../store/store";
import Button from "../button/Button";
import styles from "./Menu.module.css";

function Menu() {
  const navigate = useNavigate();
  // Redux - Start
  const user = useSelector((state) => state.user);
  // Redux - End

  const logout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      {user.authToken ? (
        <div className={styles.actionBtns}>
          <Button onClick={() => navigate("/")}>Playground</Button>
          <Button onClick={() => navigate("/recordHistories")}>
            Record Histories
          </Button>
          <Button onClick={logout}>Logout</Button>
        </div>
      ) : (
        <div className={styles.actionBtns}>
          <Button onClick={() => navigate("/login")}>Login</Button>
          <Button onClick={() => navigate("/signup")}>Signup</Button>
        </div>
      )}
    </>
  );
}

export default Menu;
