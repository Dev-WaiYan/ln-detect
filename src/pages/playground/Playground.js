import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import apiConfig from "../../api/apiConfig";
import apiEndPoints from "../../api/apiEndpoints";
import Alert from "../../components/alert/Alert";
import Button from "../../components/button/Button";
import Header from "../../components/header/Header";
import Input from "../../components/input/Input";
import { SUPPORT_LANGUAGES } from "../../constants/lang";
import { TO_RECORD_HISTORY } from "../../constants/store";
import useErrorHandler from "../../error/useErrorHandler";
import { addRecordHistory } from "../../redux/slices/userSlice";
import store from "../../store/store";
import {
  checkCharacterCount,
  checkWordCount,
  detectLanguages,
} from "../../utils/checkUtils";
import styles from "./Playground.module.css";

function Playground() {
  const navigate = useNavigate();
  const { handleError } = useErrorHandler();

  // Redux - Start
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // Redux - End

  // Local state - Start
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const defaultInput = {
    value: "",
    characterCount: 0,
    wordCount: 0,
  };
  const [input, setInput] = useState(defaultInput);

  const [detectedLanguages, setDetectedLanguages] = useState([]);
  const [decision, setDecision] = useState("");
  // Local state - End

  // Effect - Start
  useEffect(() => {
    const langs = detectLanguages(input.value);
    setDetectedLanguages(langs);
  }, [input.value]);

  useEffect(() => {
    setTimeout(() => {
      setError("");
      setSuccess("");
    }, 3000);
  }, [success, error]);

  useEffect(() => {
    const toRecordHistory = JSON.parse(store.getItem(TO_RECORD_HISTORY));
    if (toRecordHistory) {
      recordHistory(toRecordHistory);
      store.removeItem(TO_RECORD_HISTORY);
    }
  }, [user.authToken]);
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

  const recordHistory = (toRecordHistory) => {
    let payload = toRecordHistory
      ? {
          characterCount: toRecordHistory.characterCount,
          wordCount: toRecordHistory.wordCount,
          inputString: toRecordHistory.value,
          detectedLanguages: toRecordHistory.detectedLanguages,
        }
      : {
          characterCount: input.characterCount,
          wordCount: input.wordCount,
          inputString: input.value,
          detectedLanguages: detectedLanguages,
        };

    if (user.authToken) {
      apiConfig
        .getApiInstance()
        .post(apiEndPoints.recordHistory, payload)
        .then((res) => {
          console.log("record", res.data.recordHistory);
          dispatch(addRecordHistory(res.data.recordHistory));
          setSuccess("New history is recorded.");
          setInput(defaultInput);
          setDecision("");
          setDetectedLanguages([]);
        })
        .catch((err) => {
          setError("Something went wrong.");
          handleError(err);
        });
    } else {
      store.setItem(
        TO_RECORD_HISTORY,
        JSON.stringify({ input: input, detectedLanguages: detectedLanguages })
      );
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
    <>
      {success && <Alert text={success} type="success" />}
      {error && <Alert text={error} type="error" />}
      <Header />
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
    </>
  );
}

export default Playground;
