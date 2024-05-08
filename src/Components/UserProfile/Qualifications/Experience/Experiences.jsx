import React, { useCallback, useState } from "react";
import { HiBriefcase, HiMinus } from "react-icons/hi";
import { FaPencilAlt } from "react-icons/fa";
import ModalBox from "../ModalBox";
import AddExperience from "./AddExperience";
import "./Experience.css"; // Import CSS file

const Experience = ({ props }) => {
  const { experiences, setExperiences } = props;
  const [experience, setExperience] = useState({ id: false });
  const [modal, manageModal] = useState({ display: "none", title: "Loading", state: "new" });
  const [experienceErrors, setExperienceErrors] = useState({});

  const removeExperience = useCallback(
    (id) => {
      setExperiences((prev) => prev.filter((exp, index) => index !== id));
    },
    [experiences]
  );

  const showModal = useCallback((title, state, index) => {
    if (state === "update") {
      setExperience(experiences[index]);
    }
    manageModal({ title: title, display: "block", state: state, index: index });
  }, [experiences]);

  const closeModal = useCallback(() => {
    setExperience({});
    setExperienceErrors({});
    manageModal({ display: "none" });
  }, []);

  const saveChanges = useCallback(() => {
    if (validation()) {
      if (modal.state === "update") {
        updateExperience(modal.index, experience);
      } else {
        setExperiences((prev) => [...prev, experience]);
      }
      closeModal();
    } else {
      console.log(experienceErrors);
    }
  }, [experience, experienceErrors]);

  const updateExperience = useCallback((index, experience) => {
    const temp = experiences.map((exp, i) => (i === index ? experience : exp));
    setExperiences(temp);
  }, [experiences]);

  const validation = useCallback(() => {
    const required = ["job_title", "company_name", "start_date"];
    let flag = true;

    required.forEach((element) => {
      if (!experience[element]) {
        setExperienceErrors((prev) => ({ ...prev, [element]: 1 }));
        flag = false;
      } else {
        setExperienceErrors((prev) => ({ ...prev, [element]: 0 }));
      }
    });

    return flag;
  }, [experience, experienceErrors]);

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
              <p className="job-title">{exp.job_title}</p>
              <p>{exp.company_name}</p>
              <p><span className="label">Start Date:</span> {exp.start_date}</p>
              {exp.end_date && <p><span className="label">End Date:</span> {exp.end_date}</p>}
              <p><span className="label">Description:</span> {exp.description}</p>
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
        <AddExperience props={{ experience, setExperience, saveChanges, experienceErrors }} />
      </ModalBox>
    </>
  );
};

export default Experience;
