// AddSkill.js
import React  from "react";
import SkillInput from "./Skills/SkillInput";
import Suggestions from "./Skills/Suggestions";
import "./AddSkill.css";

function AddSkill({props}) {
    const {selectedSkill,selectSkill,skillError} =props;
  return (
    <div className="add-skill-container">
      <p className="add-skill-heading">
        Add your top skills to impress the employers
      </p>
      <SkillInput props={{selectSkill}} />
      <Suggestions props={{selectSkill}} />
      <div className='skill-error' hidden={!skillError}>{skillError}</div>
    </div>
  );
}

export default AddSkill;
