// AddLanguage.js
import React from "react";
import LanguageInput from "./LanguageInput";
import LanguageProperties from "./LanguageProperties";
import "./AddLanguage.css";

function AddLanguage({ props }) {
  const { selectedLanguage,setLanguage } = props;

  return (
    <div className="add-language-container">
      {/* Add language heading */}
      <p className="add-language-heading">
        Add languages to your profile
      </p>
      
      {/* Language input field */}
      <LanguageInput props={{ selectedLanguage,setLanguage }} />
      
      {/* Language properties */}
      {selectedLanguage.language&&  <LanguageProperties props={{ selectedLanguage,setLanguage }} />}
    </div>
  );
}

export default AddLanguage;
