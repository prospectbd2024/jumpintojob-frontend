import React from "react";
import SkillListView from "./SkillListView";

function SuggestedSkills({ props }) {
  const {
    suggestedSkills,
    setSuggestedSkills,
    handleSkillSave,
    setCurrentSkill,
    putCurrentSkill,
  } = props;
  return (
    <div className="suggested-skills">
      <p>Suggested based on your profile</p>
      <SkillListView
        suggestedSkills={suggestedSkills}
        setSuggestedSkills={setSuggestedSkills}
        handleSkillSave={handleSkillSave}
        setCurrentSkill={setCurrentSkill}
        putCurrentSkill={putCurrentSkill}
      />
    </div>
  );
}

export default SuggestedSkills;
