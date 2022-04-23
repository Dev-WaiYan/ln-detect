import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiEndPoints from "../../api/apiEndpoints";
import Button from "../../components/button/Button";
import { API_BASE_ENDPOINT } from "../../constants/api";
import Form from "./Form";
import styles from "./Signup_Login.module.css";

function Signup() {
  const navigate = useNavigate();

  // Local state - Start
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  // Local state - End

  // Handler - Start
  const signup = () => {
    setError("");
    if (inputs.username.trim() && inputs.password.trim()) {
      axios
        .post(`${API_BASE_ENDPOINT}${apiEndPoints.signup}`, {
          username: inputs.username,
          password: inputs.password,
        })
        .then((res) => {
          if (res.data.created) {
            setSuccess(
              "Account is created. Will redirect to login soon. Please login with new account."
            );
            setTimeout(() => {
              navigate("/login");
            }, [3000]);
          } else {
            setError("Signup fails. Try again with new username.");
          }
        })
        .catch((err) => console.log(err));
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
          <Button onClick={signup}>SIGNUP</Button>
          <Link to="/login">Login</Link>
        </div>
        <div className={styles.messageContainer}>
          {error && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.success}>{success}</p>}
        </div>
      </div>
    </div>
  );
}

export default Signup;
