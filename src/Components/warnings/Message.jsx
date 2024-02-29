import React from "react";
function MessageBox({ message }) {
  return (
    <>
      {message && (
        <div
          style={{
            color: "white",
            backgroundColor: "#3498db",
            height: "27px",
            width: "459px",
            paddingTop: "6px",
            marginInline: "auto",
            borderRadius: "4px",
            marginBlockEnd: "20px",
          }}
        >
          {message}
        </div>
      )}
    </>
  );
}

export default MessageBox;
