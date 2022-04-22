import { SUPPORT_LANGUAGES } from "../constants/lang";

export const checkWordCount = (str) => {
  const words = str.split(" ");
  return words.filter((word) => word !== "").length;
};

export const checkCharacterCount = (str) => {
  return str.length;
};

// Reference : https://stackoverflow.com/questions/16320397/detect-user-input-language-javascript
export const detectLanguages = (str) => {
  const languages = SUPPORT_LANGUAGES;

  const detectedLanguages = [];

  Object.entries(languages).forEach(([key, value]) => {
    str.split("").forEach((s) => {
      if (value.test(s) && !detectedLanguages.includes(key)) {
        detectedLanguages.push(key);
      }
    });
  });

  return detectedLanguages;
};
