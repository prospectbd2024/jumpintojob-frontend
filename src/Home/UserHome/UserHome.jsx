import React from 'react';
import './UserHome.css';
import { useUserContext } from '../../Contexts/UserContext';
import { useMediaQuery } from '@uidotdev/usehooks';
import FeaturedJobs from './FeaturedJobs';
import UserProfile from './UserProfile';
import { useJobContext } from '@/Contexts/JobContext';
import { useCompanyContext } from '@/Contexts/CompanyContext';
import Companies from './FeaturedCompanies';

const UserHome = () => {
  const { setClickedFeaturedJob, profile } = useUserContext();
  const { allJobs } = useJobContext(); // Assuming you have a JobContext
  const { companies } = useCompanyContext(); // Assuming you have a CompanyContext

  // Simulating client-side check
  let isClient = false;
  setInterval(() => {
    isClient = true;
  }, 1000);

  // Check for mobile screen using useMediaQuery hook
  const isMobileScreen = isClient ? useMediaQuery("only screen and (max-width : 1368px)") : false;
  useJobContext()
  const handleClickedFeaturedJob = (jobId) => {
    setClickedFeaturedJob(jobId);
    console.log(jobId);
  };

  return (
    <div className='user-home'>
      <div className="user-home-content container">
        <Companies props={{ companies }} />
        <FeaturedJobs
          allJobs={allJobs}
          isMobileScreen={isMobileScreen}
          handleClickedFeaturedJob={handleClickedFeaturedJob}
        />
        <UserProfile profile={profile} />
      </div>
    </div>
  );
};

export default UserHome;
