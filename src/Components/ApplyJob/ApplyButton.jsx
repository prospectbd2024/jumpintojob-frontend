// ApplyButton.jsx
import React from "react";
import router from 'next/router';

const ApplyButton = ({ CV, handleClick, userData }) => (
  <div style={{ display: "flex", justifyContent: "flex-end" }}>
    <button
      className={` ${!CV ? "apply-restriction" : "apply-job-button"}`}
      type="button"
      onClick={() => {
        if (userData) {
          handleClick();
        } else {
          Swal.fire({
            title: "User must login before applying!",
            text: "Do you want to login?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
          }).then((result) => {
            if (result.isConfirmed) {
              router.push("/signin");
            }
          });
        }
      }}
    >
      Apply
    </button>
  </div>
);

export default ApplyButton;
