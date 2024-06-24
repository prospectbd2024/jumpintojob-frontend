import React from 'react';
import './UserHome.css';
import { useUserContext } from '../../Contexts/UserContext';
import { useMediaQuery } from '@uidotdev/usehooks';
import FeaturedJobs from './FeaturedJobs';
import UserProfile from './UserProfile';
import { useJobContext } from '@/Contexts/JobContext';
import { useCompanyContext } from '@/Contexts/CompanyContext';
import Companies from './FeaturedCompanies';
import {useRouter} from 'next/navigation';
const UserHome = () => {
  const { setClickedFeaturedJob, profile } = useUserContext();
  const { allJobs } = useJobContext(); // Assuming you have a JobContext
  const { companies } = useCompanyContext(); // Assuming you have a CompanyContext
  const router= useRouter();
  // Simulating client-side check
  let isClient = false;
  setInterval(() => {
    isClient = true;
  }, 1000);
 
 
  useJobContext()
  const handleClickedFeaturedJob = (jobId) => {
    setClickedFeaturedJob(jobId);
    router.push("/findjobs/jobdetails/"+jobId);
  };

  return (
    <div className='user-home'>
      <div className="user-home-content container">
        <Companies props={{ companies }} />
        <FeaturedJobs
          allJobs={allJobs}
       
          handleClickedFeaturedJob={handleClickedFeaturedJob}
        />
        <UserProfile profile={profile} />
      </div>
    </div>
  );
};

export default UserHome;
