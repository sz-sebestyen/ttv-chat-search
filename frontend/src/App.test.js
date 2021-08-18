import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  beforeEach(() => {
    render(<App />);
  });

  it("renders title", () => {
    const titleElement = screen.getByText(/ttv chat search/i);
    expect(titleElement).toBeInTheDocument();
  });

  it("renders input", () => {
    const titleElement = screen.getByText(/url\/id|id\/url/i);
    expect(titleElement).toBeInTheDocument();
  });
});
