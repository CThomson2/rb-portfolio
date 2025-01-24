// Testing Library Syntax Guide

// @testing-library/react imports:
// - render: (component: ReactElement) => RenderResult
//   Renders a React component into a virtual DOM for testing.
//   Does not render in browser - uses JSDOM under the hood.
// - screen: Object containing query methods to find elements
//   e.g. getByText, getByRole, getByPlaceholderText etc.
// - fireEvent: Object containing methods to simulate DOM events
//   Each method takes element and optional event object
//   e.g. fireEvent.click(element, eventInit?)

// @testing-library/jest-dom imports:
// - Custom matchers that extend Jest's expect()
//   e.g. toBeInTheDocument, toHaveValue, toHaveFocus etc.

// Jest testing syntax:
// describe: (name: string, fn: () => void) => void
//   Groups related tests together
// it/test: (name: string, fn: () => void | Promise<void>, timeout?: number) => void
//   Individual test case
// expect: (actual: any) => ExpectationObject
//   Creates assertion - must be chained with matcher
//   e.g. expect(element).toBeInTheDocument()
//   Cannot be used without matcher method

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

it("should clear the input field after a code is added", () => {
  render(<DemoScan />);
  const input = screen.getByPlaceholderText("Scan here");

  fireEvent.change(input, { target: { value: "123456" } });
  fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

  expect(input).toHaveValue("");
  expect(screen.getByText("123456")).toBeInTheDocument();
});
