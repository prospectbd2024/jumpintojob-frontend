import React, { useState, useEffect } from "react";
import SkeletonLoader from "../../Skeletons/SkeletonLoader"; // Import the SkeletonLoader component
import SingleJob from "./SingleJob";

const JobListView = ({ props }) => {
  const { filteredJobs, clickedJob, handleClickedJob } = props;
  const [isLoading, setIsLoading] = useState(true); // State to manage loading

  // Simulate data fetching
  useEffect(() => {
    // Assuming filteredJobs is initially empty and gets updated later

    if(filteredJobs && filteredJobs.length>0){
      setIsLoading(true)
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
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
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
