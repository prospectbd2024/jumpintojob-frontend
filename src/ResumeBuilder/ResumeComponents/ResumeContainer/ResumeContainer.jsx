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
import PrevNextButton from "@/ResumeBuilder/Layout/Button/PrevNextButton";
import { useResumeContext } from "@/Contexts/ResumeContext";

const ResumeContainer = () => {
  const { currentStep, setCurrentStep, saveCV } = useResumeContext();

  return (
    <div className="container py-12">
      <ResumeSteps />
      <div className="resume-content py-8 my-12">
        {currentStep === 1 && <ResumeTemplates />}
        <div className="resume-form" hidden={currentStep === 1}>
          {currentStep === 2 && <ResumeHeading />}
          {currentStep === 3 && <ResumeEducation />}
          {currentStep === 4 && <ResumeExperiences />}
          {currentStep === 5 && <ResumeSkills />}
          {currentStep === 6 && <ResumeFinalize />}
          {currentStep === 7 && <ResumePreview />}

          <div className="navigation-buttons">
            <PrevNextButton props={{ setCurrentStep, currentStep }} />
            {currentStep === 7 && (
              <button
                type="button"
                className="bg-[var(--primary-color)] text-white w-30 h-10 rounded-md border-none text-lg font-bold cursor-pointer transition-all duration-300 ease"
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
