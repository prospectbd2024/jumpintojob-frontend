import { useState, useEffect } from 'react';
import { useApplicationContext } from '@/Contexts/ApplicationContext';
import { useUserContext } from '@/Contexts/UserContext';
import Link from 'next/link';
import { FaUpRightFromSquare } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import './JobDetails.css';  
import JobCardSkeleton from '@/Skeletons/JobCardSkeleton';

const JobDetails = ({ props }) => {
  const { userData } = useUserContext();
  const loginNavigate = useRouter();
  const { job } = props;
  const { isApplied } = useApplicationContext();
  const [loading, setLoading] = useState(true); // State to manage loading state

  useEffect(() => {
    // Simulate data fetching delay
    if(job && Object.keys(job).length>0){
        setLoading(false)
    }else{
        setTimeout(() => {
          setLoading(false); // Set loading to false after a delay (simulating data fetching)
        }, 3000); // Adjust delay time as needed
    }
  }, []);

  const handleApplyJob = () => {
    if (userData) {
      // Use window.open() to open the URL in a new tab
      window.open(`/applyjob/${job.id}`, '_blank');
    } else {
      Swal.fire({
        title: 'User must login before applying!',
        text: 'Do you want to login?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.isConfirmed) {
          loginNavigate.push('/signin');
        }
      });
    }
  };

  // Conditional rendering based on loading state and job existence
  if (loading) {
    return <JobCardSkeleton />;
  } else if (!job) {
    return (
      <div className="job-details">
        <p>No job details available.</p>
      </div>
    );
  } else {
    return (
      <div className="job-details">
        <div className="job-details-content">
          <div className="job-details-header">
            <div className="job-details-header-company">
              <img src={job.image} alt="" />
              <Link href="">{job.company_name}</Link>
            </div>
            <div className="job-details-header-job">
              <div>
                <h2>{job.job_title}</h2>
                <p>{job.address}</p>
              </div>
              {!isApplied(job.id) ? (
                <button onClick={handleApplyJob}>
                  Apply Now <FaUpRightFromSquare />
                </button>
              ) : (
                <button className="applied">Applied </button>
              )}
            </div>
          </div>
          <div className="job-details-main">
            <p>
              <span>Job Type </span>
              {job.availability}
            </p>
            <p>
              <span>Salary </span>
              {job.salary}
            </p>
            <p>
              <span>Educational Requirements </span>
              {job.educational_requirements}
            </p>
            <p>
              <span>Required Experiences </span>
              {job.experience}
            </p>
            <p>
              <span>Job Description </span>
              {job.description}
            </p>
            <p>
              <span>Job Responsibilities </span>
              {job.responsibilities}
            </p>
          </div>
        </div>
      </div>
    );
  }
};

export default JobDetails;
