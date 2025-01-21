import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DemoScan } from "./demoScan";

describe("DemoScan", () => {
  it("should render the component", () => {
    render(<DemoScan />);
    expect(screen.getByPlaceholderText("Scan here")).toBeInTheDocument();
  });

  it("should auto-focus the input on mount", () => {
    render(<DemoScan />);
    const input = screen.getByPlaceholderText("Scan here");
    expect(input).toHaveFocus();
  });

  it("should clear input after Enter and add code to list", () => {
    render(<DemoScan />);
    const input = screen.getByPlaceholderText("Scan here");

    fireEvent.change(input, { target: { value: "TEST123" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(input).toHaveValue("");
    expect(screen.getByText("TEST123")).toBeInTheDocument();
  });

  it("should handle multiple code scans", () => {
    render(<DemoScan />);
    const input = screen.getByPlaceholderText("Scan here");
    const codes = ["CODE1", "CODE2", "CODE3"];

    codes.forEach((code) => {
      fireEvent.change(input, { target: { value: code } });
      fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    });

    codes.forEach((code) => {
      expect(screen.getByText(code)).toBeInTheDocument();
    });
  });

  it("should not add empty or whitespace-only codes", () => {
    render(<DemoScan />);
    const input = screen.getByPlaceholderText("Scan here");
    const invalidCodes = ["", " ", "  "];

    invalidCodes.forEach((code) => {
      fireEvent.change(input, { target: { value: code } });
      fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    });

    expect(screen.getByText("No scans yet.")).toBeInTheDocument();
  });

  it("should render scanned codes in a list", () => {
    render(<DemoScan />);
    const input = screen.getByPlaceholderText("Scan here");

    // Add some codes
    const codes = ["ABC123", "DEF456"];
    codes.forEach((code) => {
      fireEvent.change(input, { target: { value: code } });
      fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    });

    // Check list structure
    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(2);
    expect(listItems[0]).toHaveTextContent("ABC123");
    expect(listItems[1]).toHaveTextContent("DEF456");
  });
});

/**
 * Tests the behavior of clearing the input field after a code is added in the DemoScan component.
 *
 * This test case verifies that:
 * 1. The input field is cleared after a code is entered and submitted.
 * 2. The entered code appears in the document after submission.
 *
 * @remarks
 * This test uses React Testing Library to render the component and simulate user interactions.
 *
 * @returns {void}
 */
it("should clear the input field after a code is added", () => {
  render(<DemoScan />);
  const input = screen.getByPlaceholderText("Scan here");

  fireEvent.change(input, { target: { value: "123456" } });
  fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

  expect(input).toHaveValue("");
  expect(screen.getByText("123456")).toBeInTheDocument();
});
