import { useState } from "react";
import { FormContent } from "./FormContent";
import { HttpMethodType, HttpMethod } from "@/types/constant/http";

const Form = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeForm, setActiveForm] = useState<HttpMethodType>(HttpMethod.GET);
  const [serverResponse, setServerResponse] = useState("");

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleGetData = async () => {
    // Simulate fetching Data
    setServerResponse("Fetching data...");
    setTimeout(() => {
      setServerResponse("Data fetched successfully.");
    }, 1000);
  };

  const handleCreateData = async () => {
    // Simulate creating a Data
    setServerResponse("Creating data...");
    setTimeout(() => {
      setServerResponse("Data created successfully.");
    }, 1000);
  };

  const handleUpdateData = async () => {
    // Simulate updating a Data
    setServerResponse("Updating data...");
    setTimeout(() => {
      setServerResponse("Data updated successfully.");
    }, 1000);
  };

  const handleDeleteData = async () => {
    // Simulate deleting a Data
    setServerResponse("Deleting data...");
    setTimeout(() => {
      setServerResponse("Data deleted successfully.");
    }, 1000);
  };

  return (
    <>
      {/* Overlay - move to separate container index.tsx file */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-screen bg-gray-800 text-white
          transition-all duration-300 ease-in-out
          z-50
          flex flex-col
          ${isOpen ? "w-[20vw]" : "w-6"}
        `}
      >
        {/* Handle / Toggle Button */}
        <div
          className="
            absolute top-1/2 right-0 transform -translate-y-1/2
            w-6 h-6 bg-gray-300 text-black 
            flex items-center justify-center 
            cursor-pointer rounded-full
            shadow-md
          "
          onClick={(e) => {
            e.stopPropagation();
            toggleSidebar();
          }}
        >
          {isOpen ? (
            /* Arrow pointing left (close) */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          ) : (
            /* Arrow pointing right (open) */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          )}
        </div>

        {/* Sidebar Content */}
        {isOpen && (
          <div
            className="p-4 overflow-y-auto"
            onClick={(e) => {
              // Prevent clicks inside sidebar from closing it
              e.stopPropagation();
            }}
          >
            <h2 className="text-xl font-semibold mb-4">Products API</h2>
            {/* A small menu to select which form to show */}
            <div className="flex gap-2 mb-4 flex-wrap">
              <button
                onClick={() => {
                  setActiveForm(HttpMethod.GET);
                  setServerResponse("");
                }}
                className={`px-2 py-1 rounded text-sm ${
                  activeForm === "GET"
                    ? "bg-blue-600"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                GET
              </button>
              <button
                onClick={() => {
                  setActiveForm(HttpMethod.POST);
                  setServerResponse("");
                }}
                className={`px-2 py-1 rounded text-sm ${
                  activeForm === "POST"
                    ? "bg-green-600"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                POST
              </button>
              <button
                onClick={() => {
                  setActiveForm(HttpMethod.PATCH);
                  setServerResponse("");
                }}
                className={`px-2 py-1 rounded text-sm ${
                  activeForm === "PATCH"
                    ? "bg-yellow-600"
                    : "bg-yellow-500 hover:bg-yellow-600"
                }`}
              >
                PATCH
              </button>
              <button
                onClick={() => {
                  setActiveForm(HttpMethod.DELETE);
                  setServerResponse("");
                }}
                className={`px-2 py-1 rounded text-sm ${
                  activeForm === "DELETE"
                    ? "bg-red-600"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                DELETE
              </button>
            </div>

            {/* Conditionally render each form */}
            <FormContent
              activeForm={activeForm}
              setServerResponse={setServerResponse}
            />

            {/* Server Response */}
            {serverResponse && (
              <div className="bg-gray-700 p-2 rounded text-xs whitespace-pre-wrap">
                <strong>Response:</strong>
                <pre>{serverResponse}</pre>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Form;
