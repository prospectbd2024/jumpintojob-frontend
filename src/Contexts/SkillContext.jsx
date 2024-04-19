"use client";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { useUserContext } from "./UserContext";

export const SkillContext = createContext();

function SkillContextProvider({ children }) {
  const log = (data) => {
    console.log(data);
  };

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
  const saveCurrentSkill = useCallback((skill) => {
    setSkillList([...skillList, skill]);
    console.log([...skillList, skill]);
  },[skillList]);

  const handleRemoveSkill = useCallback((index) => {
    const updatedSkillList = [...skillList];
    updatedSkillList.splice(index, 1);
    setSkillList(updatedSkillList)
    console.log(updatedSkillList)
  },[skillList]);

  useEffect(() => {
    // This effect runs whenever skillList changes
    setResumeData({ ...resumeData, skills: skillList });
  }, [skillList]);
  const demoSkill = {id : '', name : '',rating : 0}
  // console.log(resumeData)
  return (
    <SkillContext.Provider
      value={{
        log,
        handleShowModal,
        showModal,
        currentSkill,
        setCurrentSkill,
        demoSkill,
        handleShowModal,
        saveCurrentSkill,
        handleRemoveSkill
      }}
    >
      {children}
    </SkillContext.Provider>
  );
}

export default SkillContextProvider;
