"use client"
import React ,{useCallback}from "react";
import { FaAtlas } from "react-icons/fa";
import { HiMinus } from "react-icons/hi"; // Import HiMinus
import AddLanguages from "@/ResumeBuilder/ResumeComponents/ResumeFinalize/AddLanguages"; // Import AddLanguages component
import "./Language.css"; // Import CSS file
import { useModalContext } from "@/Contexts/ModalContext";

function Language({ props }) {
  const { languages,setLanguages } = props;
  const removeLanguage = useCallback(
    (id) => {
      setLanguages(prev=>{
       return prev.filter((language,index)=>{
        return index!=id;
       })
      })

    },
    [languages],
  )
  return (
    <div className="education-content">
      <div className="qualifications-header">
        <FaAtlas />
        <h3>Languages</h3>
      </div>
      {languages && (
        <div className="languages-container qualifications-container">
          {languages.map((language,index) => (
            <div className="language-item" key={language.name}>
              <div className="language-name">{language.name}</div>
              <HiMinus
                className="remove-language"
                onClick={() => {
                  removeLanguage(index)
                }}
              />
            </div>
          ))}
        </div>
      )}
       {languages.length ==0&& <div className='no-languages'>Please Add Language</div>}
      <div className="add-language" onClick={() => {

      }}>
        <p>Add Language</p>
        <button>+</button>
      </div>
    </div>
  );
}

export default Language;
