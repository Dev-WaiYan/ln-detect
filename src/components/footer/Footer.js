import React from "react";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <p className={styles.footer}>
      Developed by{" "}
      <a href="https://github.com/Dev-WaiYan" target="_blank">
        Dev-WaiYan
      </a>{" "}
      with &#128149;.
    </p>
  );
}

export default Footer;
