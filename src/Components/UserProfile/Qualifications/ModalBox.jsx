"use client";
import React from "react";
import { HiX } from "react-icons/hi";
import "./ModalBox.css"; // Import CSS file

function ModalBox({ props }) {
  const { modal, manageModal } = props;

  return (
    <div className="modal-container" style={{ display: modal.display }}>
      <div className="modal-header">
        <h3>{modal.title}</h3>
        <HiX
          className="hix"
          onClick={() => {
            manageModal((prev) => {
              return { ...prev, display: "none" };
            });
          }}
        />
      </div>
      <div className="modal-body">{modal.body}</div>
      <div className="modal-footer">
        <input className="qualification-submit-btn" type="submit" value="Save" />
        <button
          onClick={() => {
            manageModal((prev) => {
              return { ...prev, display: "none" };
            });
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default ModalBox;
