'use client';
import React from "react";
import Education from "@/Components/UserProfile/Qualifications/Education/Education";
import { useResumeContext } from "@/Contexts/ResumeContext";

const ResumeEducation = () => {
  const { educations, setEducations } = useResumeContext();

  return (
    <div className="border border-gray-300 p-5 rounded-lg bg-white mb-5">
      <div className="resume-education">
        <Education props={{ educations, setEducations }} />
      </div>
    </div>
  );
};

export default ResumeEducation;
