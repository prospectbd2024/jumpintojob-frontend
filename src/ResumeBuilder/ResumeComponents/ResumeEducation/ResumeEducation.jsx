'use client'
import React, { useEffect } from "react";
import { useUserContext } from "../../../Contexts/UserContext";
import "../ResumeHeading/ResumeHeading.css";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import PreviewEducation from "./PreviewEducation";
import EducationFields from "./EducationFields";
import PrevNextButton from "@/ResumeBuilder/Layout/Button/PrevNextButton";
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
