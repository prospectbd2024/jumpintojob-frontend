"use client";
import React, { useState, useEffect } from "react";

function Suggestions({ props }) {
  const { setSkill, selectedSkills } = props;
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
        const filteredSkills = data.data.filter(skill =>
          !selectedSkills.some(selectedSkill => selectedSkill.name === skill.name)
        );
        setSuggestedSkills(filteredSkills);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, [selectedSkills]);

  return (
    <div className="mt-5">
      <p className="text-lg font-bold mb-3">Suggested based on your profile</p>
      <ul className="list-none p-0 m-0">
        {suggestedSkills && suggestedSkills.map((skill, index) => (
          <li
            key={index}
            onClick={() => setSkill(skill)}
            className="inline-block bg-gray-200 border border-gray-300 rounded-full px-4 py-1 mr-2 mb-2 cursor-pointer hover:bg-gray-300"
          >
            {skill.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Suggestions;
