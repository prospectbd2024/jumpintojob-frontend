"use client";
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
  const { allJobs } = useJobContext();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const handleClickedFeaturedJob = (e) => {
     router.push( `/findjobs/jobdetails/${e}`);
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
    <div className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 text-xl font-medium text-gray-700">
          <h2>Featured jobs at Jump Into Job</h2>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-2 gap-6">
            {[...Array(6)].map((_, i) => (
              <JobCardSkeleton key={i} />
            ))}
            <ShowMoreJobsSkeleton />
          </div>
        ) : allJobs.length > 0 ? (
          <div>
            <div className="grid grid-cols-2 gap-6">
              {allJobs.slice(0, 6).map((job) => (
                <SingleJob
                  key={job.id}
                  job={job}
                  clickedJob={handleClickedFeaturedJob}
                  handleClickedJob={handleClickedFeaturedJob}
                />
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/findjobs">
                <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full">
                  Show More Jobs
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h4>No Jobs Available</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedJobs;
