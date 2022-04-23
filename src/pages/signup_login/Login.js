import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import apiEndPoints from "../../api/apiEndpoints";
import Button from "../../components/button/Button";
import { API_BASE_ENDPOINT } from "../../constants/api";
import { AUTH_TOKEN } from "../../constants/store";
import useErrorHandler from "../../error/useErrorHandler";
import { setAuthUser } from "../../redux/slices/userSlice";
import store from "../../store/store";
import Form from "./Form";
import styles from "./Signup_Login.module.css";

function Login() {
  const navigate = useNavigate();
  const { handleError } = useErrorHandler();

  // Local state - Start
  const [error, setError] = useState("");
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  // Local state - End

  // Redux - Start
  const dispatch = useDispatch();
  // Redux - End

  // Handler - Start
  const login = () => {
    setError("");
    if (inputs.username.trim() && inputs.password.trim()) {
      axios
        .post(`${API_BASE_ENDPOINT}${apiEndPoints.login}`, {
          username: inputs.username,
          password: inputs.password,
        })
        .then((res) => {
          if (res.data.user) {
            dispatch(setAuthUser(res.data.userAuthToken));
            store.setItem(AUTH_TOKEN, res.data.userAuthToken);
            navigate("/");
          } else {
            setError("Login fails.");
          }
        })
        .catch((err) => handleError(err));
    } else {
      setError("Username or Password requires.");
    }
  };
  // Handler - End

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <Form inputs={inputs} setInputs={setInputs} />
        <div className={styles.actionBtns}>
          <Button onClick={() => navigate("/")}>GUEST</Button>
          <Button onClick={login}>LOGIN</Button>
          <Link to="/signup">Signup</Link>
        </div>
        <div className={styles.messageContainer}>
          {error && <p className={styles.error}>{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default Login;
