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
          className={`text-white bg-primary-600 opacity-70 h-12 w-full text-lg text-center pt-5 rounded-md mb-5 border border-secondary-400 ${typeClasses[type] || ''}`}
        >
          {message}
        </div>
      )}
    </>
  );
}

export default MessageBox;
