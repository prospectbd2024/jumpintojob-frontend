"use client";
import React, { useEffect, useState } from "react";
import { HiOutlineArrowNarrowRight, HiOutlineBookmark, HiOutlineCursorClick } from "react-icons/hi";
import Link from "next/link";
import "./FeaturedJobs.css";
import { FaUpRightFromSquare } from "react-icons/fa6";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useUserContext } from "../../Contexts/UserContext";
import { useJobContext } from "@/Contexts/JobContext";
import { useCompanyContext } from "@/Contexts/CompanyContext";
import SingleJob from "@/Components/AllJobs/SingleJob";
import ShowMoreJobsSkeleton from "@/Skeletons/ShowMoreJobsSkeleton";
import JobCardSkeleton from "@/Skeletons/JobCardSkeleton";
const FeaturedJobs = () => {
  const { setClickedFeaturedJob } = useUserContext();
  const { allJobs, setAllJobs } = useJobContext();
  const [isLoading, setIsLoading] = useState(true);

  const handleClickedFeaturedJob = (e) => {
    setClickedFeaturedJob(e);
  };
  useEffect(() => {
    if (allJobs && allJobs.length > 0) {
      setIsLoading(false);
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  }, []);
  if (isLoading) {
    return (
      <div className="featured-jobs-section">
        <div className="featured-jobs-content container">
          <div className="featured-jobs-header section-header">
            <h2>Featured jobs at Jump Into Job</h2>
          </div>
          <div className="featured-jobs-items all-jobs-container">
            <JobCardSkeleton />
            <JobCardSkeleton />
            <JobCardSkeleton />
            <JobCardSkeleton />
            <JobCardSkeleton />
            <JobCardSkeleton />
          </div>
          <ShowMoreJobsSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="featured-jobs-section">
      <div className="featured-jobs-content container">
        <div className="featured-jobs-header section-header">
          <h2>Featured jobs at Jump Into Job</h2>
        </div>
        {allJobs.length > 0 ? (
          <div>
            <div className="featured-jobs-items all-jobs-container">
              {allJobs.slice(0, 6).map((job) => (
                <SingleJob job={job} clickedJob={handleClickedFeaturedJob} handleClickedJob={handleClickedFeaturedJob} />
              ))}
            </div>
            <div className="featured-jobs-show-more-btn">
              <button>
                <Link href="/findjobs">Show More Jobs</Link>
              </button>
            </div>
          </div>
        ) : (
          <div className="no-jobs-available">
            <h4 className="">No Jobs Available</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedJobs;
