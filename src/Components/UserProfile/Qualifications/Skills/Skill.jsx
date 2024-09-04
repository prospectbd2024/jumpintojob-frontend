"use client";
import { FaTrashAlt } from "react-icons/fa";
import React, { useCallback, useState } from "react";
import { RiMedalFill } from "react-icons/ri";
import ModalBox from "../ModalBox";
import AddSkill from "./AddSkill";
import Rating from "./Rating";

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

  const showModal = useCallback((title) => {
    manageModal((prev) => ({
      title: title,
      display: "block",
    }));
  }, []);

  const closeModal = useCallback(() => {
    setSkill({});
    setSkillErrors({});
    manageModal({
      display: "none",
    });
  }, []);

  const saveChanges = useCallback(
    (skill) => {
      addSkill(skill);
    },
    [addSkill]
  );

  const validation = useCallback(
    (skill) => {
      let flag = true;
      setSkillErrors({});
      if (!skill.name) {
        flag = false;
        setSkillErrors((prev) => ({ ...prev, name: "Skill is not selected!" }));
      }
      if (!skill.rating) {
        flag = false;
        setSkillErrors((prev) => ({ ...prev, rating: "Rating is missing!" }));
      }
      if (!skill.learnedFrom) {
        flag = false;
        setSkillErrors((prev) => ({
          ...prev,
          learnedFrom: "Please check from where you learned this skill!",
        }));
      }
      if (skills.some((s) => s.name === skill.name)) {
        flag = false;
        setSkillErrors((prev) => ({
          ...prev,
          duplicate: "Skill already present!",
        }));
      }
      return flag;
    },
    [skills]
  );

  const saveSkill = useCallback(() => {
    if (validation(skill)) {
      saveChanges(skill);
      closeModal();
    } else {
      console.log(skillErrors);
    }
  }, [skill, skills, saveChanges, closeModal, validation]);

  const handleChange = (e) => {
    setSkill((prev) => ({ ...prev, name: e.target.value }));
    if (e.target.value === "") {
      setSearchResults([]);
    } else {
      const results = skills.filter((s) =>
        s.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setSearchResults(results);
    }
  };

  const handleSelect = (selectedSkill) => {
    setSkill(selectedSkill);
    setSearchResults([]);
  };

  return (
    <div className="mt-8 bg-gradient-to-br from-blue-50 to-primary-color p-4 sm:p-6 rounded-xl shadow-lg">
      <div className="flex items-center justify-center sm:justify-start mb-6">
        <RiMedalFill className="text-2xl sm:text-3xl text-primary-color" />
        <h2 className="ml-3 text-xl sm:text-2xl font-bold text-gray-800">Skills</h2>
      </div>
      {skills && skills.length > 0 ? (
        <div className="space-y-4">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-xl p-3 sm:p-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col items-center sm:items-start sm:flex-row sm:space-x-3 space-y-2 sm:space-y-0">
                  <div className="bg-indigo-100 text-primary-color font-semibold px-3 py-1 rounded-full text-sm text-center sm:text-left break-words max-w-[200px]">
                    {skill.name}
                  </div>
                  <div className="flex-shrink-0">
                    <Rating
                      props={{
                        rating: skill.rating,
                        setRating: () => {},
                        mode: "r",
                      }}
                      onChange={() => {}}
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center sm:flex-row sm:items-center mt-3 sm:mt-0">
                  <div className="flex flex-wrap justify-center sm:justify-start gap-1 mb-2 sm:mb-0 sm:mr-2">
                    {skill?.learnedFrom?.map((el, idx) => (
                      <span key={idx} className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs text-center">
                        {el.label}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => removeSkill(index)}
                    className="text-red-500 hover:text-red-700 transition-colors duration-200 p-1 mt-2 sm:mt-0"
                  >
                    <FaTrashAlt className="text-lg" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-lg text-gray-600">You haven't added any skills yet.</p>
          <p className="text-sm text-gray-500 mt-2">Click the button below to get started!</p>
        </div>
      )}
      <div className="mt-6 text-center sm:text-left">
        <button
          onClick={() => showModal("Add Skill", "add")}
          className="bg-primary-color text-white px-4 sm:px-6 py-2 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 hover:bg-indigo-700 hover:shadow-lg"
        >
          Add New Skill
        </button>
      </div>
      <ModalBox props={{ ...modal, onSave: saveSkill, onClose: closeModal }}>
        <AddSkill
          props={{
            selectedSkill: skill,
            setSkill,
            skillErrors,
            selectedSkills,
          }}
        />
      </ModalBox>
      {searchResults.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-2 z-10 max-h-60 overflow-y-auto">
          {searchResults.map((result, index) => (
            <li
              key={index}
              className="p-3 cursor-pointer hover:bg-indigo-50 transition-colors duration-200 text-sm text-center sm:text-left"
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