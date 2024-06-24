// ResumeSection.jsx
import React from "react";
import ResumePreview from "@/ResumeBuilder/ResumeComponents/ResumeTemplates/ResumePreview";
import ResumeSectionSkeleton from "@/Skeletons/ResumeSectionSkeleton";

const ResumeSection = ({ loading, setCV }) => (
  <div className="step-applicant-resume-info">
    {loading ? (
      <ResumeSectionSkeleton />
    ) : (
      <div className="resume-preview">
        <div className="header">
          <h4>Preview Resume</h4>
          <div>
            Complete your resume/cv with{" "}
            <a target="_blank" href={"/resumebuilder"}>
              Resume Builder
            </a>
          </div>
        </div>
        <div className="resume-preview-container">
          <ResumePreview setCV={setCV} className={"resume-iframe"} />
        </div>
      </div>
    )}
  </div>
);

export default ResumeSection;
