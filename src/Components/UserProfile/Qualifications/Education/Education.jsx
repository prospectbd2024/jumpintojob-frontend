"use client";
import React, { useCallback, useState } from "react";
import { HiAcademicCap } from "react-icons/hi";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import AddEducation from "@/ResumeBuilder/ResumeComponents/ResumeEducation/AddEducation";
import "./Education.scss"; // Import SCSS file
import ModalBox from "../ModalBox";
import AddButton from "@/Components/Buttons/AddButton";
import Visibility from "@/Components/Buttons/Visibility";

const Education = ({ props }) => {

  const educationInterface = {
    id: false,
    visible_on_cv: true,
    education_graduation_year: "",
    grades: "",
    cgpa: "4.00", // Default CGPA/GPA set to 4.00
  };
  const { educations, setEducations } = props;
  const [education, setEducation] = useState(educationInterface);
  const [modal, manageModal] = useState({ display: "none", title: "Loading", state: "new" });
  const [educationErrors, setEducationErrors] = useState({});
  const [visibility, setVisibility] = useState(false);

  const removeEduction = useCallback(
    (id) => {
      setEducations((prev) => {
        return prev.filter((education, index) => {
          return index !== id;
        });
      });
    },
    [educations]
  );

  const showModal = useCallback(
    (title, state, index) => {
      if (state === "update") {
        setEducation(educations[index]);
      }
      manageModal((prev) => ({
        title: title,
        display: "block",
        state: state,
        index: index,
      }));
    },
    [education, educations]
  );

  const closeModal = useCallback(() => {
    setEducation(educationInterface);
    setEducationErrors({});
    manageModal({
      display: "none",
    });
  }, [education]);

  const saveChanges = useCallback(() => {
    if (validation()) {
      if (modal.state === "update") {
        updateEducation(modal.index, education);
      } else {
        setEducations((prev) => {
          return [...prev, education];
        });
      }
      closeModal();
    } else {
      console.log(educationErrors);
    }
  }, [education, educationErrors]);

  const updateEducation = useCallback(
    (index, education) => {
      let temp = educations.map((element, i) => {
        if (i === index) {
          return education;
        }
        return element;
      });
      setEducations(temp);
    },
    [educations]
  );

  const validation = useCallback(() => {
    const required = ["institution_name", "degree", "field_study"];
    let flag = true;

    required.forEach((element) => {
      if (!education[element]) {
        setEducationErrors((prev) => ({
          ...prev,
          [element]: 1,
        }));
        flag = false;
      } else {
        setEducationErrors((prev) => ({
          ...prev,
          [element]: 0,
        }));
      }
    });

    return flag;
  }, [education, educationErrors]);

  const manageVisibility = (id) => {
    setEducations((prev) => {
      return prev.map((education, index) => {
        if (index !== id) {
          return education;
        }
        return { ...education, visible_on_cv: !education.visible_on_cv };
      });
    });
  };

  return (
    <>
      {educations && educations.length > 0 ? (
        <>
          <div className="education__header">
            <HiAcademicCap /> Educations
          </div>
          {educations.map((education, index) => (
            <div className="education__container" key={education.institution_name}>
              <div className="education__top-icons-container">
                <div className="education__top-icons">
                  <Visibility
                    visibility={education.visible_on_cv}
                    handleVisibility={() => {
                      manageVisibility(index);
                    }}
                  />
                  <FaTrashAlt className="education__top-icons-minus" onClick={() => removeEduction(index)} />
                </div>
              </div>
              <p className="education__institution-name">{education.institution_name}</p>
              <p>{education.institution_location}</p>
              <p>
                <span className="education__label">Degree:</span> {education.degree}
              </p>
              <p>
                <span className="education__label">Field of Study:</span> {education.field_study}
              </p>
              <p>
                <span className="education__label">Start Year:</span> {education.education_starting_year}
              </p>
              {education.education_graduation_year && (
                <p>
                  <span className="education__label">Graduation Year:</span> {education.education_graduation_year}
                </p>
              )}
              <p>
                <span className="education__label">CGPA/GPA:</span> {education.cgpa}
              </p>
              <p>
                <span className="education__label">Grades:</span> {education.grades}
              </p>
              <p>
                <span className="education__label">Achievements:</span> {education.education_achievements}
              </p>
              <div className="education__edit-icon">
                <FaPencilAlt
                  onClick={() => {
                    showModal("Edit Education", "update", index);
                  }}
                />
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="education__no-educations">Please add education</div>
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