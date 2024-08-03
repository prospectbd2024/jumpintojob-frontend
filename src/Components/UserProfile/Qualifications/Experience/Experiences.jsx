import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import React, { useState, useCallback } from "react";
import { HiBriefcase } from "react-icons/hi";
import ModalBox from "../ModalBox";
import AddExperience from "./AddExperience";
import AddButton from "@/Components/Buttons/AddButton";
import Visibility from "@/Components/Buttons/Visibility";

const Experiences = ({ props }) => {
  const { experiences, setExperiences } = props;
  const experienceInterface = { id: false, visible_on_cv: true, currently_working: '' };
  const [experience, setExperience] = useState(experienceInterface);
  const [modal, setModal] = useState({ display: "none", title: "Loading", state: "new" });
  const [experienceErrors, setExperienceErrors] = useState({});

  const removeExperience = useCallback(
    (id) => {
      setExperiences((prev) => prev.filter((_, index) => index !== id));
    },
    [setExperiences]
  );

  const showModal = useCallback((title, state, index) => {
    if (state === "update") {
      setExperience(experiences[index]);
    }
    setModal({ title, display: "block", state, index });
  }, [experiences]);

  const closeModal = useCallback(() => {
    setExperience(experienceInterface);
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
    }
  }, [experience, modal, setExperiences, closeModal]);

  const updateExperience = useCallback((index, updatedExperience) => {
    const updatedExperiences = experiences.map((exp, i) => (i === index ? updatedExperience : exp));
    setExperiences(updatedExperiences);
  }, [experiences, setExperiences]);

  const validation = useCallback(() => {
    const required = ["job_title", "company_name", "start_date", "designation", "expertises"];
    let isValid = true;

    required.forEach((field) => {
      if (!experience[field]) {
        setExperienceErrors((prev) => ({ ...prev, [field]: true }));
        isValid = false;
      } else {
        setExperienceErrors((prev) => ({ ...prev, [field]: false }));
      }
    });

    return isValid;
  }, [experience]);

  const manageVisibility = (id) => {
    setExperiences((prev) =>
      prev.map((exp, index) =>
        index === id ? { ...exp, visible_on_cv: !exp.visible_on_cv } : exp
      )
    );
  };

  return (
    <div className="border border-gray-300 p-5 rounded-lg bg-white mb-5">
      {experiences && experiences.length > 0 ? (
        <>
          <div className="flex items-center text-lg font-bold mt-5 mb-4">
            <HiBriefcase className="mr-2" /> Experiences
          </div>
          {experiences.map((exp, index) => (
            <div key={index} className="relative p-4 border border-secondary rounded-md mb-3 flex flex-col gap-3">
              <div className="flex justify-end gap-2.5 mb-3">
                <Visibility
                  visibility={exp.visible_on_cv}
                  handleVisibility={() => manageVisibility(index)}
                />
                <FaTrashAlt
                  className="text-red-600 cursor-pointer"
                  onClick={() => removeExperience(index)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-lg font-bold">{exp.job_title}</p>
                <p className="font-medium">{exp.company_name}</p>
                <p>
                  <span className="font-bold">Designation:</span> {exp.designation}
                </p>
                <p>
                  <span className="font-bold">Start Date:</span> {exp.start_date}
                </p>
                {exp.to_date && (
                  <p>
                    <span className="font-bold">End Date:</span> {exp.to_date}
                  </p>
                )}
                <p>
                  <span className="font-bold">Company Business:</span> {exp.company_business}
                </p>
                <p>
                  <span className="font-bold">Department:</span> {exp.department}
                </p>
                {exp.expertises && (
                  <div>
                    <p className="font-bold">Areas of Expertise:</p>
                    <ul className="list-disc pl-5">
                      {exp.expertises.map((expertise, idx) => (
                        <li key={idx}>{expertise.name} - {expertise.months} months</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <FaPencilAlt
                className="absolute bottom-2 right-2 text-blue-600 cursor-pointer"
                onClick={() => showModal("Edit Experience", "update", index)}
              />
            </div>
          ))}
        </>
      ) : (
        <div className="text-lg font-bold text-center my-10">Please add experiences</div>
      )}
      <AddButton onClick={() => showModal('Add Experience', 'add')} />
      <ModalBox props={{ ...modal, onSave: saveChanges, onClose: closeModal }}>
        <AddExperience props={{ experience, setExperience, experienceErrors }} />
      </ModalBox>
    </div>
  );
};

export default Experiences;
