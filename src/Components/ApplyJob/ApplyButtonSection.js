import React from "react";

const ApplyButtonSection = ({ CV, handleClick }) => (
  <div className="flex justify-end">
    <button
      className={`${
        !CV ? "bg-gray-500 text-white border border-gray-500" : "bg-blue-500 text-white"
      } px-4 py-2 rounded-md font-bold transition duration-300 ease-out hover:bg-transparent hover:text-blue-500 hover:border-blue-500`}
      type="button"
      onClick={handleClick}
    >
      Apply
    </button>
  </div>
);

export default ApplyButtonSection;
