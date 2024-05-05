"use client";
import { HiAcademicCap, HiX } from "react-icons/hi";
import { FaPencilAlt, FaAtlas } from "react-icons/fa";
import React from "react";
import EducationFields from "@/ResumeBuilder/ResumeComponents/ResumeEducation/EducationFields";
import "./Education.css"; // Import CSS file

const Education = ({ props }) => {
  const educations = [
    {
      institution_name: "University of XYZ",
      institution_location: "City, Country",
      degree: "Bachelor of Science",
      field_study: "Computer Science",
      education_starting_year: "2018",
      education_graduation_year: "2022",
      education_achievements: "Dean's List, Outstanding Student Award",
    },
    {
      institution_name: "University of ABC",
      institution_location: "City, Country",
      degree: "Bachelor of Science",
      field_study: "Computer Science",
      education_starting_year: "2020",
      education_graduation_year: "2024",
      education_achievements: "Dean's List, Outstanding Student Award",
    },
  ];
  const { manageModal } = props;

  return (
    <>
      {educations && educations.length > 0 ? (
        <>
          <div className="header">
            <HiAcademicCap /> Educations
          </div>
          {educations.map((education) => (
            <div className="education-container" key={education.institution_name}>
              <p className="institution-name">{education.institution_name}</p>
              <p>{education.institution_location}</p>
              <p><span className="label">Degree:</span> {education.degree}</p>
              <p><span className="label">Field of Study:</span> {education.field_study}</p>
              <p><span className="label">Start Year:</span> {education.education_starting_year}</p>
              <p><span className="label">Graduation Year:</span> {education.education_graduation_year}</p>
              <p><span className="label">Achievements:</span> {education.education_achievements}</p>
              <div>
                <FaPencilAlt
                  className="edit-icon"
                  onClick={() => {
                    manageModal({
                      title: "Edit Education",
                      display: "block",
                      body: (
                        <EducationFields
                          props={{
                            setResumeData: () => {},
                            resumeData: {},
                            formIndex: 0,
                            state: true,
                            setState: () => {},
                          }}
                        />
                      ),
                    });
                  }}
                />
              </div>
            </div>
          ))}
        </>
      ) : (
        <></>
      )}

      <div className="add-education" onClick={() => {
        manageModal({
          title: "Add Education",
          display: "block",
          body: (
            <EducationFields
              props={{
                setResumeData: () => {},
                resumeData: {},
                formIndex: 0,
                state: true,
                setState: () => {},
              }}
            />
          ),
        });
      }}>
        <p className='add-education-text'>Add Education</p>
        <button className="add-button">+</button>
      </div>
    </>
  );
};

export default Education;
