"use client";
import React,{useEffect} from "react";
import { HiX } from "react-icons/hi";
import "./ModalBox.css"; // Import CSS file
import { useModalContext } from "@/Contexts/ModalContext";

function ModalBox({children,props,onSave,onClose}) {
  const {title,display} = props;


  return (
    <div className="modal-container" style={{ display: display }}>
      <div className="modal-header">
        <h3>{title}</h3>
        <HiX
          className="hix"
          onClick={onClose}

        />
      </div>
      <div className="modal-body">{children}</div>
      <div className="modal-footer">
        <button className="qualification-submit-btn"  onClick={onSave} >
          Save
        </button>

        <button className="qualification-close-btn"  onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default ModalBox;
