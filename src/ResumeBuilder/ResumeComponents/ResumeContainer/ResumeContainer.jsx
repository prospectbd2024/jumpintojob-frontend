"use client";
import React from "react";
import ResumeSteps from "../ResumeSteps/ResumeSteps";
import ResumeTemplates from "../ResumeTemplates/ResumeTemplates";
import ResumeHeading from "../ResumeHeading/ResumeHeading";
import ResumeEducation from "../ResumeEducation/ResumeEducation";
import ResumePreview from "../ResumePreview/ResumePreview";
import ResumeExperiences from "../ResumeExperiences/ResumeExperiences";
import ResumeSkills from "../ResumeSkills/ResumeSkills";
import ResumeFinalize from "../ResumeFinalize/ResumeFinalize";
import NavButtons from "@/ResumeBuilder/Layout/Button/NavButtons";
import { useResumeContext } from "@/Contexts/ResumeContext";

import './ResumeContainer.scss';

const ResumeContainer = () => {
  const { currentStep, setCurrentStep, saveCV } = useResumeContext();

  return (
    <div className="resume-container">
      <ResumeSteps />
      <div className="resume-container__content">
        {currentStep === 1 && <ResumeTemplates />}
        <div className={`resume-container__form ${currentStep === 1 ? 'resume-container__form--hidden' : ''}`}>
          {currentStep === 2 && <ResumeHeading />}
          {currentStep === 3 && <ResumeEducation />}
          {currentStep === 4 && <ResumeExperiences />}
          {currentStep === 5 && <ResumeSkills />}
          {currentStep === 6 && <ResumeFinalize />}
          {currentStep === 7 && <ResumePreview />}

          <div className='resume-container__navigation'>
            <NavButtons props={{setCurrentStep, currentStep}} hideNext={currentStep === 7} />
            {currentStep === 7 && (
              <button 
                type="button" 
                className="resume-container__save-button"
                onClick={saveCV}
              >
                Save
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeContainer;