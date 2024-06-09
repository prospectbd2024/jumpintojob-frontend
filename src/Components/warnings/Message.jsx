import React from "react";
import './Message.css'
function MessageBox({ message,type }) {
  return (
    <>
      {message && (
        <div
           className={`message-box ${type?type:''}` }
        >
          {message}
        </div>
      )}
    </>
  );
}

export default MessageBox;
