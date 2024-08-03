import React from "react";
import SkillInput from "./SkillInput";
import Suggestions from "./Suggestions";
import SkillProperties from "./SkillProperties";

function AddSkill({ props }) {
  const { selectedSkill, skillErrors, setSkill, selectedSkills } = props;

  return (
    <div className="bg-white p-5 rounded-lg shadow-md">
      <p className="text-xl font-semibold mb-4">
        Add your top skills to impress the employers
      </p>
      <SkillInput props={{ setSkill, selectedSkill, selectedSkills }} />
      <Suggestions props={{ setSkill, selectedSkill, selectedSkills }} />
      {Object.keys(skillErrors).length > 0 && (
        <div className="text-red-500 text-base mt-4">
          {Object.keys(skillErrors).map((key) => (
            <p key={key}>{skillErrors[key]}</p>
          ))}
        </div>
      )}
      {selectedSkill.name && (
        <SkillProperties props={{ setSkill, selectedSkill }} />
      )}
    </div>
  );
}

export default AddSkill;
