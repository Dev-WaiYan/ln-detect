import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

test("renders Button and working when click this properly", () => {
  let i = 1;
  const onClick = () => i++;

  const btnText = "Increment";

  render(<Button onClick={onClick}>{btnText}</Button>);

  const btn = screen.getByText(btnText);
  expect(btn).toBeInTheDocument();

  fireEvent.click(btn);
  expect(i).toBe(2);
});
