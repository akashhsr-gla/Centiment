import React from 'react';

const DeleteAlert = ({ content, onDelete, onCancel }) => {
  console.log("DeleteAlert component rendered"); // Debugging

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg text-center">
      <h2 className="text-lg font-semibold text-gray-800">Confirm Deletion</h2>
      <p className="text-gray-600 mt-2">{content}</p>

      <div className="mt-4 flex justify-center space-x-4">
        <button 
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          onClick={() => { 
            console.log("Delete button inside DeleteAlert clicked!"); 
            onDelete(); 
          }}
        >
          Delete
        </button>
        <button 
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteAlert; 
