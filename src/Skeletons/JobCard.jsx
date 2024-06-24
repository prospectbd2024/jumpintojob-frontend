import React from 'react';
import './JobCard.css'; // Import your CSS file for styling the skeleton

const JobSkeleton = () => {
  return (
    <div className="job-skeleton">
      <div className="job-skeleton-header"></div>
      <div className="job-skeleton-company"></div>
      <div className="job-skeleton-description"></div>
      <div className="job-skeleton-bottom">
        <div className="job-skeleton-salary"></div>
        <div className="job-skeleton-date"></div>
      </div>
    </div>
  );
};

export default JobSkeleton;
