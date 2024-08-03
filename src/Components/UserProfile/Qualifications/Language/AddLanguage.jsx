import React from "react";
import LanguageInput from "./LanguageInput";
import LanguageProperties from "./LanguageProperties";
import "tailwindcss/tailwind.css"; // Import Tailwind CSS if not already imported

function AddLanguage({ props }) {
  const { selectedLanguage, setLanguage, selectedLanguages } = props;

  return (
    <div className="bg-white p-5">
      <p className="text-xl mb-4">
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
