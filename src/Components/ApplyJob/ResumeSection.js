// ResumeSection.jsx
import React, { useEffect, useState } from "react";
import ResumePreview from "@/ResumeBuilder/ResumeComponents/ResumeTemplates/ResumePreview";
import ResumeSectionSkeleton from "@/Skeletons/ResumeSectionSkeleton";

const ResumeSection = ({   setCV,CV }) => {
  
  const [loading,setLoading] = useState(true)

  useEffect(()=>{
    if(CV && Object.keys(CV).length>0){
      setLoading(false)
    }
    else{
      setTimeout(() => {
        setLoading(false)
      }, 5000);
    }
  },[CV])

  if(loading){
    return <ResumeSectionSkeleton />
  }


  return <div className="step-applicant-resume-info">
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
  </div>
}

export default ResumeSection;
