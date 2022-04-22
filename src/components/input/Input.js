import React, { useEffect, useState } from "react";
import styles from "./Input.module.css";

function Input({ type = "text", value = "", onChange, placeholder, ...rest }) {
  const [inputValue, setInputValue] = useState(value);

  // Effect - Start
  useEffect(() => {
    value !== inputValue && setInputValue(value);
    // eslint-disable-next-line
  }, [value]);
  // Effect - End

  // Handler - Start
  const handleOnChange = (e) => {
    setInputValue(e.target.value);
    onChange && onChange(e);
  };
  // Handler - End

  return (
    <input
      className={styles.input}
      type={type}
      value={inputValue}
      onChange={handleOnChange}
      placeholder={placeholder}
      {...rest}
    />
  );
}

export default Input;
