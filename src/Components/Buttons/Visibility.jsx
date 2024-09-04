import React from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Visibility = ({ handleVisibility, visibility }) => {
  return (
    <div className="relative flex flex-col items-center">
      {visibility ? (
        <FaEye
          className="text-white text-2xl cursor-pointer"
          onClick={handleVisibility}
        />
      ) : (
        <FaEyeSlash
          className="text-gray-500 text-2xl cursor-pointer"
          onClick={handleVisibility}
        />
      )}
      <div className="
        absolute 
        bottom-[-25px] 
        w-24 
        text-xs 
        text-center 
        transition-opacity 
        duration-300 
        ease-in-out 
        opacity-0 
        pointer-events-none 
        group-hover:opacity-100
      ">
        {visibility ? "Visible on CV" : "Not Visible"}
      </div>
    </div>
  );
};

export default Visibility;
