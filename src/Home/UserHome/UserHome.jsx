import React, { useEffect } from "react";
import { useUserContext } from "../../Contexts/UserContext";
import FeaturedJobsList from "./FeaturedJobs";// Updated import path
import UserProfile from "./UserProfile";
import { useJobContext } from "@/Contexts/JobContext";
import { useCompanyContext } from "@/Contexts/CompanyContext";
import { useRouter } from "next/navigation";
import FeaturedCompanies from "./FeaturedCompanies";

const UserHome = () => {
  const { setClickedFeaturedJob, profile } = useUserContext();
  const { allJobs } = useJobContext(); // Assuming you have a JobContext
  const { companies } = useCompanyContext(); // Assuming you have a CompanyContext
  const router = useRouter();
  let isClient = false;

  useEffect(() => {
    setTimeout(() => {
      isClient = true;
    }, 1000);
  }, []);

  const handleClickedFeaturedJob = (jobId) => {
    setClickedFeaturedJob(jobId);
    router.push("/findjobs/jobdetails/" + jobId);
  };

  return (
    <div className="mt-5 mb-12">
      <div className="container mx-auto px-4">
        <FeaturedJobsList
          className="flex-grow"
          jobClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" // Responsive grid layout
          allJobs={allJobs}
          handleClickedFeaturedJob={handleClickedFeaturedJob}
        />
        <FeaturedCompanies isLoggedIn={true} className="" />
        {/* <UserProfile profile={profile} /> */}
      </div>
    </div>
  );
};

export default UserHome;