"use client";
import React, { useState } from "react";
import type { FormField } from "@/types/content/form";
import type { HttpMethodType } from "@/types/enums/form";

interface CustomFormProps {
  /** The API endpoint to send the request to, e.g. "/api/orders" */
  endpoint: string;

  /** The HTTP method to use: POST, PUT, PATCH, DELETE, GET, etc. */
  method: HttpMethodType;

  /** The fields to render. If you prefer, you could pass in children instead. */
  fields: FormField[];

  /**
   * Optional initial values, e.g. { name: "default name", qty: 10 }
   * If method === "GET", you might fill these with data you fetched on mount.
   */
  initialValues?: Record<string, any>;

  /**
   * Optional callback when the request is successful.
   * The server response is passed as `data`.
   */
  onSuccess?: (data: any) => void;

  /**
   * Optional callback if an error occurs during fetch or server returns a non-OK status.
   */
  onError?: (error: any) => void;

  /**
   * Minimal styling for demonstration.
   * If you’re using Tailwind, you can apply classes directly or pass them as props.
   */
  className?: string;
}

export const CustomForm: React.FC<CustomFormProps> = ({
  endpoint,
  method,
  fields,
  initialValues = {},
  onSuccess,
  onError,
  className,
}) => {
  const [formValues, setFormValues] =
    useState<Record<string, any>>(initialValues);
  const [loading, setLoading] = useState<boolean>(false);
  const [serverMessage, setServerMessage] = useState<string>("");

  /**
   * Handle input changes:
   * Keep track of changes in local state.
   */
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Submit the form:
   * - Build request options (headers, method, body).
   * - For GET requests, you might not send a body.
   * - Call the endpoint, handle response, set success/error states.
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setServerMessage("");

    try {
      // Check if the request method is GET - this affects how we send data
      // GET requests typically use URL parameters instead of a request body
      const isGet = method === "GET";

      // Set up the basic request configuration
      // RequestInit is a TypeScript type that defines fetch request options
      const requestOptions: RequestInit = {
        method, // HTTP method (GET, POST, PATCH, PUT, DELETE, etc.)
        headers: {
          "Content-Type": "application/json", // Tell server we're sending JSON
        },
      };

      // Only add a request body for non-GET requests
      // GET requests shouldn't have a body according to HTTP spec
      if (!isGet) {
        // Convert form values object to JSON string for sending
        requestOptions.body = JSON.stringify(formValues);
      }

      // Make the API request to the provided endpoint
      // Using fetch API with async/await for cleaner code
      const res = await fetch(endpoint, requestOptions);

      // Parse the JSON response
      // This could throw if response isn't valid JSON
      const data = await res.json();

      // Check if response status was in the successful range (200-299)
      // If not, throw an error with the server's error message or default
      if (!res.ok) {
        throw new Error(data.error || "Request failed");
      }

      // If we get here, request was successful
      setServerMessage("Request successful!");

      // Call success callback if provided, passing response data
      if (onSuccess) onSuccess(data);
    } catch (error: any) {
      // Handle any errors that occurred during the request
      // Set error message from error object or fallback to generic message
      setServerMessage(`Error: ${error.message || "Unknown error"}`);

      // Call error callback if provided
      if (onError) onError(error);
    } finally {
      // Always run this block, whether request succeeded or failed
      // Reset loading state back to false
      setLoading(false);
    }
  };

  return (
    <form
      className={`rounded p-4 bg-gray-100 shadow-md ${className || ""}`}
      onSubmit={handleSubmit}
    >
      <h3 className="text-lg font-semibold mb-3">{method} Form</h3>

      {/* Render a field for each definition in `fields` */}
      {fields.map((field) => (
        <div className="mb-3" key={field.name}>
          <label
            className="block text-sm font-medium mb-1"
            htmlFor={field.name}
          >
            {field.label}
          </label>
          <input
            id={field.name}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            value={formValues[field.name] || ""}
            onChange={handleChange}
            required={field.required}
            className="w-full rounded px-3 py-2 text-black border border-gray-300 focus:outline-none"
          />
        </div>
      ))}

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        disabled={loading}
      >
        {loading ? "Loading..." : `Submit (${method})`}
      </button>

      {/* Server response message */}
      {serverMessage && <div className="mt-3 text-sm">{serverMessage}</div>}
    </form>
  );
};
