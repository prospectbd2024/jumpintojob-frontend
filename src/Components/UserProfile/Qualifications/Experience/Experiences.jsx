import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import React, { useState, useCallback } from "react";
import ModalBox from "../ModalBox";
import AddExperience from "./AddExperience";
import AddButton from "@/Components/Buttons/AddButton";
import Visibility from "@/Components/Buttons/Visibility";
import { RiBriefcaseFill } from "react-icons/ri";

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
    <div className="mt-8 bg-gradient-to-br from-blue-50 to-primary-color p-4 sm:p-6 rounded-xl shadow-lg">
      <div className="flex items-center justify-center sm:justify-start mb-6">
        <RiBriefcaseFill className="text-2xl sm:text-3xl text-primary-color" />
        <h2 className="ml-3 text-xl sm:text-2xl font-bold text-gray-800">Experiences</h2>
      </div>
      {experiences && experiences.length > 0 ? (
        <>
          {/* <div className="flex items-center text-lg sm:text-xl md:text-2xl font-bold mt-3 sm:mt-4 md:mt-5 mb-3 sm:mb-4 md:mb-5">
            <HiBriefcase className="mr-2 text-xl sm:text-2xl md:text-3xl" /> Experiences
          </div> */}
          {experiences.map((exp, index) => (
            <div key={index} className="relative p-3 pb-7 sm:p-4 md:p-5 border border-secondary rounded-md mb-3 flex flex-col gap-2 sm:gap-3">
              <div className="flex flex-col sm:flex-row justify-between">
                <div className="flex flex-col gap-1 sm:gap-2">
                  <p className="text-base sm:text-lg md:text-xl font-bold">{exp.job_title}</p>
                  <p className="text-sm sm:text-base md:text-lg font-medium">{exp.company_name}</p>
                  <p className="text-xs sm:text-sm md:text-base">
                    <span className="font-bold">Designation:</span> {exp.designation}
                  </p>
                  <p className="text-xs sm:text-sm md:text-base">
                    <span className="font-bold">Start Date:</span> {exp.start_date}
                  </p>
                  {exp.to_date && (
                    <p className="text-xs sm:text-sm md:text-base">
                      <span className="font-bold">End Date:</span> {exp.to_date}
                    </p>
                  )}
                  <p className="text-xs sm:text-sm md:text-base">
                    <span className="font-bold">Company Business:</span> {exp.company_business}
                  </p>
                  <p className="text-xs sm:text-sm md:text-base">
                    <span className="font-bold">Department:</span> {exp.department}
                  </p>
                  {exp.expertises && (
                    <div className="mt-1 sm:mt-2">
                      <p className="text-xs sm:text-sm md:text-base font-bold">Areas of Expertise:</p>
                      <ul className="list-disc pl-4 sm:pl-5">
                        {exp.expertises.map((expertise, idx) => (
                          <li key={idx} className="text-xs sm:text-sm md:text-base">{expertise.name} - {expertise.months} months</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="flex justify-between gap-2 sm:gap-3 mt-2 sm:mt-0 mb-4">
                  <Visibility
                    visibility={exp.visible_on_cv}
                    handleVisibility={() => manageVisibility(index)}
                  />
                  <FaTrashAlt
                    className="text-red-600 cursor-pointer text-base sm:text-lg md:text-xl"
                    onClick={() => removeExperience(index)}
                  />
                </div>
              </div>
              <FaPencilAlt
                className="absolute bottom-2 right-2 text-white cursor-pointer text-base sm:text-lg md:text-xl mr-2 mb-3"
                onClick={() => showModal("Edit Experience", "update", index)}
              />
            </div>
          ))}
        </>
      ) : (
        <div className="text-center py-8">
          <p className="text-lg text-gray-600">You haven't added experience yet.</p>
          <p className="text-sm text-gray-500 mt-2">Click the button below to get started!</p>
        </div>
      )}
      <AddButton onClick={() => showModal('Add Experience', 'add')} />
      <ModalBox props={{ ...modal, onSave: saveChanges, onClose: closeModal }}>
        <AddExperience props={{ experience, setExperience, experienceErrors }} />
      </ModalBox>
    </div>
  );
};



export default Experiences;
