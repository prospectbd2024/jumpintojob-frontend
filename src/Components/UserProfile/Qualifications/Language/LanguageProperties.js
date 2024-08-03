import React, { useEffect } from "react"; 

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
    <div className="mt-5 grid grid-cols-2 gap-4">
      <div>
        <label htmlFor="proficiency" className="font-bold text-lg">
          Select Proficiency Level <span className="text-red-500">*</span>
        </label>
      </div>
      <div>
        <select
          id="proficiency"
          value={selectedLanguage.proficiency || 'Beginner'}
          className="w-full p-2 mt-1 border border-secondary rounded outline-none"
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
