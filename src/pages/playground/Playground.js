import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import { SUPPORT_LANGUAGES } from "../../constants/lang";
import {
  checkCharacterCount,
  checkWordCount,
  detectLanguages,
} from "../../utils/checkUtils";
import styles from "./Playground.module.css";

function Playground() {
  const navigate = useNavigate();

  // Local state - Start
  const [input, setInput] = useState({
    value: "",
    characterCount: 0,
    wordCount: 0,
  });

  const [detectedLanguages, setDetectedLanguages] = useState([]);
  const [decision, setDecision] = useState("");
  // Local state - End

  // Effect - Start
  useEffect(() => {
    const langs = detectLanguages(input.value);
    setDetectedLanguages(langs);
  }, [input.value]);
  // Effect - End

  // Handler - Start
  const getSupportLanguages = () => {
    const supportLangs = [];
    for (const key in SUPPORT_LANGUAGES) {
      supportLangs.push(
        <span
          key={key}
          className={
            detectedLanguages.includes(key)
              ? styles.detected
              : styles.noDetected
          }
        >
          {key.toUpperCase()}
        </span>
      );
    }

    return supportLangs.length > 0 ? (
      <>
        <p>
          Supported Languages : <b>{supportLangs.length}</b>
        </p>
        <div className={styles.supportedLangs}>{supportLangs}</div>
      </>
    ) : (
      <p className="warning">There is no supported languages yet.</p>
    );
  };

  const onChange = (e) => {
    setDecision("");
    setInput({
      ...input,
      value: e.target.value,
      characterCount: checkCharacterCount(e.target.value),
      wordCount: checkWordCount(e.target.value),
    });
  };

  const check = () => {
    if (checkIsTryingBlankInputToCheck()) {
      return;
    }
    if (detectedLanguages.length > 1) {
      setDecision("That seems to contain multiple languages!");
    } else if (detectedLanguages.length === 1) {
      setDecision(`That seems to be ${detectedLanguages[0].toUpperCase()}!`);
    } else {
      setDecision("There is no has detected language.");
    }
  };

  const checkAndRecord = () => {
    if (checkIsTryingBlankInputToCheck()) {
      return;
    }
    check();
    recordHistory();
  };

  const recordHistory = () => {
    const authToken = localStorage.getItem("auth_token");
    if (authToken) {
      // Goto record api
    } else {
      localStorage.setItem("toRecordHistory", input);
      navigate("/login");
    }
  };
  // Handler - End

  // Utils - Start
  const checkIsTryingBlankInputToCheck = () => {
    if (input.characterCount === 0) {
      setDecision("Must fill input field to detect.");
      return true;
    }
  };

  // Utils - End

  return (
    <div className={styles.container}>
      <div className={styles.playground}>
        <div className={styles.row}>
          <Input
            value={input.value}
            onChange={onChange}
            placeholder="You can type anything here."
          />
        </div>
        <div className={styles.row}>
          <h5>Count</h5>
          <div className={styles.count}>
            <span>
              Character : <i>{input.characterCount}</i>
            </span>
            <span>
              Word : <i>{input.wordCount}</i>
            </span>
          </div>
        </div>

        <div className={styles.actionBtns}>
          <Button onClick={check}>Check</Button>
          <Button onClick={checkAndRecord}>Check and Record</Button>
        </div>

        {getSupportLanguages()}

        <div className={styles.row}>
          <p className={styles.decision}>{decision}</p>
        </div>
      </div>
    </div>
  );
}

export default Playground;
