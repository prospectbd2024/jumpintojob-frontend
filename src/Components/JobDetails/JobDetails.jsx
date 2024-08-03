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
    if (userData) {
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

  if (loading) {
    return <JobCardSkeleton />;
  } else if (!job) {
    return (
      <div className="p-4 border border-gray-300 rounded-lg h-[80vh] overflow-auto sticky top-24">
        <p>No job details available.</p>
      </div>
    );
  } else {
    return (
      <div className="p-4 border border-gray-300 rounded-lg h-[80vh] overflow-auto sticky top-24">
        <div className="mb-5 border-b border-gray-200 pb-5 bg-white shadow-lg sticky top-[-15px]">
          <div className="flex items-center gap-4 mb-4">
            <img src={job.image} alt={job.company_name} className="w-48 h-24 p-2 rounded border border-gray-300" />
            <Link href="#" className="text-lg text-darker-secondary-color hover:underline">{job.company_name}</Link>
          </div>
          <div className="flex justify-between items-center">
            <div>
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
        <div className="px-1">
          <p className="text-lg mb-4 text-gray-500">
            <span className="font-bold text-darker-secondary-color">Job Type</span> {job.availability}
          </p>
          <p className="text-lg mb-4 text-gray-500">
            <span className="font-bold text-darker-secondary-color">Salary</span> {job.salary}
          </p>
          <p className="text-lg mb-4 text-gray-500">
            <span className="font-bold text-darker-secondary-color">Educational Requirements</span> {job.educational_requirements}
          </p>
          <p className="text-lg mb-4 text-gray-500">
            <span className="font-bold text-darker-secondary-color">Required Experiences</span> {job.experience}
          </p>
          <p className="text-lg mb-4 text-gray-500">
            <span className="font-bold text-darker-secondary-color">Job Description</span> {job.description}
          </p>
          <p className="text-lg mb-4 text-gray-500">
            <span className="font-bold text-darker-secondary-color">Job Responsibilities</span> {job.responsibilities}
          </p>
        </div>
      </div>
    );
  }
};

export default JobDetails;
