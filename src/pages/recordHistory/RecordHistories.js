import React from "react";
import { useSelector } from "react-redux";
import Header from "../../components/header/Header";
import styles from "./RecordHistories.module.css";

function RecordHistories() {
  // Redux - Start
  const user = useSelector((state) => state.user);
  // Redux - End

  return (
    <>
      <Header />
      <table className={styles.table}>
        <thead>
          <tr>
            <th>No</th>
            <th>Character</th>
            <th>Word</th>
            <th>Text</th>
            <th>Detected Languages</th>
          </tr>
        </thead>
        <tbody>
          {user.recordHistories.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.character_count}</td>
              <td>{record.word_count}</td>
              <td>{record.input_string}</td>
              <td>{record.detected_languages.map((lang) => lang + ", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default RecordHistories;
