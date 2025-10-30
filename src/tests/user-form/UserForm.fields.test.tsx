import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Container from "../../components/user-form/Container";

describe("User Form Fields", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should find all field form. There include name, username, email, phone, address, website, company", () => {
    render(<Container />);

    expect(screen.getByTestId("name")).toBeInTheDocument();
    expect(screen.getByTestId("username")).toBeInTheDocument();
    expect(screen.getByTestId("email")).toBeInTheDocument();
    expect(screen.getByTestId("phone")).toBeInTheDocument();
    expect(screen.getByTestId("address")).toBeInTheDocument();
    expect(screen.getByTestId("website")).toBeInTheDocument();
    expect(screen.getByTestId("company")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /Submit/i })).toBeInTheDocument();
  });
});
