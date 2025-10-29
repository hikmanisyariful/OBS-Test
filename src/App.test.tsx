import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App Counter", () => {
  it("should render initial count as 0", () => {
    render(<App />);
    const button = screen.getByRole("button", { name: /count is 0/i });
    expect(button).toBeInTheDocument();
  });

  it("should increment count when button is clicked", async () => {
    const user = userEvent.setup();
    render(<App />);
    const button = screen.getByRole("button", { name: /count is 0/i });

    await user.click(button);
    expect(button).toHaveTextContent("count is 1");

    await user.click(button);
    expect(button).toHaveTextContent("count is 2");
  });

  it("should display logos and title correctly", () => {
    render(<App />);
    expect(screen.getByAltText(/Vite logo/i)).toBeInTheDocument();
    expect(screen.getByAltText(/React logo/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Vite \+ React/i })).toBeInTheDocument();
  });
});