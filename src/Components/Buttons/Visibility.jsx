import React from "react";
import {FaEye, FaEyeSlash} from 'react-icons/fa'
import './Visibility.css'
function Visibility({handleVisibility,visibility}) {
  return (
    <div className='eye-icons-container'>
        {visibility ?
      <FaEye className="eye-icon"   onClick={handleVisibility} />:
      <FaEyeSlash className="eye-slash-icon"  onClick={handleVisibility} />
        }

      <div className='eye-info'>{
            visibility?"Visible on CV" : "Not Visible"
      }</div>

    </div>
  );
}

export default Visibility;
