import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/button/Button";
import Form from "./Form";
import styles from "./Signup_Login.module.css";

function Login() {
  // Local state - Start
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  // Local state - End

  // Handler - Start
  const signup = () => {};
  // Handler - End

  return (
    <div className={styles.container}>
      <div>
        <Form inputs={inputs} setInputs={setInputs} />
        <div className={styles.actionBtns}>
          <Button onClick={signup}>LOGIN</Button>
          <Link to="/signup">Signup</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
