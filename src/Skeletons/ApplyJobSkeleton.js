// ApplyJobSkeleton.js
import React from "react";
import JobHeaderSkeleton from "./JobHeaderSkeleton";
import ContactInformationSkeleton from "./ContactInformationSkeleton"; 
import CoverLetterSectionSkeleton from "./CoverLetterSectionSkeleton";
import ApplyButtonSectionSkeleton from "./ApplyButtonSectionSkeleton";
import Skeleton from "react-loading-skeleton";
import ResumeSectionSkeleton from "./ResumeSectionSkeleton";

const ApplyJobSkeleton = () => (
  <div className="job-application-form">
    <div className="job-application-form-content container">
      <JobHeaderSkeleton />
      <div className="job-application-main">
        <div className="create-cv-warning">
          <Skeleton width={300} height={20} />
        </div>
        <form>
          <ContactInformationSkeleton />
          <ResumeSectionSkeleton />
          <CoverLetterSectionSkeleton />
          <ApplyButtonSectionSkeleton />
        </form>
      </div>
    </div>
  </div>
);

export default ApplyJobSkeleton;
