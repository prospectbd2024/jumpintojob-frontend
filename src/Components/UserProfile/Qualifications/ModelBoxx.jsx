"use client";
import React, { useEffect } from "react";
import { HiX } from "react-icons/hi"; 

function ModalBoxx({ children, props }) {
  const { title, display, onSave, onClose } = props;

  const handleSave = () => {
    console.log("Save button clicked"); 
    onSave(); 
  };

  return (
    <div 
      className="bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 rounded-lg shadow-lg border border-gray-300 max-w-[90%] max-h-[80vh] overflow-auto z-[9999]" 
      style={{ display: display }}
    >
      <div className="flex items-center justify-between mb-5 pb-1 border-b border-gray-300">
        <h3>{title}</h3>
        <HiX
          className="text-[#c82333] text-[24px] cursor-pointer transition-colors duration-300 hover:bg-[#f7adb5] hover:rounded-lg"
          onClick={onClose}
        />
      </div>
      <div>{children}</div>
    </div>
  );
}

export default ModalBoxx;
