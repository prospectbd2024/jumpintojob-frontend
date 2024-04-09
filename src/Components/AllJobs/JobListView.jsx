"use client"
import Link from 'next/link';
import React from 'react'
import { HiOutlineBookmark } from 'react-icons/hi'

function JobListView({props}) {
    const {filteredJobs, limit,clickedJob,handleClickedJob }=props;
  return (
    <div className="all-jobs-container">
    {
        
        filteredJobs.slice(0, limit).map(job =>
            <div className={`single-job ${clickedJob===job.id?'clicked-job': ''}`} key={job.id} href={""}  onClick={() => {handleClickedJob(job.id);}} >
                <div className="single-job-header">
                    <h2>{job.job_title}</h2>
                    <HiOutlineBookmark/>
                </div>
                <h3>{job.company_name}</h3>
                <p>{job.address}</p>
                <p>{job.job_description.slice(0, 100)}...</p>
                <div className="single-job-bottom" >
                    <p className='single-job-salary'>{job.salary} <span>(Estimated)</span></p>
                    <p className='posting-date'>22d</p>
                </div>
            </div>
        )
    }
</div>
  )
}

export default JobListView
