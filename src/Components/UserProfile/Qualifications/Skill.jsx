// Skill.js
"use client"
import React ,{useCallback}from "react";
import { RiMedalFill } from "react-icons/ri";
import { HiMinus } from "react-icons/hi";
import SkillContextProvider from "@/Contexts/SkillContext";
import ResumeSkills from "@/ResumeBuilder/ResumeComponents/ResumeSkills/ResumeSkills";
import "./Skill.css"; // Import CSS file
import AddSkills from "@/ResumeBuilder/ResumeComponents/ResumeSkills/AddSkills";
import { useModalContext } from "@/Contexts/ModalContext";

function Skill({ props }) {
  const { skills,setSkills } = props;

  const removeSkill = useCallback(
    (id) => {
      setSkills(prev=>{
       return prev.filter((skill,index)=>{
        return index!=id;
       })
      })

    },
    [skills],
  )
  return (
    <div className="skills-content education-content">
      <div className="qualifications-header">
        <RiMedalFill />
        <h3>Skills</h3>
      </div>
        {skills && (
          <div className="skills-container qualifications-container">
            {skills.map((skill,index) => (
              <div className="skill-item" key={skill.skill}>
                <div className="skill-name">{skill.skill}</div>
                <HiMinus
                  className="remove-skill"
                  onClick={() => {
                    removeSkill(index)
                  }}
                />
              </div>
            ))}
          </div>
        )}
        {skills.length ==0&& <div className='no-skills'>Please Add Skills</div>}
      <div className="add-skill" onClick={() => {
      }}>
        <p>Add Skill</p>
        <button>+</button>
      </div>
    </div>
  );
}

export default Skill;
