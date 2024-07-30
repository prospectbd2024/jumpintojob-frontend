import React from "react";
import LanguageInput from "./LanguageInput";
import LanguageProperties from "./LanguageProperties";
import "./AddLanguage.css";

function AddLanguage({ props }) {
  const { selectedLanguage, setLanguage, selectedLanguages } = props;

  return (
    <div className="add-language-container">
      <p className="add-language-heading">
        Add languages to your profile
      </p>
      
      <LanguageInput props={{ selectedLanguage, setLanguage, selectedLanguages }} />
      
      {selectedLanguage.language && (
        <LanguageProperties props={{ selectedLanguage, setLanguage }} />
      )}
    </div>
  );
}

export default AddLanguage;