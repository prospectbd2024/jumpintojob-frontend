import React from 'react';
import { FaPlus } from 'react-icons/fa6';

function AddMoreButton({ children, handleAddMore }) {
  return (
    <div className="add-more-education">
      <button
        onClick={handleAddMore}
        className="flex items-center gap-2 cursor-pointer opacity-100 transition-opacity duration-200 hover:opacity-80"
      >
        <FaPlus /> {children}
      </button>
    </div>
  );
}

export default AddMoreButton;
