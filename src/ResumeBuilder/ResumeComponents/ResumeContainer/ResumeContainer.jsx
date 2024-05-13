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
import PrevNextButton from "@/ResumeBuilder/Layout/Button/PrevNextButton";
import { useResumeContext } from "@/Contexts/ResumeContext";

const ResumeContainer = () => {
  const { currentStep, setCurrentStep } = useResumeContext();
  const [templateType, setTemplateType] = useState(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState([]);

  const handleSelectedTemplate = (template) => {
    setSelectedTemplateId(template.id);
    setTemplateType(template.type);
    setSelectedTemplate(template);
  };

  return (
    <div style={{ padding: "50px 0" }} className="container">
      <ResumeSteps />
      <div
        className="resume-content"
        style={{ padding: "30px", margin: "50px 0" }}
      >
        {currentStep == 1 && (
          <ResumeTemplates
            handleSelectedTemplate={handleSelectedTemplate}
            selectedTemplateId={selectedTemplateId}
          />
        )}
        <div className="resume-form"  hidden={currentStep==1}>
          {currentStep == 2 && <ResumeHeading />}
          {currentStep == 3 && <ResumeEducation />}
          {currentStep == 4 && <ResumeExperiences />}
          {currentStep == 5 &&  <ResumeSkills /> }
          {currentStep==6  && <ResumeFinalize />}

          <PrevNextButton props={{setCurrentStep,currentStep}} />
     
        </div>
      </div>
    </div>
  );
};

export default ResumeContainer;
