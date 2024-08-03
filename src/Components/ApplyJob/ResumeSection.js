import React, { useEffect, useState } from "react";
import ResumePreview from "@/ResumeBuilder/ResumeComponents/ResumeTemplates/ResumePreview";
import ResumeSectionSkeleton from "@/Skeletons/ResumeSectionSkeleton";

const ResumeSection = ({ setCV, CV }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (CV && Object.keys(CV).length > 0) {
      setLoading(false);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 5000);
    }
  }, [CV]);

  if (loading) {
    return <ResumeSectionSkeleton />;
  }

  return (
    <div className="border border-gray-300 rounded-lg p-6 mt-6">
      <div className="text-gray-700 mb-5">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold">Preview Resume</h4>
          <div className="text-sm">
            Complete your resume/cv with{" "}
            <a
              target="_blank"
              href={"/resumebuilder"}
              className="text-blue-500 underline"
            >
              Resume Builder
            </a>
          </div>
        </div>
        <div className="border border-gray-300 rounded-md p-4">
          <ResumePreview setCV={setCV} className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default ResumeSection;
