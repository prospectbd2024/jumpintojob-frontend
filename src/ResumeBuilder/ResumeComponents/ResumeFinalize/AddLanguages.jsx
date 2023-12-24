"use client"
import React, { useCallback } from "react";
import { HiPencil, HiPlus, HiX } from "react-icons/hi";
import { useState } from "react";
import { useUserContext } from "../../../UserContext/UserContext";
import { FaTrashAlt } from "react-icons/fa";
import { useEffect } from "react";
import ShowSkillList from "../ResumeSkills/SkillsList";
import Modal from "../ResumeSkills/Modal";

const AddLanguages = () => {
  const { resumeData, setResumeData } = useUserContext();
  const [searchKey,setSearchKey] = useState("")
  const demoLanguage = {id : '', name : '', rating : 0}
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = (e) => {
    setShowModal(e);
  };
  const [languageList, setLanguageList] = useState([]);
  const [currentLanguage, setCurrentLanguage] = useState({id : '', name : '', rating : 0});
  const handleLanguageList = (language) => {
    setLanguageList([...languageList, language]);
    setCurrentLanguage({id : '', name : '', rating : 0});
  };

  const handleSaveLanguage = () => {
    setResumeData({ ...resumeData, languages: languageList });
  };

  const handleRemoveLanguage = (index) => {
    const updatedLanguageList = [...languageList];
    updatedLanguageList.splice(index, 1);
    setLanguageList(updatedLanguageList);
  };
  useEffect(() => {
    // This effect runs whenever skillList changes
    handleSaveLanguage();
  }, [languageList]);

  const closeModal = useCallback(() => {
    handleShowModal(false);
    setCurrentLanguage(demoLanguage);
    setSearchKey("");
  }, []);

  const handleSaveCurrentSkill = useCallback((language) => {
    setCurrentLanguage(demoLanguage);
    setSearchKey("");
    console.log(language);
    handleShowModal(false);
    if (language.name && language.rating >= 0) {
        handleLanguageList(language);
    console.log('saved');
    }
  });
  return (
    <div className="add-skills">
      <div className="add-new-skill" onClick={() => handleShowModal(true)}>
        <h4>Add Languages</h4>
        <button>
          <HiPlus />
        </button>
      </div>

      <ShowSkillList type={"languages"} onDeleteFunctin={handleRemoveLanguage} />

      <Modal
        title={"Add Languages"}
        desc={"Add your top Language to impress the employers"}
        search_title={'Select Language'}
        rate_title = {'Rate  you  Language skill'}
        display_sug = {false}
        closeModal={closeModal}
        handleSaveCurrentSkill={handleSaveCurrentSkill}
        setCurrentSkill={setCurrentLanguage}
        currentSkill={currentLanguage}
        showModal={showModal}
        searchKey ={searchKey}
        setSearchKey={setSearchKey}
        search_url={'/languages/search'}
      />
    </div>
  );
};

export default AddLanguages;
