"use client";
import { FaTrashAlt } from "react-icons/fa";
import React, { useCallback, useState } from "react";
import { RiMedalFill } from "react-icons/ri";
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
    setSkillErrors({});
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
      saveChanges(skill);
      closeModal();
    } else {
      console.log(skillErrors);
    }
  }, [skill, skills, saveChanges, closeModal, validation]);

  const isChecked = (list, item) => {
    return list && list.includes(item);
  };

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
    <div className="mt-5 border border-gray-300 p-5 rounded-lg bg-white mb-5">
      <div className="flex items-center mb-2">
        <RiMedalFill className="text-2xl text-yellow-500" />
        <h3 className="ml-2 text-xl font-semibold">Skills</h3>
      </div>
      {skills && (
        <div className="space-y-2">
          {skills.map((skill, index) => (
            <div className="grid grid-cols-4 gap-2 items-center mb-2" key={index}>
              <div className="bg-gray-200 border border-secondary rounded-xl p-2 text-lg font-bold text-center">
                {skill.name}
              </div>
              <div>
                <Rating props={{ rating: skill.rating, setRating: () => {}, mode: 'r' }} onChange={() => {}} />
              </div>
              <div className="font-bold text-sm flex space-x-2">
                {
                  skill?.learnedFrom?.map(el => {
                    return <span className="ml-1">{el}</span>;
                  }) 
                }
              </div>
              <div className="flex justify-end items-center">
                <FaTrashAlt
                  className="text-red-500 cursor-pointer text-xl"
                  onClick={() => removeSkill(index)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
      {skills.length === 0 && <div className="p-2 text-lg font-bold">Please Add Skills</div>}
      <div>
        <AddButton onClick={() => showModal('Add Skill', 'add')} />
      </div>
      <ModalBox props={{ ...modal, onSave: saveSkill, onClose: closeModal }}>
        <AddSkill props={{ selectedSkill: skill, setSkill, skillErrors, selectedSkills }} />
      </ModalBox>
      {searchResults.length > 0 && (
        <ul className='absolute top-full left-0 w-full bg-white border border-secondary rounded-b-md shadow-lg mt-2 z-10'>
          {searchResults.map((result, index) => (
            <li
              key={index}
              className='p-2 cursor-pointer hover:bg-gray-100'
              onClick={() => handleSelect(result)}
            >
              {result.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Skill;
