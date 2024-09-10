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
import DownloadAsButton from "../ResumeDownload/DownloadAsButton";

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

          <div className="navigation-buttons flex flex-col sm:flex-row gap-2 items-center justify-between sm:justify-start mt-4">
            {currentStep === 7 ? (
              <>
               
                <button
                  type="button"
                  className="w-24 h-9 font-bold text-xs sm:w-28 sm:h-10 sm:text-sm md:w-36 md:h-11 md:text-base border border-black bg-transparent text-black rounded-md cursor-pointer"
                  onClick={() => setCurrentStep(currentStep => currentStep - 1)}
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="w-24 h-9 font-bold text-xs sm:w-28 sm:h-10 sm:text-sm md:w-36 md:h-11 md:text-base bg-[var(--primary-color)] text-white rounded-md cursor-pointer transition-all duration-300 ease mr-auto"
                  onClick={saveCV}
                >
                  Save
                </button>
              

              <DownloadAsButton />
              </>
            ) : (
              <PrevNextButton props={{ setCurrentStep, currentStep }} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeContainer;
