import React from 'react';

const Modal = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center  z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-xl">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-lg font-semibold text-blue-700">{title}</h3>
          <button
            className="text-gray-600 hover:text-red-500 text-lg"
            onClick={onClose}
          >
            ✖
          </button>
        </div>

        {/* Modal Body */}
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
