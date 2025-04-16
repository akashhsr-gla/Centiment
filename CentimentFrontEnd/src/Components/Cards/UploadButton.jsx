import React, { useState } from "react";
import { FiUpload } from "react-icons/fi";
import { AiOutlineExclamationCircle } from "react-icons/ai";

const UploadButton = ({ title, onUpload, apiError }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(""); // Internal error state

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setError(""); // Clear previous errors when a new file is selected
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file before uploading!");
      return;
    }

    setError(""); // Reset errors
    await onUpload(selectedFile); // Call API function
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 border border-gray-300 rounded-lg shadow-lg bg-blue-50 w-96 mx-auto">
      <h2 className="text-2xl font-bold text-blue-700 mb-2">{title}</h2>
      <p className="text-sm text-gray-600 text-center mb-4">
        Choose an Excel file with columns: <strong>Name, Source-for Income/ Category-for Expense, Amount</strong>, and <strong>Icon</strong> (optional).
      </p>

      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileChange}
        className="block w-full text-lg font-medium text-gray-900 border border-gray-400 rounded-lg cursor-pointer bg-white focus:outline-none p-2"
      />

      {/* Display internal errors or API errors */}
      {(error || apiError) && (
        <div className="flex items-center gap-2 mt-2 text-red-600 text-sm font-medium">
          <AiOutlineExclamationCircle size={18} />
          {error || apiError}
        </div>
      )}

      <button
        onClick={handleUpload}
        className="mt-4 flex items-center gap-2 bg-blue-700 text-white text-lg font-bold py-3 px-6 rounded-lg hover:bg-blue-800 transition duration-200"
      >
        <FiUpload size={22} />
        Upload
      </button>
    </div>
  );
};

export default UploadButton;
