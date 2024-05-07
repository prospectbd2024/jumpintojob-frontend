// Suggestions.js
"use client";
import React, { useState,useEffect } from "react";
// import "./Suggestions.css";

function Suggestions({props}) {
  const {selectSkill} = props;
  const [suggestedSkills, setSuggestedSkills] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/skills/suggested`)
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
  
   
  }, []);
  return (
    <div className="suggested-skills">
      <p className="suggested-heading">Suggested based on your profile</p>
      <ul className="suggested-list">
        {suggestedSkills &&
          suggestedSkills.map((skill,index) => {
            return (
              <li
                key={index}
                onClick={() => {
                  selectSkill(skill)
                }}
              >
                {skill.name}
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default Suggestions;
