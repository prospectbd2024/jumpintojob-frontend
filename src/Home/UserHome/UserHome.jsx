import React, { useEffect } from "react";
import { useUserContext } from "../../Contexts/UserContext";
import FeaturedJobsList from "./FeaturedJobs"; 
import { useJobContext } from "@/Contexts/JobContext";
import { useCompanyContext } from "@/Contexts/CompanyContext";
import { useRouter } from "next/navigation";
import FeaturedCompanies from "./FeaturedCompanies";

const UserHome = () => {
  const { setClickedFeaturedJob } = useUserContext();
  const {featuredJobs} = useJobContext();  
  const router = useRouter();
  let isClient = false;

  useEffect(() => {
    setTimeout(() => {
      isClient = true;
    }, 1000);
  }, []);

  const handleClickedFeaturedJob = (jobId) => {
    setClickedFeaturedJob(jobId);
    router.push("/jobs/jobdetails/" + jobId);
  };

  return (
    <div className="mt-5 mb-12">
      <div className="container mx-auto px-4">
        <FeaturedJobsList
          className="flex-grow"
          jobClassName="grid grid-cols-1 lg:grid-cols-2 gap-4" 
          allJobs={featuredJobs}
          handleClickedFeaturedJob={handleClickedFeaturedJob}
        />
        <FeaturedCompanies isLoggedIn={true} className="" />
  
      </div>
    </div>
  );
};

export default UserHome;