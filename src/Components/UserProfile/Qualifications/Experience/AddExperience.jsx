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

  return (
    <div className="flex flex-wrap gap-x-5 max-w-full sm:max-w-[600px]"> {/* Updated max-width */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full"> {/* Ensure full width */}
        {/* Job Title */}
        <div className="flex flex-col gap-2">
          <label htmlFor="job_title" className="text-sm font-medium">JOB TITLE</label>
          <input
            type="text"
            placeholder="Software Engineer"
            id="job_title"
            value={experience?.job_title || ""}
            onChange={(e) => handleChange("job_title", e.target.value)}
            className="border border-gray-400 p-2 outline-none bg-transparent text-gray-700 font-sans rounded-md w-full" // Ensure full width
          />
          {experienceErrors?.job_title && (
            <div className="text-red-500 text-xs">Job title is required</div>
          )}
        </div>

        {/* Company Name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="company_name" className="text-sm font-medium">COMPANY NAME</label>
          <input
            type="text"
            placeholder="ABC Company"
            id="company_name"
            value={experience?.company_name || ""}
            onChange={(e) => handleChange("company_name", e.target.value)}
            className="border border-gray-400 p-2 outline-none bg-transparent text-gray-700 font-sans rounded-md w-full" // Ensure full width
          />
          {experienceErrors?.company_name && (
            <div className="text-red-500 text-xs">Company name is required</div>
          )}
        </div>

        {/* Company Business */}
        <div className="flex flex-col gap-2">
          <label htmlFor="company_business" className="text-sm font-medium">COMPANY BUSINESS</label>
          <input
            type="text"
            placeholder="Software Development"
            id="company_business"
            value={experience?.company_business || ""}
            onChange={(e) => handleChange("company_business", e.target.value)}
            className="border border-gray-400 p-2 outline-none bg-transparent text-gray-700 font-sans rounded-md w-full" // Ensure full width
          />
          {experienceErrors?.company_business && (
            <div className="text-red-500 text-xs">Company business is required</div>
          )}
        </div>

        {/* Designation */}
        <div className="flex flex-col gap-2">
          <label htmlFor="designation" className="text-sm font-medium">DESIGNATION</label>
          <input
            type="text"
            placeholder="Software Engineer"
            id="designation"
            value={experience?.designation || ""}
            onChange={(e) => handleChange("designation", e.target.value)}
            className="border border-gray-400 p-2 outline-none bg-transparent text-gray-700 font-sans rounded-md w-full" // Ensure full width
          />
          {experienceErrors?.designation && (
            <div className="text-red-500 text-xs">Designation is required</div>
          )}
        </div>

        {/* Department */}
        <div className="flex flex-col gap-2">
          <label htmlFor="department" className="text-sm font-medium">DEPARTMENT</label>
          <input
            type="text"
            placeholder="Engineering"
            id="department"
            value={experience?.department || ""}
            onChange={(e) => handleChange("department", e.target.value)}
            className="border border-gray-400 p-2 outline-none bg-transparent text-gray-700 font-sans rounded-md w-full" // Ensure full width
          />
          {experienceErrors?.department && (
            <div className="text-red-500 text-xs">Department is required</div>
          )}
        </div>

        {/* From Date */}
        <div className="flex flex-col gap-2">
          <label htmlFor="start_date" className="text-sm font-medium">FROM DATE (MM/DD/YYYY)</label>
          <input
            type="date"
            id="start_date"
            value={experience?.start_date || ""}
            onChange={(e) => handleChange("start_date", e.target.value)}
            className="border border-gray-400 p-2 outline-none bg-transparent text-gray-700 font-sans rounded-md w-full" // Ensure full width
          />
          {experienceErrors?.start_date && (
            <div className="text-red-500 text-xs">From date is required</div>
          )}
        </div>

        {/* To Date */}
        <div className="flex flex-col gap-2">
          <label htmlFor="to_date" className="text-sm font-medium">TO DATE (MM/DD/YYYY)</label>
          <input
            type="date"
            id="to_date"
            value={experience?.to_date || ""}
            onChange={(e) => handleChange("to_date", e.target.value)}
            disabled={isWorking}
            className="border border-gray-400 p-2 outline-none bg-transparent text-gray-700 font-sans rounded-md w-full" // Ensure full width
          />
          {experienceErrors?.to_date && !isWorking && (
            <div className="text-red-500 text-xs">To date is required</div>
          )}
        </div>

        {/* Currently Working Checkbox */}
        <div className="flex items-center gap-2">
          <label htmlFor="currently_working" className="text-sm font-medium">CURRENTLY WORKING</label>
          <input
            type="checkbox"
            id="currently_working"
            checked={experience?.currently_working || false}
            onChange={(e) => handleChange("currently_working", e.target.checked)}
            className="form-checkbox h-5 w-5 text-primary"
          />
        </div>

        {/* Responsibilities */}
        <div className="flex flex-col gap-2 sm:col-span-2">
          <label htmlFor="responsibilities" className="text-sm font-medium">RESPONSIBILITIES</label>
          <textarea
            id="responsibilities"
            rows="5"
            value={experience?.responsibilities || ""}
            onChange={(e) => handleChange("responsibilities", e.target.value)}
            className="h-[170px] w-full resize-none border border-gray-400 p-2 outline-none bg-transparent text-gray-700 font-sans rounded-md"
          ></textarea>
          {experienceErrors?.responsibilities && (
            <div className="text-red-500 text-xs">Responsibilities are required</div>
          )}
        </div>

        {/* Area of Expertise Component */}
        <AddAreaOfExpertise props={{ experience, setExperience, experienceErrors }} />

        {/* Company Location */}
        <div className="flex flex-col gap-2 sm:col-span-2">
          <label htmlFor="company_location" className="text-sm font-medium">COMPANY LOCATION</label>
          <input
            type="text"
            placeholder="City, Country"
            id="company_location"
            value={experience?.company_location || ""}
            onChange={(e) => handleChange("company_location", e.target.value)}
            className="border border-gray-400 p-2 outline-none bg-transparent text-gray-700 font-sans rounded-md w-full" // Ensure full width
          />
          {experienceErrors?.company_location && (
            <div className="text-red-500 text-xs">Company location is required</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddExperience;
