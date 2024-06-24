// ApplyButtonSection.js
import React from "react";

const ApplyButtonSection = ({ CV, handleClick }) => (
  <div style={{ display: "flex", justifyContent: "flex-end" }}>
    <button className={`${!CV ? "apply-restriction" : "apply-job-button"}`} type="button" onClick={handleClick}>
      Apply
    </button>
  </div>
);

export default ApplyButtonSection;
