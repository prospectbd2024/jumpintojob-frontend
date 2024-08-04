import React, { useState, useEffect } from 'react';
import SingleJob from '@/Components/AllJobs/SingleJob';
import JobCardSkeleton from "@/Skeletons/JobCardSkeleton"; 
import ShowMoreButton from '@/Components/Buttons/ShowMoreJobs';
const FeaturedJobsList = ({ allJobs, handleClickedFeaturedJob  , className  , jobClassName}) => {
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
    <div className={className}>
      <h4 className='text-center text-darker-secondary-color text-2xl'>Featured Jobs:</h4>
      <div   className={jobClassName}>
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
              
             {index===9  }
            </>

          ))
          
        }
          </>
        }

      </div>

      <div className='text-center'>

      <ShowMoreButton link={'/findjobs'} />
      </div>
    </div>
  );
};

export default FeaturedJobsList;
