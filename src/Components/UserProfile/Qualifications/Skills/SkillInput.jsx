// SkillInput.js
"use client"
import React, { useState, useCallback,useEffect } from "react";
// import "./SkillInput.css";

function SkillInput({ props }) {
  const {selectSkill} = props;
  const [showSearchSuggestion, setShowSearchSuggestion] = useState(false);

  const [searchKey,setSearchKey] = useState("");

  const [suggestedSkills,setSuggestedSkills] = useState([]);

  useEffect(() => {
    searchKey&&
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
  
   
  }, [searchKey]);

  useEffect(()=>{
    console.log(searchKey);
  },[searchKey])

  const handleSearchFocus = useCallback(() => {
    setShowSearchSuggestion(true);

  }, []);

  const handleSearchBlur = useCallback(() => {
    setTimeout(() => {
      setShowSearchSuggestion(false);
    }, 100);

  }, []);


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
        onChange={(e)=>{setSearchKey(e.target.value)}}
      />
      <div className="suggestions-container" hidden={!showSearchSuggestion}>
        <ul className="suggestions-list">
          {suggestedSkills && suggestedSkills.map((skill,index)=>{
           return <li key={index} onClick={()=>{ setSearchKey("") || selectSkill(skill)  }}>{skill.name}</li>
          })}
        </ul>
      </div>
      
    </div>
  );
}

export default SkillInput;
