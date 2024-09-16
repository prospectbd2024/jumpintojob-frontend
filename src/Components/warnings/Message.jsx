import React from "react";

function MessageBox({ message, type }) {
  const typeClasses = {
    success: 'bg-green-500 border-green-600',
    error: 'bg-red-500 border-red-600',
    info: 'bg-blue-500 border-blue-600',
    // Add more types as needed
  };

  return (
    <>
      {message && (
        <div
          className={`bg-primary-color text-white text-sm opacity-70  w-full  text-center pt-5 pb-3 rounded-md mb-5 border border-secondary-400 ${typeClasses[type] || ''}`}
        >
          {message}
        </div>
      )}
    </>
  );
}

export default MessageBox;
