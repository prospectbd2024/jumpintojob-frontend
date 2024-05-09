import React, { useState, useCallback } from "react";
import { HiBriefcase, HiMinus } from "react-icons/hi";
import { FaPencilAlt } from "react-icons/fa";
import ModalBox from "../ModalBox";
import AddExperience from "./AddExperience";
import "./Experience.css"; // Import CSS file

const Experience = ({ props }) => {
  const { experiences, setExperiences } = props;
  const [experience, setExperience] = useState({ id: false });
  const [modal, setModal] = useState({ display: "none", title: "Loading", state: "new" });
  const [experienceErrors, setExperienceErrors] = useState({});

  const removeExperience = useCallback(
    (id) => {
      setExperiences((prev) => prev.filter((exp, index) => index !== id));
    },
    [setExperiences]
  );

  const showModal = useCallback((title, state, index) => {
    if (state === "update") {
      setExperience(experiences[index]);
    }
    setModal({ title: title, display: "block", state: state, index: index });
  }, [experiences]);

  const closeModal = useCallback(() => {
    setExperience({});
    setExperienceErrors({});
    setModal({ display: "none" });
  }, []);

  const saveChanges = useCallback(() => {
    if (validation()) {
      if (modal.state === "update") {
        updateExperience(modal.index, experience);
      } else {
        setExperiences((prev) => [...prev, experience]);
      }
      closeModal();
      console.log(experiences);
    } else {
      console.log(experienceErrors);
    }
  }, [experience, modal, experienceErrors, setExperiences, closeModal]);

  const updateExperience = useCallback((index, experience) => {
    const temp = experiences.map((exp, i) => (i === index ? experience : exp));
    setExperiences(temp);
  }, [experiences, setExperiences]);

  const validation = useCallback(() => {
    const required = ["job_title", "company_name", "start_date", "designation", "expertises"];
    let flag = true;

    required.forEach((element) => {
      if (!experience[element]) {
        setExperienceErrors((prev) => ({ ...prev, [element]: true }));
        flag = false;
      } else {
        setExperienceErrors((prev) => ({ ...prev, [element]: false }));
      }
    });

    return flag;
  }, [experience, setExperienceErrors]);


  return (
    <>
      {experiences && experiences.length > 0 ? (
        <>
          <div className="header">
            <HiBriefcase /> Experiences
          </div>
          {experiences.map((exp, index) => (
            <div className="experience-container" key={index}>
              <div className="top-right-icons">
                <HiMinus className="minus-icon" onClick={() => removeExperience(index)} />
              </div>
              <div className="experience-details">
                <p className="job-title">{exp.job_title}</p>
                <p className="company-name">{exp.company_name}</p>
                <p><span className="label">Designation:</span> {exp.designation}</p>
                <p><span className="label">Start Date:</span> {exp.start_date}</p>
                {exp.to_date && <p><span className="label">End Date:</span> {exp.to_date}</p>}
                <p><span className="label">Company Business:</span> {exp.company_business}</p>
                <p><span className="label">Department:</span> {exp.department}</p>
                {exp.expertises && (
                  <div className="expertise-section">
                    <p className="label">Areas of Expertise:</p>
                    <ul>
                      {exp.expertises.map((expertise, idx) => (
                        <li key={idx}>{expertise.name} - {expertise.months} months</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="bottom-right-icons">
                <FaPencilAlt className="edit-icon" onClick={() => showModal("Edit Experience", "update", index)} />
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="no-experiences">Please add experiences</div>
      )}

      <div className="add-experience" onClick={() => showModal("Add Experience", "add")}>
        <p className="add-experience-text">Add Experience</p>
        <button className="add-button">+</button>
      </div>
      <ModalBox props={{ ...modal, onSave: saveChanges, onClose: closeModal }}>
        <AddExperience props={{ experience, setExperience, experienceErrors }} />
      </ModalBox>
    </>
  );
};

export default Experience;
