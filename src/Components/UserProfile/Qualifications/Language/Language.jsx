import React, { useState, useCallback } from "react";
import { RiMedalFill } from "react-icons/ri";
import { FaTrashAlt } from "react-icons/fa";
import "./Language.css";
import ModalBox from "../ModalBox";
import AddLanguage from "./AddLanguage";
import AddButton from "@/Components/Buttons/AddButton";

function Language({ props }) {
  const { languages, setLanguages } = props;
  const [language, setLanguage] = useState({});
  const [modal, setModal] = useState({
    display: "none",
    title: "Loading",
    state: "new",
  });

  const removeLanguage = useCallback(
    (id) => {
      setLanguages((prev) => prev.filter((lang, index) => index !== id));
    },
    [setLanguages]
  );

  const showModal = useCallback((title) => {
    setModal((prev) => ({ title: title, display: "block" }));
    setLanguage({}); // Reset language when opening modal
  }, []);

  const closeModal = useCallback(() => {
    setModal({ display: "none" });
    setLanguage({}); // Reset language when closing modal
  }, []);

  const saveLanguage = useCallback(() => {
    if (language.language && language.proficiency) {
      setLanguages((prev) => [...prev, language]);
      closeModal();
    }
  }, [language, setLanguages, closeModal]);

  return (
    <div className="languages-content education-content">
      <div className="qualifications-header">
        <RiMedalFill />
        <h3>Languages</h3>
      </div>
      
      {languages && languages.length > 0 ? (
        <div className="languages-container qualifications-container">
          {languages.map((lang, index) => (
            <div className="language-item" key={index}>
              <div className="language-name">{lang.language}</div>
              <div className="language-proficiency">{lang.proficiency}</div>
              <div className="language-actions">
                <FaTrashAlt
                  className="remove-language"
                  onClick={() => removeLanguage(index)}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-languages">Please Add Languages</div>
      )}
      
      <div>
        <AddButton onClick={() => showModal('Add Language')}/>
      </div>
      
      <ModalBox props={{ ...modal, onClose: closeModal, onSave: saveLanguage }}>
        <AddLanguage props={{ selectedLanguage: language, setLanguage, selectedLanguages: languages }} />
      </ModalBox>
    </div>
  );
}

export default Language;