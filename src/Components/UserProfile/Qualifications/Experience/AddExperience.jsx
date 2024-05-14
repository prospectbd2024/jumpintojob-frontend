import { FaTrashAlt } from "react-icons/fa"; 
// AddExperience.js
import React, { useState, useCallback } from "react";
import "./AddExperience.css";
import AddAreaOfExpertise from "./AddAreaOfExpertise";

function AddExperience({ props }) {
  const { experience, setExperience, experienceErrors } = props;

  const handleChange = useCallback(
    (key, value) => {
      setExperience((prevState) => ({
        ...prevState,
        [key]: value,
      }));
    },
    [setExperience]
  );

  return (
    <div className='add-experience-container-main'>
      <div className="add-experience-container">
        <div className="add-experience-input-field">
          <label htmlFor="jobtitle">JOB TITLE</label>
          <input
            type="text"
            placeholder="Software Engineer"
            id="job_title"
            value={experience?.job_title || ""}
            onChange={(e) => handleChange("job_title", e.target.value)}
          />
          {experienceErrors?.job_title && (
            <div className="add-experience-required">Job title is required</div>
          )}
        </div>
        <div className="add-experience-input-field">
          <label htmlFor="company">COMPANY NAME</label>
          <input
            type="text"
            placeholder="ABC Company"
            id="company_name"
            value={experience?.company_name || ""}
            onChange={(e) => handleChange("company_name", e.target.value)}
          />
          {experienceErrors?.company_name && (
            <div className="add-experience-required">
              Company name is required
            </div>
          )}
        </div>
        <div className="add-experience-input-field">
          <label htmlFor="company_business">COMPANY BUSINESS</label>
          <input
            type="text"
            placeholder="Software Development"
            id="company_business"
            value={experience?.company_business || ""}
            onChange={(e) => handleChange("company_business", e.target.value)}
          />
          {experienceErrors?.company_business && (
            <div className="add-experience-required">
              Company business is required
            </div>
          )}
        </div>
        <div className="add-experience-input-field">
          <label htmlFor="designation">DESIGNATION</label>
          <input
            type="text"
            placeholder="Software Engineer"
            id="designation"
            value={experience?.designation || ""}
            onChange={(e) => handleChange("designation", e.target.value)}
          />
          {experienceErrors?.designation && (
            <div className="add-experience-required">
              Designation is required
            </div>
          )}
        </div>
        <div className="add-experience-input-field">
          <label htmlFor="department">DEPARTMENT</label>
          <input
            type="text"
            placeholder="Engineering"
            id="department"
            value={experience?.department || ""}
            onChange={(e) => handleChange("department", e.target.value)}
          />
          {experienceErrors?.department && (
            <div className="add-experience-required">
              Department is required
            </div>
          )}
        </div>
        <div className="add-experience-input-field">
          <label htmlFor="from_date">FROM DATE (MM/DD/YYYY)</label>
          <input
            type="date"
            id="from_date"
            value={experience?.start_date || ""}
            onChange={(e) => handleChange("start_date", e.target.value)}
          />
          {experienceErrors?.start_date && (
            <div className="add-experience-required">From date is required</div>
          )}
        </div>
        <div className="add-experience-input-field">
          <label htmlFor="to_date">TO DATE (MM/DD/YYYY)</label>
          <input
            type="date"
            id="to_date"
            value={experience?.to_date || ""}
            onChange={(e) => handleChange("to_date", e.target.value)}
          />
          {experienceErrors?.to_date && (
            <div className="add-experience-required">To date is required</div>
          )}
        </div>
        <div className="add-experience-input-field">
            <div>
          <label htmlFor="currently_working" style={{marginRight: '4px'}}>CURRENTLY WORKING</label>
          <input
            type="checkbox"
            id="currently_working"
            checked={experience?.currently_working || false}
            onChange={(e) =>
              handleChange("currently_working", e.target.checked)
            }
          />
            </div>
        </div>
        <div className="add-experience-input-field responsibilities-textarea-container">
          <label htmlFor="responsibilities">RESPONSIBILITIES</label>
          <textarea
            id="responsibilities"
            rows="5"
            value={experience?.responsibilities || ""}
            onChange={(e) => handleChange("responsibilities", e.target.value)}
          ></textarea>
          {experienceErrors?.responsibilities && (
            <div className="add-experience-required">
              Responsibilities are required
            </div>
          )}
        </div>
          <AddAreaOfExpertise props={{experience,setExperience,experienceErrors}} />
        <div className="add-experience-input-field experience-company-location">
          <label htmlFor="company_location">COMPANY LOCATION</label>
          <input
            type="text"
            placeholder="City, Country"
            id="company_location"
            value={experience?.company_location || ""}
            onChange={(e) => handleChange("company_location", e.target.value)}
          />
          {experienceErrors?.company_location && (
            <div className="add-experience-required">
              Company location is required
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddExperience;
