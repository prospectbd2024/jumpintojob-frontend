import React from "react";

function WarningBox({ message }) {
  return (
    <>
      {message && (
        <div
          className="text-red-500 pt-1.5 mx-auto mb-5 text-center"
        >
          {message}
        </div>
      )}
    </>
  );
}

export default WarningBox;
