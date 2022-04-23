import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Input from "../../components/input/Input";
import styles from "./Form.module.css";

function Form({ inputs, setInputs }) {
  const navigate = useNavigate();
  // Redux - Start
  const user = useSelector((state) => state.user);
  // Redux - End

  // Handler - Start
  const onChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  // Handler - End

  // Effect - Start
  useEffect(() => {
    if (user.authToken) {
      navigate("/");
    }
  }, [user.authToken]);
  // Effect - End

  return (
    <div>
      <div className={styles.row}>
        <Input
          name="username"
          value={inputs.username}
          placeholder="Username"
          onChange={onChange}
        />
      </div>
      <div className={styles.row}>
        <Input
          name="password"
          type="password"
          value={inputs.password}
          placeholder="Password"
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export default Form;
