import React from "react";
function WarningBox({ message }) {
  return (
    <>
      {message && (
        <div
          style={{
            color: "red",
            paddingTop: "6px",
            marginInline: "auto",
            marginBlockEnd: "20px",
            textAlign :'center'
          }}
        >
          {message}
        </div>
      )}
    </>
  );
}

export default WarningBox;
