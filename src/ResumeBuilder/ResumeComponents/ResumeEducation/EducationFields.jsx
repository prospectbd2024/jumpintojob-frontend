"use client";
import SaveDismissButtons from "@/ResumeBuilder/Layout/Button/SaveDismissButtons";
import React, { useState, useCallback, useEffect } from "react";

function EducationFields({ props }) {
  const [educationFields, setEducationFields] = useState({
    id: 0,
    institution_name: "",
    education_achivements: "",
    education_graduation_year: "",
    education_starting_year: "",
    field_study: "",
    degree: "",
    institution_location: "",
    institution_name: "",
  });


  const BaseFormat = {
    id: 0,
    institution_name: "",
    education_achivements: "",
    education_graduation_year:
    educationFields.education_graduation_year == "on" ? "off" : "",
    education_starting_year: "",
    field_study: "",
    degree: "",
    institution_location: "",
    institution_name: "",
  };
  const [isWarning,setWarning] = useState(false)
  const { setResumeData, resumeData, formIndex, state, setState } = props;

  const handleChange = useCallback((key, value) => {
    setEducationFields((prev) => {
      prev[key] = value;
      return prev;
    });
    updateResumeData(educationFields);
  });

  useEffect(() => {
    if (state.type == "insert") {
      BaseFormat.id = state.index;

      setEducationFields(BaseFormat);

      updateResumeData(BaseFormat);
    }
    if (state.type == "update") {
      let education_fields = resumeData.educations.find(
        (item) => item.id == state.id
      );
      setEducationFields(education_fields);
      // updateResumeData(educationFields)
    }
    if (state.type == "dissmiss") {
      BaseFormat.id = state.id;

      setEducationFields(BaseFormat);

      updateResumeData(BaseFormat);
    }
  }, [state]);

  const updateResumeData = useCallback((educationFields) => {
    const resumeEducations = resumeData.educations;
    // console.log('old ',resumeExperiences)

    const index = resumeEducations.findIndex(
      (item) => item.id == educationFields.id
    );

    console.log(index, resumeEducations);

    if (index == -1) {
      resumeEducations.push(educationFields);
    } else {
      resumeEducations[index] = educationFields;
    }
    console.log(resumeEducations);
    setResumeData((prev) => {
      return { ...prev, educations: resumeEducations };
    });
  });

  return (
    <form action="" className="heading-form">
      <div className="heading-form-main">
        <div className="resume-input-field">
          <label htmlFor="institutionname">INSTITUTION NAME</label>
          <input
            type="text"
            placeholder="University of Dhaka"
            id="institutionname"
            onChange={(e) => handleChange("institution_name", e.target.value)}
            value={educationFields?.institution_name}
          />
          <div
            className={
              isWarning && educationFields.institution_name == ""
                ? "required"
                : "hidden"
            }
          >
            Institution name is required
          </div>
        </div>
        <div className="resume-input-field">
          <label htmlFor="institutionloc">INSTITUTION LOCATION</label>
          <input
            type="text"
            placeholder="Dhaka, Bangladesh"
            id="institutionloc"
            onChange={(e) =>
              handleChange("institution_location", e.target.value)
            }
            value={educationFields?.institution_location}
          />
        </div>
        <div className="resume-input-field">
          <label htmlFor="degree">QUALIFICATIONS OR DEGREE</label>
          <input
            type="text"
            placeholder="Bachelor of Science"
            id="degree"
            onChange={(e) => handleChange("degree", e.target.value)}
            value={educationFields?.degree}
          />
          <div
            className={
              isWarning && educationFields.degree == "" ? "required" : "hidden"
            }
          >
            Qualifications or degree is required
          </div>
        </div>
        <div className="resume-input-field">
          <label htmlFor="field">FIELD OF STUDY</label>
          <input
            type="text"
            placeholder="Computer Science"
            id="field"
            onChange={(e) => handleChange("field_study", e.target.value)}
            value={educationFields?.field_study}
          />
          <div
            className={
              isWarning && educationFields?.field_study == ""
                ? "required"
                : "hidden"
            }
          >
            Field study is required
          </div>
        </div>
        <div className="resume-input-field">
          <label htmlFor="starting">STARTING YEAR</label>
          <input
            type="date"
            placeholder="2018"
            id="starting"
            onChange={(e) =>
              handleChange("education_starting_year", e.target.value)
            }
            value={educationFields?.education_starting_year}
          />
        </div>
        <div className="resume-input-field">
          <label htmlFor="end">YEAR OF GRADUATION</label>
          <input
            type="date"
            placeholder="2022"
            id="end"
            onChange={(e) =>
              handleChange("education_graduation_year", e.target.value)
            }
            value={educationFields?.education_graduation_year}
          />
          <div
            className="currently-here"
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "5px",
              marginTop: "10px",
            }}
          >
            <input
              type="checkbox"
              id="currently_here"
              onChange={(e) =>
                handleChange("education_graduation_year", e.target.value)
              }
              value={educationFields?.education_graduation_year}
            />
            <label htmlFor="currently_here">I currently study here</label>
          </div>
        </div>
      </div>
      <div className="heading-textarea">
        <label htmlFor="achivements">NOTABLE ACHIVEMENTS</label>
        <textarea
          name=""
          id="achivements"
          cols="30"
          rows="10"
          placeholder="Write your career summary"
          onChange={(e) =>
            handleChange("education_achivements", e.target.value)
          }
          value={educationFields?.education_achivements}
        ></textarea>
      </div>
      <SaveDismissButtons
        props={{
          state,
          setState,
          id: educationFields?.id,
          requiredFields :[      
            educationFields.institution_name,
            educationFields.degree,
            educationFields.field_study,],
          setWarning
        }}
      />
    </form>
  );
}

export default EducationFields;
