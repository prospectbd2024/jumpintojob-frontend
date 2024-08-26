import { useState, useEffect } from 'react';
import { useApplicationContext } from '@/Contexts/ApplicationContext';
import { useUserContext } from '@/Contexts/UserContext';
import Link from 'next/link';
import { FaUpRightFromSquare } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import JobCardSkeleton from '@/Skeletons/JobCardSkeleton';

const JobDetails = ({ props }) => {
  const { userData } = useUserContext();
  const loginNavigate = useRouter();
  const { job } = props;
  const { isApplied } = useApplicationContext();
  const [loading, setLoading] = useState(true);
  const {guestProtection} = useUserContext();
  useEffect(() => {
    if (job && Object.keys(job).length > 0) {
      setLoading(false);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  }, [job]);

  const handleApplyJob = () => {
    guestProtection(()=>{
      window.open(`/applyjob/${job.id}`, '_blank');
    })
 
  };

  if (loading) {
    return <JobCardSkeleton />;
  } else if (!job) {
    return (
      <div className="p-4 border border-gray-300 rounded-lg h-auto overflow-auto">
        <p>No job details available.</p>
      </div>
    );
  } else {
    return (
      <div className="p-4 border border-gray-300 rounded-lg h-auto overflow-auto">
        <div className="sticky top-0 z-10 bg-white">
          <div className="mb-5 border-b border-gray-200 pb-5 shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-48 h-24 flex items-center justify-center">
                <img 
                  src={job.image} 
                  alt={job.company_name} 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <Link href="#" className="text-lg text-darker-secondary-color hover:underline">{job.company_name}</Link>
            </div>
            <div className="flex justify-around items-center">
              <div className='ml-[-100px]'>
                <h2 className="text-2xl text-darker-secondary-color mb-1">{job.job_title}</h2>
                <p className="text-lg text-gray-500">{job.address}</p>
              </div>
              {!isApplied(job.id) ? (
                <button onClick={handleApplyJob} className="w-[190px] h-[50px] text-lg font-bold bg-green-500 border-none rounded-lg text-white flex items-center justify-center gap-2 transition-transform hover:bg-green-600">
                  Apply Now <FaUpRightFromSquare />
                </button>
              ) : (
                <button className="w-[190px] h-[50px] text-lg font-bold bg-gray-500 border-none rounded-lg text-white flex items-center justify-center gap-2 cursor-not-allowed">
                  Applied
                </button>
              )}
            </div>
          </div>
        </div>
    
        <div className="px-1 flex flex-col gap-y-4">
          <div className="text-lg mb-4 text-gray-500">
            <h3 className="font-bold text-darker-secondary-color">Job Type</h3> {job.availability}
          </div>
          <div className="text-lg mb-4 text-gray-500">
            <h3 className="font-bold text-darker-secondary-color">Salary</h3> {job.salary}
          </div>
          <div className="text-lg mb-4 text-gray-500">
            <h3 className="font-bold text-darker-secondary-color">Educational Requirements</h3> {job.educational_requirements}
          </div>
          <div className="text-lg mb-4 text-gray-500">
            <h3 className="font-bold text-darker-secondary-color">Required Experiences</h3> {job.experience}
          </div>
          <div className="text-lg mb-4 text-gray-500">
            <h3 className="font-bold text-darker-secondary-color">Job Description</h3> {job.description}
          </div>
          <div className="text-lg mb-4 text-gray-500">
            <h3 className="font-bold text-darker-secondary-color">Job Responsibilities</h3> {job.responsibilities}
          </div>
        </div>
       

      </div>
    );
  }
};

export default JobDetails;