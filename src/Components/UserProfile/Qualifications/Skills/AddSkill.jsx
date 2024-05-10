// AddSkill.js
import React,{useEffect}  from "react";
import SkillInput from "./SkillInput";
import Suggestions from "./Suggestions";
import "./AddSkill.css";
import SkillProperties from "./SkillProperties";

function AddSkill({props}) {
    const {selectedSkill,skillErrors,setSkill} =props;
    
  return (
    <div className="add-skill-container">
      <p className="add-skill-heading">
        Add your top skills to impress the employers
      </p>
      <SkillInput props={{setSkill,selectedSkill}} />
      <Suggestions props={{setSkill,selectedSkill}} />
      <div className='skill-error'>{ Object.keys(skillErrors).map ((key)=>{
        return <p key={key}>{skillErrors[key]}</p>
      })}</div>
      {
      selectedSkill.name &&
      <SkillProperties    props={{setSkill,selectedSkill}}/>
      }
    </div>
  );
}

export default AddSkill;
