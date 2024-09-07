'use client';
import React from "react";
import SingleJob from "./SingleJob";
import JobCardSkeleton from "@/Skeletons/JobCardSkeleton";
import {useJobContext} from "@/Contexts/JobContext";

const JobListView = ({props}) => {
    const {filteredJobs, clickedJob, handleClickedJob} = props;
    const {Loading, NewJobLoadingFlag} = useJobContext();
    let i = 0;

    return (
        <div className="w-full md:w-[400px] flex flex-col gap-4">
            {/* Skeleton Loaders with fade-in and fade-out transitions */}
            <div className={`transition-opacity duration-300 ${Loading ? 'opacity-100' : 'opacity-0'}`}>
                {Loading && (
                    [...Array(6).keys()].map((_, index) => (
                        <JobCardSkeleton key={`loading-${index}`}/>
                    ))
                )}
            </div>

            {/* Job List Items with fade-in and fade-out transitions */}
            <div className={`transition-opacity duration-300 ${!Loading ? 'opacity-100' : 'opacity-0'}`}>
                {filteredJobs && filteredJobs.length > 0 ? (
                    filteredJobs.map((job, index) => (
                        <SingleJob index={++i} job={job} clickedJob={clickedJob} handleClickedJob={handleClickedJob}
                                   key={job.id}/>
                    ))
                ) : (
                    <p>No jobs available</p>
                )}
            </div>

            {/* New Job Loading Skeletons */}
            <div className={`transition-opacity duration-300 ${NewJobLoadingFlag ? 'opacity-100' : 'opacity-0'}`}>
                {NewJobLoadingFlag && (
                    [...Array(6).keys()].map((_, index) => (
                        <JobCardSkeleton key={`new-job-loading-${index}`}/>
                    ))
                )}
            </div>
        </div>
    );
};

export default JobListView;
