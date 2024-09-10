import React from 'react';
import { FaPlus } from 'react-icons/fa'; // Importing the plus icon from react-icons library

function AddButton({ onClick }) {
  return (
    <div 
      className="flex justify-between pt-5 cursor-pointer m-5" 
      onClick={onClick}
    >
      <div className="flex items-center justify-center px-6 py-2 bg-primary-color text-white rounded-md mb-5 mt-5">
        Add
      </div>
      <div className="flex items-center">
        <FaPlus className="ml-2 text-white" />
      </div>
    </div>
  );
}

export default AddButton;
