// LanguageProperties.js
import React, { useState, useEffect } from "react";
import "./LanguageProperties.css";

function LanguageProperties({ props }) {
  const { selectedLanguage,setLanguage } = props;
  const [proficiency, setProficiency] = useState("");

  useEffect(() => {
    // Fetch proficiency levels
  }, []);

  const handleProficiencyChange = (e) => {
    setProficiency(e.target.value);
    if(
      selectedLanguage?.language
    ){
      setLanguage(prev=>({...prev,proficiency : e.target.value}))
    }
  
  };

  return (
    <div className="language-properties-container"  >
      <div>
      <label htmlFor="proficiency">Select Proficiency Level <span style={{color: 'red'}}>*</span> </label>
      </div>
      <div>
      <select
        id="proficiency"
        value={proficiency}
        className='language-proficiency-options'
        onChange={handleProficiencyChange}
      >
       <option>Beginner</option>
       <option>Fluent</option>
       <option>Native</option>
      </select>
      </div>
    </div>
  );
}

export default LanguageProperties;
