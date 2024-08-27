import React, { useState, useEffect } from "react";
import SingleJob from "@/Components/AllJobs/SingleJob";
import JobCardSkeleton from "@/Skeletons/JobCardSkeleton";
import ShowMoreButton from "@/Components/Buttons/ShowMoreJobs";

const FeaturedJobsList = ({ allJobs, handleClickedFeaturedJob, className, jobClassName }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching delay
    if (allJobs?.length > 0) {
      setIsLoading(false);
    } else {
      setTimeout(() => {
        setIsLoading(false); // Set loading to false after a delay (simulating data fetching)
      }, 2000); // Adjust delay time as needed
    }
  }, []);

  return (
    <section className={className}>
      <h2 className="text-center text-2xl font-bold mb-8">Featured Jobs</h2>
      <div className={jobClassName}>
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
          </>
        ) : (
          <>
            {/* Render actual job items when data is loaded */}
            {allJobs.slice(0, 10).map((job, index) => (
              <SingleJob key={job.id} job={job} handleClickedJob={handleClickedFeaturedJob} />
            ))}
          </>
        )}
      </div>
      <div className='text-center mt-4 mb-10'>

      <ShowMoreButton link={'/jobs'} />
      </div>
    </section>
  );
};

export default FeaturedJobsList;