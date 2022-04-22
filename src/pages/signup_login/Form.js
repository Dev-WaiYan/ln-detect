import React from "react";
import Input from "../../components/input/Input";
import styles from "./Form.module.css";

function Form({ inputs, setInputs }) {
  // Handler - Start
  const onChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  // Handler - End

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
