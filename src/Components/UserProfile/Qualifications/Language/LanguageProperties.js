import React, { useEffect } from "react";
import "./LanguageProperties.css";

function LanguageProperties({ props }) {
  const { selectedLanguage, setLanguage } = props;

  const handleProficiencyChange = (e) => {
    setLanguage(prev => ({ ...prev, proficiency: e.target.value }));
  };

  useEffect(() => {
    if (!selectedLanguage.proficiency) {
      setLanguage(prev => ({ ...prev, proficiency: 'Beginner' }));
    }
  }, [selectedLanguage, setLanguage]);

  return (
    <div className="language-properties-container">
      <div>
        <label htmlFor="proficiency">Select Proficiency Level <span style={{color: 'red'}}>*</span></label>
      </div>
      <div>
        <select
          id="proficiency"
          value={selectedLanguage.proficiency || 'Beginner'}
          className='language-proficiency-options'
          onChange={handleProficiencyChange}
        >
          <option value="Beginner">Beginner</option>
          <option value="Fluent">Fluent</option>
          <option value="Native">Native</option>
        </select>
      </div>
    </div>
  );
}

export default LanguageProperties;