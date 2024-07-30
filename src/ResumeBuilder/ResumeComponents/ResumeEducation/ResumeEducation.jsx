'use client'
import React, { useEffect } from "react";
import "../ResumeHeading/ResumeHeading.scss";
import Education from "@/Components/UserProfile/Qualifications/Education/Education";
import { useResumeContext } from "@/Contexts/ResumeContext";

const ResumeEducation = () => {
  const {  educations,setEducations} = useResumeContext();

  return (
    <div className="resume-education">
      <Education props={{educations,setEducations}}/>
    </div>
  );
};

export default ResumeEducation;
