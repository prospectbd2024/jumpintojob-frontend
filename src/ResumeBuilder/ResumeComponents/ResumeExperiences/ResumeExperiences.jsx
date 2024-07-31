'use client'
import React, { useCallback, useEffect, useState } from "react";
import Experiences from "@/Components/UserProfile/Qualifications/Experience/Experiences";
import { useResumeContext } from "@/Contexts/ResumeContext";
const ResumeExperiences = () => {
  const {experiences, setExperiences} =    useResumeContext();


  return (
    <div className="resume-experiences">
      <div className="resume-experiences-container container">
      <Experiences props={{experiences, setExperiences}} />
      </div>
    </div>
  );
};

export default ResumeExperiences;
