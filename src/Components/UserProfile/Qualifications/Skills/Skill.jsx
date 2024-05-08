// Skill.js
"use client";
import React, { useCallback,useState,useEffect } from "react";
import { RiMedalFill } from "react-icons/ri";
import { HiMinus } from "react-icons/hi";
import "./Skill.css"; // Import CSS file
import ModalBox from "../ModalBox";
import AddSkill from "./AddSkill";
import Rating from "./Rating";

function Skill({ props }) {
  const { skills, setSkills } = props;
  const [skill, setSkill] = useState({ id: false });
  const [skillErrors,setSkillErrors] = useState({});
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
    []
  );
  const closeModal = useCallback(() => {
    setSkill({});
    setSkillErrors({})
    manageModal({
      display: "none",
    });
  }, []);
  const saveChanges = useCallback((skill) => {
    setSkills((prev) => {
      return [...prev, skill];
    });

  }, [skill]);


  const saveSkill =useCallback(()=>{
    if(validation(skill)){
      saveChanges(skill)
      closeModal()
    }
    else{
      console.log(skillErrors);
    }
    
  },[skill,skills])
  const validation =useCallback((skill)=>{
    let flag = true;
    if(!skill.name){
      flag = false;
      setSkillErrors(  prev => ({ ...prev,name : "Skill is not selected!" }));
      return flag;
    }
    if(!skill.rating){
      flag = false;
      setSkillErrors(  prev => ({ ...prev,rating : "Rating is missing!" }));
    }
    if(!skill.learnedFrom){
      flag = false;
      setSkillErrors(  prev => ({ ...prev,learnedFrom : "Please check from where you learned this skill!" }));
    }
    skills.map((element)=>{
      if(element.name==skill.name){
        flag = false;
        setSkillErrors(  prev => ({ ...prev,duplicate : "Skill already present!" }));

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
              <div>
              <div className="skill-name">{skill.name}</div>
              </div>
              <div className="skill-rating"> 
              <Rating props={{rating: skill.rating, setRating : ()=>{} , mode : 'r'}} onChange={()=>{}} />
              </div>
              {/* <div>
                {skill.learnedFrom.map((el,index)=>{
                  return <div key={index} className="skill-name" >{el}</div>
                })}
              </div> */}
              <div className='skill-actions'> 
              <HiMinus
                className="remove-skill"
                onClick={() => {
                  removeSkill(index);
                }}
              />
              </div>
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
      <ModalBox props={{ ...modal,onSave: saveSkill , onClose: closeModal }}>
        <AddSkill props={{selectedSkill: skill ,setSkill ,skillErrors}} />
      </ModalBox>
    </div>
  );
}

export default Skill;
