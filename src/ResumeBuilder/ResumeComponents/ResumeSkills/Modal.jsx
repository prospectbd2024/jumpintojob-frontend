"use client";
import React, { useState, useEffect, useCallback, useContext } from "react";
import { HiX } from "react-icons/hi";
import SuggestedSkills from "./SuggestedSkills";
import SkillListView from "./SkillListView";
import SkillRating from "./SkillRating";
import { SkillContext } from "@/UserContext/SkillContext";
import SearchSkills from "./SearchSkills";

function Modal({
  title,
  desc,
  display_sug,

  search_title,
  closeModal,
  handleSaveCurrentSkill,
  showModal,
  setCurrentSkill,
  currentSkill,
  searchKey,
  setSearchKey,
  search_url ,
  rate_title,
  search_sug=true

}) {


  return (
    <div
      className={`add-skills-modal ${showModal ? "show-modal" : "hide-modal"}`}
    >
      <div className="modal-header">
        <p>{title}</p>
        <button onClick={closeModal}>
          <HiX />
        </button>
      </div>
      <div className="modal-content">
        <p>{desc}</p>

        <SearchSkills
          onSkillClick={setCurrentSkill}
          search_url={search_url}
          search_title={search_title}
          searchKey={searchKey}
          currentSkill={currentSkill}
          setSearchKey={setSearchKey} 
          search_sug ={search_sug}
          
          />


        <div>
          {       currentSkill.name &&

          <SkillRating
            setCurrentSkill={setCurrentSkill}
            currentSkill={currentSkill}
            rate_title={rate_title}
          />
          }
        </div>
        <div>
          {display_sug && <SuggestedSkills onSkillClick={setCurrentSkill} />}
        </div>
      </div>
      <div className="modal-footer">
        <button onClick={() => handleSaveCurrentSkill(currentSkill)}>
          Save
        </button>
      </div>
    </div>
  );
}

export default Modal;
