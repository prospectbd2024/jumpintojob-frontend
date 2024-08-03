"use client";
import React, { useCallback, useState } from "react";
import { HiAcademicCap } from "react-icons/hi";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import AddEducation from "@/ResumeBuilder/ResumeComponents/ResumeEducation/AddEducation";
import ModalBox from "../ModalBox";
import AddButton from "@/Components/Buttons/AddButton";
import Visibility from "@/Components/Buttons/Visibility";

const Education = ({ props }) => {
  const educationInterface = {
    id: false,
    visible_on_cv: true,
    education_graduation_year: "",
    grades: "",
    cgpa: "4.00",
  };
  const { educations, setEducations } = props;
  const [education, setEducation] = useState(educationInterface);
  const [modal, manageModal] = useState({ display: "none", title: "Loading", state: "new" });
  const [educationErrors, setEducationErrors] = useState({});
  const [visibility, setVisibility] = useState(false);

  const removeEducation = useCallback(
    (id) => {
      setEducations((prev) => prev.filter((_, index) => index !== id));
    },
    [setEducations]
  );

  const showModal = useCallback(
    (title, state, index) => {
      if (state === "update") {
        setEducation(educations[index]);
      }
      manageModal({ title, display: "block", state, index });
    },
    [educations, setEducation]
  );

  const closeModal = useCallback(() => {
    setEducation(educationInterface);
    setEducationErrors({});
    manageModal({ display: "none" });
  }, [setEducation]);

  const saveChanges = useCallback(() => {
    if (validation()) {
      if (modal.state === "update") {
        updateEducation(modal.index, education);
      } else {
        setEducations((prev) => [...prev, education]);
      }
      closeModal();
    } else {
      console.log(educationErrors);
    }
  }, [education, educationErrors, modal, setEducations]);

  const updateEducation = useCallback(
    (index, updatedEducation) => {
      const updatedEducations = educations.map((item, i) =>
        i === index ? updatedEducation : item
      );
      setEducations(updatedEducations);
    },
    [educations, setEducations]
  );

  const validation = useCallback(() => {
    const required = ["institution_name", "degree", "field_study"];
    let isValid = true;

    required.forEach((field) => {
      if (!education[field]) {
        setEducationErrors((prev) => ({ ...prev, [field]: 1 }));
        isValid = false;
      } else {
        setEducationErrors((prev) => ({ ...prev, [field]: 0 }));
      }
    });

    return isValid;
  }, [education]);

  const manageVisibility = (id) => {
    setEducations((prev) =>
      prev.map((item, index) =>
        index === id ? { ...item, visible_on_cv: !item.visible_on_cv } : item
      )
    );
  };

  return (
    <>
      {educations && educations.length > 0 ? (
        <>
          <div className="flex items-center text-lg font-bold mb-5">
            <HiAcademicCap className="mr-2" /> Educations
          </div>
          {educations.map((education, index) => (
            <div className="relative flex flex-col gap-2.5 p-4 border border-secondary rounded-md mb-2.5">
              <div className="flex justify-end gap-2.5 mb-2.5">
                <Visibility
                  visibility={education.visible_on_cv}
                  handleVisibility={() => manageVisibility(index)}
                />
                <FaTrashAlt
                  className="text-red-600 cursor-pointer"
                  onClick={() => removeEducation(index)}
                />
              </div>
              <p className="text-lg font-bold">{education.institution_name}</p>
              <p>{education.institution_location}</p>
              <p>
                <span className="font-bold">Degree:</span> {education.degree}
              </p>
              <p>
                <span className="font-bold">Field of Study:</span> {education.field_study}
              </p>
              <p>
                <span className="font-bold">Start Year:</span> {education.education_starting_year}
              </p>
              {education.education_graduation_year && (
                <p>
                  <span className="font-bold">Graduation Year:</span> {education.education_graduation_year}
                </p>
              )}
              <p>
                <span className="font-bold">CGPA/GPA:</span> {education.cgpa}
              </p>
              <p>
                <span className="font-bold">Grades:</span> {education.grades}
              </p>
              <p>
                <span className="font-bold">Achievements:</span> {education.education_achievements}
              </p>
              <FaPencilAlt
                className="absolute bottom-2 right-2 text-blue-600 cursor-pointer"
                onClick={() => showModal("Edit Education", "update", index)}
              />
            </div>
          ))}
        </>
      ) : (
        <div className="text-lg font-bold my-10 text-center">Please add education</div>
      )}
      <div>
        <AddButton onClick={() => showModal("Add Education", "add")} />
      </div>
      <ModalBox props={{ ...modal, onSave: saveChanges, onClose: closeModal }}>
        <AddEducation props={{ education, setEducation, saveChanges, educationErrors }} />
      </ModalBox>
    </>
  );
};

export default Education;
