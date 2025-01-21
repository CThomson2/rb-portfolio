import React from "react";

export default function BatchUploadPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Batch Upload</h1>
      <p className="text-sm text-gray-500">
        Upload a batch of scans to the database
      </p>
      <div className="flex flex-col items-center justify-center">
        <label
          htmlFor="file-upload"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Barcode Label PDF
        </label>
        <input
          type="file"
          className="hidden"
          id="file-upload"
          multiple
          accept="image/*"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Upload
        </button>
      </div>
    </div>
  );
}
