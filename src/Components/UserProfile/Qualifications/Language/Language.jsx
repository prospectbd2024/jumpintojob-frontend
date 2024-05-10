// Language.js
import React, { useState, useCallback, useEffect } from "react";
import { RiMedalFill } from "react-icons/ri";
import { HiMinus } from "react-icons/hi";
import "./Language.css";
import ModalBox from "../ModalBox";
import AddLanguage from "./AddLanguage";
import LanguageProperties from "./LanguageProperties";

function Language({ props }) {
  // State for managing languages
  const { languages, setLanguages } = props;
  const [language,setLanguage] = useState({});

  // State for managing modal display
  const [modal, setModal] = useState({
    display: "none",
    title: "Loading",
    state: "new",
  });

  // Function to remove a language
  const removeLanguage = useCallback(
    (id) => {
      setLanguages((prev) => prev.filter((lang, index) => index !== id));
    },
    [setLanguages]
  );

  // Function to show modal
  const showModal = useCallback((title) => {
    setModal((prev) => ({ title: title, display: "block" }));
  }, []);

  // Function to close modal
  const closeModal = useCallback(() => {
    setModal({ display: "none" });
  }, []);

  const saveLanguage = ()=>{
  
    setLanguages((prev)=>([...prev,language]))
    closeModal();

  }

  return (
    <div className="languages-content education-content">
      {/* Render the header */}
      <div className="qualifications-header">
        <RiMedalFill />
        <h3>Languages</h3>
      </div>
      
      {/* Render the list of languages */}
      {languages && (
        <div className="languages-container qualifications-container">
          {languages.map((language, index) => (
            <div className="language-item" key={index}>
              {/* Display language name */}
              <div className="language-name">{language.language}</div>
              
              {/* Display language proficiency */}
              <div className="language-proficiency">{language.proficiency}</div>
              
              {/* Display remove button */}
              <div className="language-actions"> 
                <HiMinus
                  className="remove-language"
                  onClick={() => removeLanguage(index)}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* If no languages are present, display a message */}
      {languages.length === 0 && <div className="no-languages">Please Add Languages</div>}
      
      {/* Add language button */}
      <div className="add-language" onClick={() => showModal("Add Language")}>
        <p>Add Language</p>
        <button>+</button>
      </div>
      
      {/* Modal for adding/editing language */}
      <ModalBox props={{ ...modal, onClose: closeModal ,onSave : saveLanguage }}>
        <AddLanguage props={{ selectedLanguage: language , setLanguage }} />
      </ModalBox>
    </div>
  );
}

export default Language;
