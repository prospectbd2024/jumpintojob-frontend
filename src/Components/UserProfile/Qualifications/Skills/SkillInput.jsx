"use client"
import React, { useState, useCallback, useEffect } from "react";
// import "./SkillInput.css";

function SkillInput({ props }) {
  const { setSkill, selectedSkill, selectedSkills } = props;
  const [showSearchSuggestion, setShowSearchSuggestion] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [suggestedSkills, setSuggestedSkills] = useState([]);
  const [allSkills, setAllSkills] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/skills`)
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
    .then(data => {
      setAllSkills(data.data);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  }, []);

  useEffect(() => {
    const filteredSkills = allSkills.filter(skill => 
      !selectedSkills.some(selectedSkill => selectedSkill.name === skill.name) &&
      skill.name.toLowerCase().includes(searchKey.toLowerCase())
    );
    setSuggestedSkills(filteredSkills.slice(0, 5));
  }, [searchKey, allSkills, selectedSkills]);

  const handleSearchFocus = useCallback(() => {
    setShowSearchSuggestion(true);
  }, []);

  const handleSearchBlur = useCallback(() => {
    setTimeout(() => {
      setShowSearchSuggestion(false);
    }, 200);
  }, []);

  const handleChange = (e) => {
    setSearchKey(e.target.value);
  };

  const onSkillClick = (skill) => {
    setSkill((prev) => ({...prev, name: skill.name}));
    setSearchKey(skill.name);
    setShowSearchSuggestion(false);
  }

  useEffect(() => {
    setSearchKey(selectedSkill.name || "");
  }, [selectedSkill]);

  return (
    <div className="add-skill-input-container">
      <label htmlFor="skill" className="add-skill-label">
        Select Skill
      </label>
      <input
        type="text"
        id="skill"
        className="add-skill-input"
        onFocus={handleSearchFocus}
        onBlur={handleSearchBlur}
        value={searchKey}
        onChange={handleChange}
      />
      {showSearchSuggestion && suggestedSkills.length > 0 && (
        <div className="suggestions-container">
          <ul className="suggestions-list">
            {suggestedSkills.map((skill, index) => (
              <li key={index} onMouseDown={() => onSkillClick(skill)}>{skill.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SkillInput;