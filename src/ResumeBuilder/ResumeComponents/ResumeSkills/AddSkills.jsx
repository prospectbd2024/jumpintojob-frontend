"use client";
import React, { useCallback, useContext } from "react";
import { HiPencil, HiPlus, HiX } from "react-icons/hi";
import "./AddSkills.css";
import { useState } from "react";
import { useUserContext } from "../../../UserContext/UserContext";
import { FaTrashAlt } from "react-icons/fa";
import { useEffect } from "react";
import Modal from "./Modal";

import AddSkillButton from "./AddSkillButton";
import ShowSkillList from "./SkillsList";
import { SkillContext } from "@/UserContext/SkillContext";

const AddSkills = () => {
  const { handleRemoveSkill } = useContext(SkillContext);
  const [searchKey, setSearchKey] = useState("");
  const handleSaveCurrentSkill = useCallback((skill) => {
    setCurrentSkill(demoSkill);
    setSearchKey("");
    console.log(skill);
    handleShowModal(false);
    if (skill.name && skill.rating >= 0) {
      saveCurrentSkill(skill);
    }
  });
  const closeModal = useCallback(() => {
    handleShowModal(false);
    setCurrentSkill(demoSkill);
    setSearchKey("");
  }, []);
  
  const {
    showModal,
    setCurrentSkill,
    currentSkill,
    demoSkill,
    handleShowModal,
    saveCurrentSkill,
  } = useContext(SkillContext);
  return (
    <div className="add-skills">
      <AddSkillButton />
      <ShowSkillList onDeleteFunctin={handleRemoveSkill} type={"skills"} />

      <Modal
        title={"Add Skills"}
        desc={"Add your top skills to impress the employers"}
        search_title={'Select Skill'}
        rate_title = {'Rate  you  Skill'}
        display_sug = {true}
        closeModal={closeModal}
        handleSaveCurrentSkill={handleSaveCurrentSkill}
        setCurrentSkill={setCurrentSkill}
        currentSkill={currentSkill}
        showModal={showModal}
        searchKey ={searchKey}
        search_url={'/skills/search'}
        setSearchKey={setSearchKey}
      />
    </div>
  );
};

export default AddSkills;
