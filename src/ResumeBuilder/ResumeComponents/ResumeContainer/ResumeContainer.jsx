"use client";
import React, { useState } from "react";
import ResumeSteps from "../ResumeSteps/ResumeSteps";
import ResumeTemplates from "../ResumeTemplates/ResumeTemplates";
import ResumeHeading from "../ResumeHeading/ResumeHeading";
import ResumeEducation from "../ResumeEducation/ResumeEducation";
import ResumePreview from "../ResumePreview/ResumePreview";
import ResumeExperiences from "../ResumeExperiences/ResumeExperiences";
import ResumeSkills from "../ResumeSkills/ResumeSkills";
import ResumeFinalize from "../ResumeFinalize/ResumeFinalize";
import SkillContextProvider from "@/Contexts/SkillContext";
import NavButtons from "@/ResumeBuilder/Layout/Button/NavButtons";
import { useResumeContext } from "@/Contexts/ResumeContext";
import SaveProfileButton from "@/Components/Buttons/SaveProfileButton";

const ResumeContainer = () => {
  const { currentStep, setCurrentStep,saveCV   } = useResumeContext();




  return (
    <div style={{ padding: "50px 0" }} className="container">
      <ResumeSteps />
      <div
        className="resume-content"
        style={{ padding: "30px", margin: "50px 0" }}
      >
        {currentStep == 1 && (
          <ResumeTemplates    />
        )}
        <div className="resume-form"  hidden={currentStep==1}>
          {currentStep == 2 && <ResumeHeading />}
          {currentStep == 3 && <ResumeEducation />}
          {currentStep == 4 && <ResumeExperiences />}
          {currentStep == 5 &&  <ResumeSkills /> }
          {currentStep==6  && <ResumeFinalize />}
          {currentStep==7  && <ResumePreview />}

            <div className='navigation-buttons'>
              <NavButtons props={{setCurrentStep,currentStep}}  hideNext={currentStep==7 } />
              {currentStep==7 ?  <button  type="button" style={{background: 'var(--primary-color)',
              color: 'rgb(255, 255, 255)',
              width: '120px',
              height: '40px',
              borderRadius: '5px',
              border: 'none',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease 0s'}} onClick={ saveCV }>Save</button> : <></>}
             
            </div>

        </div>
      </div>
    </div>
  );
};

export default ResumeContainer;
