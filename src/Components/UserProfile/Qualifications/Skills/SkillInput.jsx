// SkillInput.js
"use client"
import React, { useState, useCallback, useEffect } from "react";
// import "./SkillInput.css";

function SkillInput({ props }) {
  const { setSkill,selectedSkill } = props;
  const [showSearchSuggestion, setShowSearchSuggestion] = useState(false);
  const [isTyping, setTyping] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [suggestedSkills, setSuggestedSkills] = useState([]);

  useEffect(() => {

    searchKey && !isTyping  &&
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/skills/search/${searchKey}`)
        .then(res => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          return res.json();
        })
        .then(data => {
          setSuggestedSkills(data.data);
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        });
  }, [isTyping,searchKey]);


  const handleSearchFocus = useCallback(() => {
    setShowSearchSuggestion(true);
  }, []);

  const handleSearchBlur = useCallback(() => {
    setTimeout(() => {
      setShowSearchSuggestion(false);
    }, 100);
  }, []);

  const handleChange = (e) => {
    setSearchKey(e.target.value);
    setTyping(true);
  };

  // Use another useEffect to detect when typing is done
  useEffect(() => {
    const typingTimeout = setTimeout(() => {
      setTyping(false);
    }, 500); // Adjust the timeout value as needed

    return () => clearTimeout(typingTimeout);
  }, [searchKey]);

  const onSkillCLick=(skill)=>{
    setSkill((prev)=>({...prev,name: skill.name}));
    setSuggestedSkills([])
  }
  useEffect(()=>{
    setSearchKey(selectedSkill.name)
  },[selectedSkill])

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
        value={searchKey || ""}
        onChange={handleChange}
      />
      <div className="suggestions-container" hidden={!showSearchSuggestion}>
        <ul className="suggestions-list">
          {suggestedSkills && suggestedSkills.map((skill, index) => (
            <li key={index} onClick={() => {onSkillCLick(skill)  }}>{skill.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SkillInput;
