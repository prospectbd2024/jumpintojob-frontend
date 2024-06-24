import React, { useState, useEffect } from 'react';
import SingleJob from '@/Components/AllJobs/SingleJob';
import  JobCard from  '@/Skeletons/JobCard';
const FeaturedJobsList = ({ allJobs, handleClickedFeaturedJob }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching delay
    setTimeout(() => {
      setIsLoading(false); // Set loading to false after a delay (simulating data fetching)
    }, 2000); // Adjust delay time as needed
  }, []);

  return (
    <div>
      <h4 className='featured-jobs-header'>Featured Jobs:</h4>
      <div className='featured-jobs-items all-jobs-container'>
        {isLoading ? (
          // Show skeleton loaders while loading
          <>

             <JobCard />
             <JobCard />
             <JobCard />
             <JobCard />
             <JobCard />
             <JobCard />
             <JobCard />
             <JobCard />
             <JobCard />
             <JobCard />
       
          </>
        ) : (
          // Render actual job items when data is loaded
          allJobs.slice(0, 10).map(job => (
            <SingleJob
              key={job.id}
              job={job}
              handleClickedJob={handleClickedFeaturedJob}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default FeaturedJobsList;
