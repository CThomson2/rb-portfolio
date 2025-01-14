export const formConfigurations = {
  GET: {
    handleSubmit: async (
      setServerResponse: React.Dispatch<React.SetStateAction<string>>
    ) => {
      try {
        setServerResponse("Fetching data...");
        const response = await fetch("/api/products"); // Example API endpoint
        const data = await response.json();
        setServerResponse("Data fetched successfully.");
      } catch (error) {
        setServerResponse("Error fetching data.");
      }
    },
    fields: [
      {
        name: "product_id",
        label: "Product ID (optional):",
        placeholder: "Enter product ID or leave blank for all",
        required: false,
      },
    ],
    buttonClass: "bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded",
    buttonText: "Fetch",
  },
  POST: {
    handleSubmit: async (
      setServerResponse: React.Dispatch<React.SetStateAction<string>>
    ) => {
      try {
        setServerResponse("Creating data...");
        const response = await fetch("/api/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: "Example", sku: "12345" }), // Example payload
        });
        const data = await response.json();
        setServerResponse("Data created successfully.");
      } catch (error) {
        setServerResponse("Error creating data.");
      }
    },
    fields: [
      {
        name: "name",
        label: "Name:",
        placeholder: "e.g. n-Butyl Chloride",
        required: true,
      },
      {
        name: "sku",
        label: "SKU:",
        placeholder: "e.g. RG2008",
        required: true,
      },
      {
        name: "grade",
        label: "Grade:",
        placeholder: "e.g. GD / HPLC / PTS-DS",
        required: false,
      },
    ],
    buttonClass: "bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded",
    buttonText: "Create",
  },
  PATCH: {
    handleSubmit: async (
      setServerResponse: React.Dispatch<React.SetStateAction<string>>
    ) => {
      try {
        setServerResponse("Updating data...");
        const response = await fetch("/api/products", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ product_id: "1", newName: "Updated Name" }), // Example payload
        });
        const data = await response.json();
        setServerResponse("Data updated successfully.");
      } catch (error) {
        setServerResponse("Error updating data.");
      }
    },
    fields: [
      {
        name: "product_id",
        label: "Product ID to Update:",
        placeholder: "e.g. 5",
        required: true,
      },
      {
        name: "newName",
        label: "New Name:",
        placeholder: "e.g. Modified name",
        required: false,
      },
    ],
    buttonClass:
      "bg-yellow-600 hover:bg-yellow-700 text-white px-2 py-1 rounded",
    buttonText: "Update",
  },
  DELETE: {
    handleSubmit: async (
      setServerResponse: React.Dispatch<React.SetStateAction<string>>
    ) => {
      try {
        setServerResponse("Deleting data...");
        const response = await fetch("/api/products", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ product_id: "1" }), // Example payload
        });
        const data = await response.json();
        setServerResponse("Data deleted successfully.");
      } catch (error) {
        setServerResponse("Error deleting data.");
      }
    },
    fields: [
      {
        name: "product_id",
        label: "Product ID to Delete:",
        placeholder: "e.g. 10",
        required: true,
      },
    ],
    buttonClass: "bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded",
    buttonText: "Delete",
  },
};
