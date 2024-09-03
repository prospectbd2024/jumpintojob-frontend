import React from "react";
import SingleJob from "./SingleJob";
import JobCardSkeleton from "@/Skeletons/JobCardSkeleton";
import {useJobContext} from "@/Contexts/JobContext";

const JobListView = ({props}) => {
    const {filteredJobs, clickedJob, handleClickedJob} = props;
    const {Loading} = useJobContext();

    return (
        <div className="w-full md:w-[400px] flex flex-col gap-4">
            {Loading ? (
                // Display multiple skeleton loaders while loading
                <>
                    <JobCardSkeleton/>
                    <JobCardSkeleton/>
                    <JobCardSkeleton/>
                    <JobCardSkeleton/>
                    <JobCardSkeleton/>
                    <JobCardSkeleton/>
                </>
            ) : filteredJobs && filteredJobs.length > 0 ? (
                // Render the list of jobs if filteredJobs has items
                filteredJobs.map((job, index) => (
                    <SingleJob key={index} job={job} clickedJob={clickedJob} handleClickedJob={handleClickedJob}/>
                ))
            ) : (
                // Render a message when filteredJobs is empty
                <p>No jobs available</p>
            )}
        </div>
    );
};

export default JobListView;
