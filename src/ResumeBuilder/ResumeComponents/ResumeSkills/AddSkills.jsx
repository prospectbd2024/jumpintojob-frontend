import React, { useCallback } from "react";
import { HiPencil, HiPlus, HiX } from "react-icons/hi";
import "./AddSkills.css";
import { useState } from "react";
import { useUserContext } from "../../../UserContext/UserContext";
import { FaTrashAlt } from "react-icons/fa";
import { useEffect } from "react";
import Modal from "./Modal";

const AddSkills = () => {
  const { resumeData, setResumeData } = useUserContext();
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = (e) => {
    setShowModal(e);
  };
  const [skillList, setSkillList] = useState([]);
  const [currentSkill, setCurrentSkill] = useState({
    id: "",
    type: "",
    rating: 0,
  });
  const handleSkillList = useCallback((skill) => {
      setSkillList([...skillList, skill]);
      console.log([...skillList, skill])

    // console.log(skillList,skill)

  });



  const handleRemoveSkill = useCallback((index) => {
    const updatedSkillList = [...skillList];
    updatedSkillList.splice(index, 1);
    setSkillList(updatedSkillList);
  });
  useEffect(() => {
    // This effect runs whenever skillList changes
    setResumeData({ ...resumeData, skills: skillList });
  }, [skillList]);

  // console.log(resumeData)
  return (
    <div className="add-skills">
      <div className="add-new-skill" onClick={() => handleShowModal(true)}>
        <h4>Add skill</h4>
        <button>
          <HiPlus />
        </button>
      </div>
      <ul className="skills-list">
        {resumeData?.skills?.map((skill, index) => (
          <li className="skill" key={index}>
            <p>{skill.name}</p>
            <button onClick={() => handleRemoveSkill(index)}>
              <FaTrashAlt />
            </button>
          </li>
        ))}
      </ul>
      <Modal
        props={{
          showModal,
          handleShowModal,
          setCurrentSkill,
          currentSkill,
          handleSkillList,
        }}
      />
    </div>
  );
};

export default AddSkills;
