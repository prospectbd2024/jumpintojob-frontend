import React, { useState, useEffect } from "react"; 
import SingleJob from "./SingleJob"; 
import JobCardSkeleton from "@/Skeletons/JobCardSkeleton";
 

const JobListView = ({ props }) => {
  const { filteredJobs, clickedJob, handleClickedJob } = props;
  const [isLoading, setIsLoading] = useState(true); // State to manage loading

  // Simulate data fetching
  useEffect(() => {
    // Assuming filteredJobs is initially empty and gets updated later

    if(filteredJobs && filteredJobs.length>0){
      setIsLoading(false)
    }
    else{
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  }, [filteredJobs]);

  return (
    <div className="all-jobs-container">
      {isLoading ? (
        // Display multiple skeleton loaders while loading
        <>
          <JobCardSkeleton />
          <JobCardSkeleton />
          <JobCardSkeleton />
        </>
      ) : filteredJobs && filteredJobs.length > 0 ? (
        // Render the list of jobs if filteredJobs has items
        filteredJobs.map((job, index) => (
          <SingleJob key={index} job={job} clickedJob={clickedJob} handleClickedJob={handleClickedJob} />
        ))
      ) : (
        // Render a message when filteredJobs is empty
        <p>No jobs available</p>
      )}
    </div>
  );
};

export default JobListView;
