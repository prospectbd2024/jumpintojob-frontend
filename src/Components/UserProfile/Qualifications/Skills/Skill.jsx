"use client";
import { FaTrashAlt } from "react-icons/fa"; 
import React, { useCallback, useState } from "react";
import { RiMedalFill } from "react-icons/ri";
import "./Skill.css";
import ModalBox from "../ModalBox";
import AddSkill from "./AddSkill";
import Rating from "./Rating";
import AddButton from "@/Components/Buttons/AddButton";

function Skill({ props }) {
  const { skills, addSkill, removeSkill, selectedSkills } = props;
  const [skill, setSkill] = useState({ id: false });
  const [skillErrors, setSkillErrors] = useState({});
  const [modal, manageModal] = useState({
    display: "none",
    title: "Loading",
    state: "new",
  });
  const [searchResults, setSearchResults] = useState([]);

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
    addSkill(skill);
  }, [addSkill]);

  const validation = useCallback((skill) => {
    let flag = true;
    setSkillErrors({});
    if (!skill.name) {
      flag = false;
      setSkillErrors(prev => ({ ...prev, name: "Skill is not selected!" }));
    }
    if (!skill.rating) {
      flag = false;
      setSkillErrors(prev => ({ ...prev, rating: "Rating is missing!" }));
    }
    if (!skill.learnedFrom) {
      flag = false;
      setSkillErrors(prev => ({ ...prev, learnedFrom: "Please check from where you learned this skill!" }));
    }
    if (skills.some(s => s.name === skill.name)) {
      flag = false;
      setSkillErrors(prev => ({ ...prev, duplicate: "Skill already present!" }));
    }
    return flag;
  }, [skills]);

  const saveSkill = useCallback(() => {
    if (validation(skill)) {
      saveChanges(skill)
      closeModal()
    } else {
      console.log(skillErrors);
    }
  }, [skill, skills, saveChanges, closeModal, validation]);

  const isChecked = (list, item) => {
    return list && list.includes(item);
  }

  const handleChange = (e) => {
    setSkill(prev => ({ ...prev, name: e.target.value }));
    if (e.target.value === '') {
      setSearchResults([]);
    } else {
      // Mock search function, replace with actual search logic
      const results = skills.filter(s => s.name.toLowerCase().includes(e.target.value.toLowerCase()));
      setSearchResults(results);
    }
  };

  const handleSelect = (selectedSkill) => {
    setSkill(selectedSkill);
    setSearchResults([]);
  };

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
                <Rating props={{rating: skill.rating, setRating: () => {}, mode: 'r'}} onChange={() => {}} />
              </div>
              <div className="skill-learned-from"> 
                <div>
                  <label><input type="checkbox" name="self" defaultChecked={isChecked(skill?.learnedFrom, 'self')} /> Self</label><br/>
                </div>
                <div>
                  <label><input type="checkbox" name="job" defaultChecked={isChecked(skill?.learnedFrom, 'service')} /> Job</label><br/>
                </div>
                <div>
                  <label><input type="checkbox" name="education" defaultChecked={isChecked(skill?.learnedFrom, 'education')} /> Education</label><br/>
                </div>
                <div>
                  <label><input type="checkbox" name="professional_training" defaultChecked={isChecked(skill?.learnedFrom, 'training')} /> Professional Training</label><br/>
                </div>
              </div>
              <div className='skill-actions'> 
                <FaTrashAlt
                  className="remove-skill"
                  onClick={() => removeSkill(index)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
      {skills.length === 0 && <div className="no-skills">Please Add Skills</div>}
      <div>
        <AddButton onClick={() => showModal('Add Skill', 'add')}/>
      </div>
      <ModalBox props={{ ...modal, onSave: saveSkill, onClose: closeModal }}>
        <AddSkill props={{selectedSkill: skill, setSkill, skillErrors, selectedSkills}} />
      </ModalBox>
      {/* <div className='resume-input-field input-container'>
        <input 
          type="text" 
          name="skill" 
          id="skill" 
          placeholder="Search skill" 
          value={skill.name || ''} 
          onChange={handleChange} 
        />
        <label htmlFor="skill">Skill</label>
      </div> */}
      {searchResults.length > 0 && (
        <ul className='search-results'>
          {searchResults.map((result, index) => (
            <li key={index} onClick={() => handleSelect(result)}>
              {result.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Skill;
