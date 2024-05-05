import React from "react";
import { FaAtlas } from "react-icons/fa";
import { HiMinus } from "react-icons/hi"; // Import HiMinus
import AddLanguages from "@/ResumeBuilder/ResumeComponents/ResumeFinalize/AddLanguages"; // Import AddLanguages component
import "./Language.css"; // Import CSS file

function Language({ props }) {
  const { languages, manageModal } = props;

  return (
    <div className="education-content">
      <div className="qualifications-header">
        <FaAtlas />
        <h3>Languages</h3>
      </div>
      {languages && (
        <div className="languages-container qualifications-container">
          {languages.map((language) => (
            <div className="language-item" key={language.name}>
              <div className="language-name">{language.name}</div>
              <HiMinus
                className="remove-language"
                onClick={() => {
                  // Add remove language functionality
                }}
              />
            </div>
          ))}
        </div>
      )}
      <div className="add-language" onClick={() => {
        manageModal({
          title: "Add Skills",
          display: "block",
          body: <AddLanguages
          props={{
            setResumeData: () => {},
            resumeData: {},
            formIndex: 0,
            state: true,
            setState: () => {},
          }}
        />,
        });
      }}>
        <p>Add Language</p>
        <button>+</button>
      </div>
    </div>
  );
}

export default Language;
