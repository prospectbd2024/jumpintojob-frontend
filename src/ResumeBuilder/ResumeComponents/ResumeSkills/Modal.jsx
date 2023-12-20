"use client";
import React, { useState, useEffect, useCallback } from "react";
import { HiX } from "react-icons/hi";
import SuggestedSkills from "./SuggestedSkills";
import SkillListView from "./SkillListView";
import SkillRating from "./SkillRating";

function Modal({ props }) {
  const {
    showModal,
    handleShowModal,
    setCurrentSkill,
    currentSkill,
    handleSkillList,
  } = props;
  const [ShowSearchSuggestion, setShowSearchSuggestion] = useState(false);
  const [findSkill, setFindSkill] = useState([]);
  const [search, setSearch] = useState("");
  const [suggestedSkills, setSuggestedSkills] = useState([]);

  const handleSkillSave = useCallback((skill) => {
    handleShowModal(false),
    handleSkillList(skill);
  });

  const putCurrentSkill = useCallback((skill) => {
    setShowSearchSuggestion(false);
    setSearch(skill.name);
    setCurrentSkill(skill)
  });

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/skills`)
      .then((res) => res.json())
      .then((data) => {
        setSuggestedSkills(data.data);
      });
    console.log(suggestedSkills);
  }, []);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/skills/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ key: search }),
    })
      .then((rsp) => rsp.json())
      .then((data) => {
        setFindSkill(data.data);
      });
    console.log("typing", findSkill);
  }, [search]);

  const handleChange = useCallback((event) => {
    setSearch(event.target.value);
    // console.log("key word",JSON.stringify(search))
  }, []);

  return (
    <div
      className={`add-skills-modal ${showModal ? "show-modal" : "hide-modal"}`}
    >
      <div className="modal-header">
        <p>Add Skills</p>
        <button onClick={() => handleShowModal(false)}>
          <HiX />
        </button>
      </div>
      <div className="modal-content">
        <p>Add your top skills to impress the employers</p>
        <div>
          <label htmlFor="skill">Skill* </label>
          <input
            type="text"
            value={search}
            onChange={(e) => {
              handleChange(e);
              setShowSearchSuggestion(true);
            }}
            onFocus={() => setShowSearchSuggestion(true)}
            onBlur={() =>
              setTimeout(() => {
                setShowSearchSuggestion(false);
              }, 100)
            }
          />
          {ShowSearchSuggestion && (
            <div>
              <SkillListView
                suggestedSkills={findSkill}
                handleSkillSave={handleSkillSave}
                putCurrentSkill={putCurrentSkill}
              />
            </div>
          )}
        </div>
        <div>
            <SkillRating props={{setCurrentSkill,currentSkill}} />

        </div>
        <div>
          <SuggestedSkills
            props={{
              suggestedSkills,
              suggestedSkills,
              handleSkillSave,
              putCurrentSkill,
            }}
          />
        </div>
      </div>
      <div className="modal-footer">
        <button onClick={() => handleSkillSave(currentSkill)}>Save</button>
      </div>
    </div>
  );
}

export default Modal;
