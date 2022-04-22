import {
  checkCharacterCount,
  checkWordCount,
  detectLanguages,
} from "./checkUtils";

test("checks word count is correct", () => {
  const str1 = "three words here.";
  expect(checkWordCount(str1)).toBe(3);

  const str2 = "     multiple space                words here.      ";
  expect(checkWordCount(str2)).toBe(4);
});

test("checks character count is correct", () => {
  const str1 = "hello world";
  expect(checkCharacterCount(str1)).toBe(11);

  const str2 = "  hello   world   ";
  expect(checkCharacterCount(str2)).toBe(18);
});

test("check languages are detecting correctly", () => {
  let str = "hello";
  expect(detectLanguages(str).length).toBeGreaterThan(0);

  str = "မြန်မာ    , hello";
  expect(detectLanguages(str).length).toBeGreaterThan(1);

  str = "  - . _ $ ";
  expect(detectLanguages(str).length).toBe(0);
});
