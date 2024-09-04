"use client";
import { FaTrashAlt } from "react-icons/fa";
import React, { useState, useCallback, useEffect } from "react";
import AddAreaOfExpertise from "./AddAreaOfExpertise";

function AddExperience({ props }) {
  const { experience, setExperience, experienceErrors } = props;
  const [isWorking, setWorking] = useState(false);

  const handleChange = useCallback(
    (key, value) => {
      setExperience((prevState) => ({
        ...prevState,
        [key]: value,
      }));
    },
    [setExperience]
  );

  useEffect(() => {
    setWorking(experience?.currently_working ?? false);
  }, [experience]);

  const handleFocus = (event) => {
    let element = event.target;
    element.classList.add('focused');
    let parentNode = element.parentNode;
    let hr = parentNode.querySelector('hr');
    hr.classList.add('focused');
  };

  const handleBlur = (event) => {
    let element = event.target;
    element.classList.remove('focused');
    let parentNode = element.parentNode;
    let hr = parentNode.querySelector('hr');
    hr.classList.remove('focused');
  };

  return (
    <div className="flex flex-wrap gap-x-5 max-w-[600px]">
      <div className="flex flex-col gap-y-2 mb-5 flex-[1_1_48%] relative">
        <label htmlFor="job_title" className="text-xs">JOB TITLE</label>
        <input
          type="text"
          placeholder="Software Engineer"
          id="job_title"
          value={experience?.job_title || ""}
          onChange={(e) => handleChange("job_title", e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="border border-gray-400 p-2 outline-none bg-transparent text-gray-700 font-sans rounded-md"
        />
        <hr className="absolute bottom-0 left-0 w-full h-px bg-[var(--primary-color)] opacity-0 transform transition-opacity duration-300" />
        {experienceErrors?.job_title && (
          <div className="text-red-500 text-xs mt-1">Job title is required</div>
        )}
      </div>

      <div className="flex flex-col gap-y-2 mb-5 flex-[1_1_48%] relative">
        <label htmlFor="company_name" className="text-xs">COMPANY NAME</label>
        <input
          type="text"
          placeholder="ABC Company"
          id="company_name"
          value={experience?.company_name || ""}
          onChange={(e) => handleChange("company_name", e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="border border-gray-400 p-2 outline-none bg-transparent text-gray-700 font-sans rounded-md"
        />
        <hr className="absolute bottom-0 left-0 w-full h-px bg-[var(--primary-color)] opacity-0 transform transition-opacity duration-300" />
        {experienceErrors?.company_name && (
          <div className="text-red-500 text-xs mt-1">Company name is required</div>
        )}
      </div>

      <div className="flex flex-col gap-y-2 mb-5 flex-[1_1_48%] relative">
        <label htmlFor="company_business" className="text-xs">COMPANY BUSINESS</label>
        <input
          type="text"
          placeholder="Software Development"
          id="company_business"
          value={experience?.company_business || ""}
          onChange={(e) => handleChange("company_business", e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="border border-gray-400 p-2 outline-none bg-transparent text-gray-700 font-sans rounded-md"
        />
        <hr className="absolute bottom-0 left-0 w-full h-px bg-[var(--primary-color)] opacity-0 transform transition-opacity duration-300" />
        {experienceErrors?.company_business && (
          <div className="text-red-500 text-xs mt-1">Company business is required</div>
        )}
      </div>

      <div className="flex flex-col gap-y-2 mb-5 flex-[1_1_48%] relative">
        <label htmlFor="designation" className="text-xs">DESIGNATION</label>
        <input
          type="text"
          placeholder="Software Engineer"
          id="designation"
          value={experience?.designation || ""}
          onChange={(e) => handleChange("designation", e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="border border-gray-400 p-2 outline-none bg-transparent text-gray-700 font-sans rounded-md"
        />
        <hr className="absolute bottom-0 left-0 w-full h-px bg-[var(--primary-color)] opacity-0 transform transition-opacity duration-300" />
        {experienceErrors?.designation && (
          <div className="text-red-500 text-xs mt-1">Designation is required</div>
        )}
      </div>

      <div className="flex flex-col gap-y-2 mb-5 flex-[1_1_48%] relative">
        <label htmlFor="department" className="text-xs">DEPARTMENT</label>
        <input
          type="text"
          placeholder="Engineering"
          id="department"
          value={experience?.department || ""}
          onChange={(e) => handleChange("department", e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="border border-gray-400 p-2 outline-none bg-transparent text-gray-700 font-sans rounded-md"
        />
        <hr className="absolute bottom-0 left-0 w-full h-px bg-[var(--primary-color)] opacity-0 transform transition-opacity duration-300" />
        {experienceErrors?.department && (
          <div className="text-red-500 text-xs mt-1">Department is required</div>
        )}
      </div>

      <div className="flex flex-col gap-y-2 mb-5 flex-[1_1_48%] relative">
        <label htmlFor="start_date" className="text-xs">FROM DATE (MM/DD/YYYY)</label>
        <input
          type="date"
          id="start_date"
          value={experience?.start_date || ""}
          onChange={(e) => handleChange("start_date", e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="border border-gray-400 p-2 outline-none bg-transparent text-gray-700 font-sans rounded-md"
        />
        <hr className="absolute bottom-0 left-0 w-full h-px bg-[var(--primary-color)] opacity-0 transform transition-opacity duration-300" />
        {experienceErrors?.start_date && (
          <div className="text-red-500 text-xs mt-1">From date is required</div>
        )}
      </div>

      <div className="flex flex-col gap-y-2 mb-5 flex-[1_1_48%] relative">
        <label htmlFor="to_date" className="text-xs">TO DATE (MM/DD/YYYY)</label>
        <input
          type="date"
          id="to_date"
          value={experience?.to_date || ""}
          onChange={(e) => handleChange("to_date", e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={isWorking}
          className="border border-gray-400 p-2 outline-none bg-transparent text-gray-700 font-sans rounded-md"
        />
        <hr className="absolute bottom-0 left-0 w-full h-px bg-[var(--primary-color)] opacity-0 transform transition-opacity duration-300" />
        {experienceErrors?.to_date && !isWorking && (
          <div className="text-red-500 text-xs mt-1">To date is required</div>
        )}
      </div>

      <div className="flex items-center gap-2 mb-5 flex-[1_1_100%]">
        <input
          type="checkbox"
          id="currently_working"
          checked={experience?.currently_working || false}
          onChange={(e) => handleChange("currently_working", e.target.checked)}
          className="w-[15px]"
        />
        <label htmlFor="currently_working" className="text-sm">CURRENTLY WORKING</label>
      </div>

      <div className="flex flex-col gap-y-2 mb-5 flex-[1_1_100%] relative">
        <label htmlFor="responsibilities" className="text-xs">RESPONSIBILITIES</label>
        <textarea
          id="responsibilities"
          rows="5"
          value={experience?.responsibilities || ""}
          onChange={(e) => handleChange("responsibilities", e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="h-[170px] w-full resize-none border border-gray-400 p-2 outline-none bg-transparent text-gray-700 font-sans rounded-md"
        ></textarea>
        <hr className="absolute bottom-0 left-0 w-full h-px bg-[var(--primary-color)] opacity-0 transform transition-opacity duration-300" />
        {experienceErrors?.responsibilities && (
          <div className="text-red-500 text-xs mt-1">Responsibilities are required</div>
        )}
      </div>

      <AddAreaOfExpertise props={{ experience, setExperience, experienceErrors }} />

      <div className="flex flex-col gap-y-2 mb-5 flex-[1_1_100%] relative mt-5">
        <label htmlFor="company_location" className="text-xs">COMPANY LOCATION</label>
        <input
          type="text"
          placeholder="City, Country"
          id="company_location"
          value={experience?.company_location || ""}
          onChange={(e) => handleChange("company_location", e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="border border-gray-400 p-2 outline-none bg-transparent text-gray-700 font-sans rounded-md"
        />
        <hr className="absolute bottom-0 left-0 w-full h-px bg-[var(--primary-color)] opacity-0 transform transition-opacity duration-300" />
        {experienceErrors?.company_location && (
          <div className="text-red-500 text-xs mt-1">Company location is required</div>
        )}
      </div>
    </div>
  );
}

export default AddExperience;