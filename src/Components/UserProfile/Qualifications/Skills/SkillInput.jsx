"use client";
import React, { useState, useCallback, useEffect } from "react";

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
    <div className="relative">
      <label htmlFor="skill" className="font-bold text-lg">
        Select Skill
      </label>
      <input
        type="text"
        id="skill"
        className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none"
        onFocus={handleSearchFocus}
        onBlur={handleSearchBlur}
        value={searchKey}
        onChange={handleChange}
      />
      {showSearchSuggestion && suggestedSkills.length > 0 && (
        <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-300 rounded-b-md shadow-lg z-10">
          <ul className="list-none p-0 m-0">
            {suggestedSkills.map((skill, index) => (
              <li
                key={index}
                onMouseDown={() => onSkillClick(skill)}
                className="p-2 cursor-pointer transition-colors duration-300 hover:bg-gray-100"
              >
                {skill.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SkillInput;
