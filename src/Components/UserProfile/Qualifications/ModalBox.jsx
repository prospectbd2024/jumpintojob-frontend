"use client";
import React,{useEffect} from "react";
import { HiX } from "react-icons/hi"; 
import { useModalContext } from "@/Contexts/ModalContext";

function ModalBox({children,props }) {
  const {title,display,onSave,onClose} = props;


  return (
    <div className="bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 rounded-lg shadow-lg border border-gray-300 max-w-[90%] max-h-[80vh] overflow-auto z-[9999]" style={{ display: display }}>
      <div className="flex items-center justify-between mb-5 pb-1 border-b border-gray-300">
        <h3>{title}</h3>
        <HiX
          className="text-[#c82333] text-[24px] cursor-pointer transition-colors duration-300 hover:bg-[#f7adb5] hover:rounded-lg"
          onClick={onClose}

        />
      </div>
      <div className="">{children}</div>
      <div className="flex items-center justify-end gap-5 pt-6 mt-5 border-t border-gray-300">
        <button className="text-white border-none bg-primary-color w-[90px] h-[40px] text-base leading-[40px] rounded-lg font-bold cursor-pointer transition-colors duration-300"  onClick={onSave} >
          Save
        </button>

        <button className="bg-transparent text-red-600 border border-red-600 w-[90px] h-[40px] text-base font-bold rounded-lg cursor-pointer transition-colors duration-300 hover:bg-red-100"  onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default ModalBox;
