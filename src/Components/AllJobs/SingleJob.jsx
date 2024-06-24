import React from 'react';
import { HiOutlineBookmark } from 'react-icons/hi';

const SingleJob = ({ job, clickedJob, handleClickedJob }) => {
  return (
    <div
      className={`single-job ${clickedJob === job.id ? 'clicked-job' : ''}`}
      onClick={() => handleClickedJob(job.id)}
    >
      <div className="single-job-header">
        <h2>{job.job_title}</h2>
        <HiOutlineBookmark />
      </div>
      <h3>{job.company_name}</h3>
      <p>{job.address}</p>
      <p>{job.description.slice(0, 100)}...</p>
      <div className="single-job-bottom">
        <p className='single-job-salary'>{job.salary} <span>(Estimated)</span></p>
        <p className='posting-date'>22d</p>
      </div>
    </div>
  );
};

export default SingleJob;
