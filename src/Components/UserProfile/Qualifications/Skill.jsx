// Skill.js

import React from "react";
import { RiMedalFill } from "react-icons/ri";
import { HiMinus } from "react-icons/hi";
import SkillContextProvider from "@/Contexts/SkillContext";
import ResumeSkills from "@/ResumeBuilder/ResumeComponents/ResumeSkills/ResumeSkills";
import "./Skill.css"; // Import CSS file

function Skill({ props }) {
  const { skills, manageModal } = props;

  return (
    <div className="skills-content education-content">
      <div className="qualifications-header">
        <RiMedalFill />
        <h3>Skills</h3>
      </div>
        {skills && (
          <div className="skills-container qualifications-container">
            {skills.map((skill) => (
              <div className="skill-item" key={skill.skill}>
                <div className="skill-name">{skill.skill}</div>
                <HiMinus
                  className="remove-skill"
                  onClick={() => {
                    // Add remove skill functionality
                  }}
                />
              </div>
            ))}
          </div>
        )}
      <div className="add-skill" onClick={() => {
        manageModal({
          title: "Add Skills",
          display: "block",
          body: <SkillContextProvider><ResumeSkills /></SkillContextProvider>,
        });
      }}>
        <p>Add Skill</p>
        <button>+</button>
      </div>
    </div>
  );
}

export default Skill;
