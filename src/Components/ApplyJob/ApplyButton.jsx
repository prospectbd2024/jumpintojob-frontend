import React from "react";
import router from 'next/router';
import Swal from 'sweetalert2';

const ApplyButton = ({ CV, handleClick, userData }) => (
  <div className="flex justify-end">
    <button
      className={` ${!CV ? "bg-gray-600 text-white border-gray-600 hover:bg-transparent hover:text-gray-600 hover:border-gray-600" : "bg-primary text-white border-none hover:bg-transparent hover:text-primary hover:border-primary"} px-4 py-2 font-bold rounded-md transition-all duration-300`}
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
