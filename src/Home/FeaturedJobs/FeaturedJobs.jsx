import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useUserContext } from "../../Contexts/UserContext";
import { useJobContext } from "@/Contexts/JobContext";
import SingleJob from "@/Components/AllJobs/SingleJob";
import ShowMoreJobsSkeleton from "@/Skeletons/ShowMoreJobsSkeleton";
import JobCardSkeleton from "@/Skeletons/JobCardSkeleton";
import { useRouter } from "next/navigation";

const FeaturedJobs = () => {
  const { setClickedFeaturedJob } = useUserContext();
  const { allJobs,featuredJobs,isFeaturedJobLoading } = useJobContext();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const handleClickedFeaturedJob = (e) => {
    router.push(`/jobs/jobdetails/${e}`);
  };

  useEffect(() => {
    if (allJobs && allJobs.length > 0) {
      setIsLoading(false);
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  }, [allJobs]);

  return (
    <section className="featured-jobs py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl font-bold mb-8">Featured Jobs</h2>
        {isFeaturedJobLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(6)].map((_, i) => (
              <JobCardSkeleton key={i} />
            ))}
            <ShowMoreJobsSkeleton />
          </div>
        ) : featuredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredJobs.slice(0, 6).map((job) => (
              <SingleJob
                key={job.id}
                job={job}
                handleClickedJob={handleClickedFeaturedJob}
              />
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-lg font-semibold">No Jobs Available</p>
          </div>
        )}
        <div className="text-center mt-10">
          <Link href="/findjobs">
            <button className="
            bg-green-500 
        text-white 
        px-4 
        py-2 
        text-lg 
        rounded-md 
        cursor-pointer 
        inline-block 
        mt-2 
        transition 
        duration-300 
        ease-in-out 
        hover:bg-green-600
            ">Show More Jobs</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;