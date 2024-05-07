// Skill.js
"use client";
import React, { useCallback,useState } from "react";
import { RiMedalFill } from "react-icons/ri";
import { HiMinus } from "react-icons/hi";
import SkillContextProvider from "@/Contexts/SkillContext";
import ResumeSkills from "@/ResumeBuilder/ResumeComponents/ResumeSkills/ResumeSkills";
import "./Skill.css"; // Import CSS file
import AddSkills from "@/ResumeBuilder/ResumeComponents/ResumeSkills/AddSkills";
import { useModalContext } from "@/Contexts/ModalContext";
import ModalBox from "./ModalBox";
import AddSkillButton from "@/ResumeBuilder/ResumeComponents/ResumeSkills/AddSkillButton";
import Modal from "@/ResumeBuilder/ResumeComponents/ResumeSkills/Modal";
import AddSkill from "./AddSkill";

function Skill({ props }) {
  const { skills, setSkills } = props;
  const [skill, setSkill] = useState({ id: false });
  const [skillError,setSkillError] = useState("");
  const [modal, manageModal] = useState({
    display: "none",
    title: "Loading",
    state: "new",
  });
  const removeSkill = useCallback(
    (id) => {
      setSkills((prev) => {
        return prev.filter((skill, index) => {
          return index != id;
        });
      });
    },
    [skills]
  );
  const showModal = useCallback(
    (title) => {
      manageModal((prev) => ({
        title: title,
        display: "block",
      }));
    },
    [skill]
  );
  const closeModal = useCallback(() => {
    setSkill({});
    manageModal({
      display: "none",
    });
  }, [skill]);
  const saveChanges = useCallback((skill) => {
    setSkills((prev) => {
      return [...prev, skill];
    });

    closeModal();
  }, [skill]);


  const selectSkill =useCallback((skill)=>{
    if(validation(skill)){
      saveChanges(skill)
      closeModal()
      setSkillError();
    }
    
  },[skill,skills])
  const validation =useCallback((skill)=>{
    let flag = true;
    skills.map((element)=>{
      if(element.name==skill.name){
        flag = false;
        setSkillError("Skill Already Present")
      }
    })
    return flag;

  },[skill,skills])
  return (
    <div className="skills-content education-content">
      <div className="qualifications-header">
        <RiMedalFill />
        <h3>Skills</h3>
      </div>
      {skills && (
        <div className="skills-container qualifications-container">
          {skills.map((skill, index) => (
            <div className="skill-item" key={index}>
              <div className="skill-name">{skill.name}</div>
              <HiMinus
                className="remove-skill"
                onClick={() => {
                  removeSkill(index);
                }}
              />
            </div>
          ))}
        </div>
      )}
      {skills.length == 0 && <div className="no-skills">Please Add Skills</div>}
      <div className="add-skill" onClick={() => {
        showModal("Add Skill")
      }}>
        <p>Add Skill</p>
        <button>+</button>
      </div>
      <ModalBox props={{ ...modal,onSave: saveChanges , onClose: closeModal }}>
        <AddSkill props={{selectedSkill: skill ,selectSkill ,skillError}} />
      </ModalBox>
    </div>
  );
}

export default Skill;
