"use client";

import React, { useState, useRef, useEffect } from "react";

/**
 * DemoScan component for demonstrating barcode scanning functionality.
 *
 * This component provides a simple interface for scanning barcodes and displaying
 * the scanned codes. It uses a text input field to capture scanned codes and
 * displays them in a list.
 *
 * @returns {JSX.Element} A React component that renders the barcode scanning demo interface.
 */
export const DemoScan = () => {
  const [scannedCodes, setScannedCodes] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus the input when the page loads
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  /**
   * Handles the keydown event for the input field.
   *
   * When the Enter key is pressed, it processes the scanned code:
   * - Trims the input value
   * - Adds the code to the list of scanned codes if it's not empty
   * - Clears the input field
   * - Prevents the default Enter key behavior
   *
   * @param {React.KeyboardEvent<HTMLInputElement>} e - The keyboard event object
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Some scanners send an "Enter" keystroke at the end of the code
    if (e.key === "Enter") {
      const code = e.currentTarget.value.trim();
      if (code) {
        setScannedCodes((prev) => [...prev, code]);
      }
      e.currentTarget.value = "";
      e.preventDefault();
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h1>Barcode Scanner Demo</h1>
      <p>
        Place your cursor in the field below. When you scan a code, it will
        appear, and hitting Enter (auto from scanner) will record it.
      </p>

      <input
        ref={inputRef}
        type="text"
        onKeyDown={handleKeyDown}
        placeholder="Scan here"
        style={{ width: "100%", padding: "0.5rem" }}
      />

      <div style={{ marginTop: 20 }}>
        <h2>Scanned Codes:</h2>
        {scannedCodes.length === 0 && <p>No scans yet.</p>}
        <ul>
          {scannedCodes.map((code, idx) => (
            <li key={idx}>{code}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
