import SaveDismissButtons from "@/ResumeBuilder/Layout/Button/SaveDismissButtons";
import React, { useCallback, useEffect, useState } from "react";

function EperienceFiels({ props }) {
  const BaseFormat = {
    id: 0,
    job_title: "",
    company: "",
    job_city: "",
    job_country: "",
    job_starting_year: "",
    job_ending_year: "",
    job_description: "",
  };

  const [isWarning, setWarning] = useState(false);
  const [experienceFields, setExperienceFields] = useState(BaseFormat);
  const { setResumeData, resumeData, state, setState } = props;

  const handleChange = useCallback((key, value) => {
    setExperienceFields((prev) => {
      prev[key] = value;
      return prev;
    });
    updateResumeData(experienceFields);
  });

  useEffect(() => {
    if (state.type == "insert") {
      // alert(state.index)

      BaseFormat.id = state.index;
      // console.log(state.index,BaseFormat)
      setExperienceFields(BaseFormat);

      updateResumeData(BaseFormat);
    }
    if (state.type == "update") {
      let experience_fields = resumeData.experiences.find(
        (item) => item.id == state.id
      );
      setExperienceFields(experience_fields);
    }
    console.log('state should not change')
  }, [state]);

  const updateResumeData = useCallback((experienceFields) => {
    const resumeExperiences = resumeData.experiences;
    console.log("old ", resumeExperiences);

    const index = resumeExperiences.findIndex(
      (item) => item.id == experienceFields.id
    );

    if (index == -1) {
      resumeExperiences.push(experienceFields);
    } else {
      resumeExperiences[index] = experienceFields;
    }
    // console.log(resumeExperiences);
    setResumeData((prev) => {
      return { ...prev, experiences: resumeExperiences };
    });
  });

  return (
    <form action="" className="heading-form" style={{ marginTop: "50px" }}>
      <div className="heading-form-main">
        <div className="resume-input-field">
          <label htmlFor="jobtitle">JOB TITLE</label>
          <input
            type="text"
            value={experienceFields?.job_title}
            placeholder="Python Developer"
            id="jobtitle"
            onChange={(e) => handleChange("job_title", e.target.value)}
          />{" "}
          <div className={isWarning && experienceFields.job_title=='' ? 'required': 'hidden'}>Job title is required</div>

        </div>
        <div className="resume-input-field">
          <label htmlFor="company">COMPANY</label>
          <input
            type="text"
            value={experienceFields?.company}
            placeholder="Prospectbd"
            id="company"
            onChange={(e) => handleChange("company", e.target.value)}
          />
        <div className={isWarning&&experienceFields.company=='' ? 'required': 'hidden'}>Company name is required</div>
        </div>
        <div className="resume-input-field">
          <label htmlFor="city">CITY</label>
          <input
            type="text"
            value={experienceFields?.city}
            placeholder="Rajshahi"
            id="city"
            onChange={(e) => handleChange("job_city", e.target.value)}
          />
        </div>
        <div className="resume-input-field">
          <label htmlFor="job_country">COUNTRY</label>
          <input
            type="text"
            value={experienceFields?.country}
            placeholder="Bangladesh"
            id="country"
            onChange={(e) => handleChange("job_country", e.target.value)}
          />
        </div>
        <div className="resume-input-field">
          <label htmlFor="starting">START DATE</label>
          <input
            type="date"
            value={experienceFields?.job_starting_year}
            placeholder="05-18-2023"
            id="starting"
            onChange={(e) => handleChange("job_starting_year", e.target.value)}
          />
        </div>
        <div className="resume-input-field">
          <label htmlFor="end">END DATE</label>
          <input
            type="date"
            value={experienceFields?.job_ending_year}
            placeholder="Present"
            id="end"
            onChange={(e) => handleChange("job_ending_year", e.target.value)}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "5px",
              marginTop: "10px",
            }}
          >
            <input
              type="checkbox"
              value={experienceFields?.job_ending_year}
              id="currently_here"
              onClick={(e) => handleChange("job_ending_year", e.target.value)}
            />
            <label style={{ fontSize: "13px" }} htmlFor="currently_here">
              I currently study here
            </label>
          </div>
        </div>
      </div>
      <div className="heading-textarea">
        <label htmlFor="achivements">JOB DESCRIPTION</label>
        <textarea
          name=""
          id="achivements"
          cols="30"
          rows="10"
          value={experienceFields?.job_description}
          placeholder="Write your job description"
          onChange={(e) => handleChange("job_description", e.target.value)}
        ></textarea>
      </div>
      <SaveDismissButtons
        props={{
          state,
          setState,
          requiredFields: [
            experienceFields.job_title,
            experienceFields.company,
          ],
          setWarning,
        }}
      />
    </form>
  );
}

export default EperienceFiels;
