// CoverLetterSectionSkeleton.js
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CoverLetterSectionSkeleton = () => (
  <div className="upload-coverletter upload-resume">
    <div className="cover-letter-options">
      {[...Array(2)].map((_, i) => (
        <div className="cover-letter-radio" key={i}>
          <Skeleton circle={true} height={20} width={20} />
          <Skeleton width={100} />
        </div>
      ))}
    </div>
    <Skeleton width="100%" height={100} />
  </div>
);

export default CoverLetterSectionSkeleton;
