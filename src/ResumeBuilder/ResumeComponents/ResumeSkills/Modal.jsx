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
    search,
    setSearch,
  } = props;
  const skillObj = {id : '', name : '',rating : 0}
  const [ShowSearchSuggestion, setShowSearchSuggestion] = useState(false);
  const [findSkill, setFindSkill] = useState([]);

  const [rating,setRating] = useState(0);
  const [suggestedSkills, setSuggestedSkills] = useState([]);

  const handleSkillSave = useCallback((skill) => {

    setCurrentSkill(skillObj)
    setSearch("")
    setRating(0)
    handleShowModal(false)
    if (skill.name && skill.rating>=0){
      handleSkillList(skill);
    }
  });

  const putCurrentSkill = useCallback((skill) => {
    setShowSearchSuggestion(false);
    setSearch(skill.name);
    setCurrentSkill(skill);
  });
  // fetch suggested skills
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/skills`)
      .then((res) => res.json())
      .then((data) => {
        setSuggestedSkills(data.data);
      });
    console.log(suggestedSkills);
  }, []);
  //search skills
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

  const handleExit= useCallback(()=>{
    handleShowModal(false)
    setCurrentSkill(skillObj)
    setSearch("")
    setRating(0)
    
  },[]);


  return (
    <div
      className={`add-skills-modal ${showModal ? "show-modal" : "hide-modal"}`}
    >
      <div className="modal-header">
        <p>Add Skills</p>
        <button onClick={() => handleExit()}>
          <HiX />
        </button>
      </div>
      <div className="modal-content">
        <p>Add your top skills to impress the employers</p>
        <div>
          <label htmlFor="skill">Select Skill </label>
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
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
          <SkillRating
            setCurrentSkill={setCurrentSkill}
            currentSkill={setCurrentSkill}
            rating ={rating}
            setRating={setRating}
          />
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
