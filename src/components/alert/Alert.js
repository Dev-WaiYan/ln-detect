import React from "react";
import styles from "./Alert.module.css";

function Alert({ text, type = "warning" }) {
  const getStyles = () => {
    let color;
    switch (type) {
      case "success":
        color = "rgba(56, 139, 7, 0.87)";
        break;
      case "warning":
        color = "rgba(179, 118, 6, 0.87)";
        break;
      case "error":
        color = "rgba(207, 19, 19, 0.87)";
        break;
    }

    return color;
  };

  return (
    <div className={styles.container}>
      <div className={styles.alert} style={{ backgroundColor: getStyles() }}>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default Alert;
