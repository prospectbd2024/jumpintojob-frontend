'use client'
import { useEffect, useState } from "react";
import SkillListView from "./SkillListView";

const SuggestedSkills = ({onSkillClick, selectedSkills}) => {
  const [suggestedSkills, setSuggestedSkills] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/skills`)
      .then((res) => res.json())
      .then((data) => {
        const filteredSkills = data.data.filter(skill => 
          !selectedSkills.some(selectedSkill => selectedSkill.name === skill.name)
        );
        setSuggestedSkills(filteredSkills);
      })
      .catch((error) => console.error('Error fetching suggested skills:', error));
  }, [selectedSkills]);
  
  return (
    <div className="suggested-skills">
      <p>Suggested based on your profile</p>
      <SkillListView skills={suggestedSkills} onSkillClick={onSkillClick} />
    </div>
  );
};

export default SuggestedSkills;