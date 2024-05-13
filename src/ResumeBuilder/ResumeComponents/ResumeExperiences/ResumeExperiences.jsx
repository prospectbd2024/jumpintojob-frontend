'use client'
import React, { useCallback, useEffect, useState } from "react";
import { useUserContext } from "../../../Contexts/UserContext";
import { FaPlus } from "react-icons/fa";
import PreviewExperiences from "./PreviewExperiences";
import ExperienceFildes from "./ExperienceFields";
import PrevNextButton from "@/ResumeBuilder/Layout/Button/PrevNextButton";
import AddMoreButton from "@/ResumeBuilder/Layout/Button/AddMoreButton";
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
