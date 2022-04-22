import { render, screen, fireEvent } from "@testing-library/react";
import Input from "./Input";

test("renders Input and working when input changes properly", () => {
  const placeholder = "input here";

  render(<Input placeholder={placeholder} />);

  const input = screen.getByPlaceholderText(placeholder);
  expect(input).toBeInTheDocument();
  expect(input.value).toBe("");

  const changedInputValue = "value change";

  fireEvent.change(input, { target: { value: changedInputValue } });
  expect(input.value).toBe(changedInputValue);
});
