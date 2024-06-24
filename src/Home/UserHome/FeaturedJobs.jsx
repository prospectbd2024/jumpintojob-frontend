import React, { useState, useEffect } from 'react';
import SingleJob from '@/Components/AllJobs/SingleJob';
import JobCardSkeleton from "@/Skeletons/JobCardSkeleton";
import Link from 'next/link'
import ShowMoreButton from '@/Components/Buttons/ShowMoreJobs';
const FeaturedJobsList = ({ allJobs, handleClickedFeaturedJob }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching delay
    if(allJobs?.length>0){
      setIsLoading(false)
    }else{
      setTimeout(() => {
        setIsLoading(false); // Set loading to false after a delay (simulating data fetching)
      }, 2000); // Adjust delay time as needed
    }
  }, []);

  return (
    <div>
      <h4 className='featured-jobs-header'>Featured Jobs:</h4>
      <div className='featured-jobs-items all-jobs-container'>
        {isLoading ? (
          // Show skeleton loaders while loading
          <>

             <JobCardSkeleton />
             <JobCardSkeleton />
             <JobCardSkeleton />
             <JobCardSkeleton />
             <JobCardSkeleton />
             <JobCardSkeleton />
             <JobCardSkeleton />
             <JobCardSkeleton />
             <JobCardSkeleton />
             <JobCardSkeleton />
       
          </>
        ) : <>{
          // Render actual job items when data is loaded
          allJobs.slice(0, 10).map((job,index) => (
            <>
            <SingleJob
              key={job.id}
              job={job}
              handleClickedJob={handleClickedFeaturedJob}
              />
              
             {index===9 && <ShowMoreButton link={'/findjobs'} /> }
            </>

          ))
          
        }
          </>
        }

      </div>
    </div>
  );
};

export default FeaturedJobsList;
