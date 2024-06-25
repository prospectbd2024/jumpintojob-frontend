// ResumeSectionSkeleton.js
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ResumeSectionSkeleton = () => (
  <div className="resume-preview">
    <div className="header">
      <h4><Skeleton width={150} /></h4>
      <Skeleton width={200} />
    </div>
    <div className="resume-preview-container">
      <Skeleton width="100%" height={400} />
    </div>
  </div>
);

export default ResumeSectionSkeleton;
