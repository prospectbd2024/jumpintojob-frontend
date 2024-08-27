import {useState, useEffect} from 'react';
import {useApplicationContext} from '@/Contexts/ApplicationContext';
import {useUserContext} from '@/Contexts/UserContext';
import Link from 'next/link';
import {FaUpRightFromSquare} from 'react-icons/fa6';
import {useRouter} from 'next/navigation';
import Swal from 'sweetalert2';
import JobCardSkeleton from '@/Skeletons/JobCardSkeleton';
import {FaBriefcase, FaCalendarAlt, FaDollarSign} from "react-icons/fa";

const JobDetails = ({props}) => {
    const {userData} = useUserContext();
    const loginNavigate = useRouter();
    const {job} = props;
    const {isApplied} = useApplicationContext();
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
        guestProtection(() => {
            window.open(`/applyjob/${job.id}`, '_blank');
        });
    };

    if (loading) {
        return (
            <div className="sticky top-14">
                <div className="w-full max-w-screen-md sm:max-w-screen-lg md:max-w-screen-xl lg:max-w-screen-2xl mx-auto bg-white shadow-lg rounded-lg border border-gray-200">
                    <JobCardSkeleton/>
                </div>
            </div>
        );
    } else {
        return (
            <div className="sticky top-14">
                <div
                    className="w-full max-w-screen-md sm:max-w-screen-lg md:max-w-screen-xl lg:max-w-screen-2xl mx-auto bg-white shadow-lg rounded-lg border border-gray-200">

                    {/* Header Section */}
                    <div className="relative bg-white shadow-md border-b border-gray-200 overflow-hidden">
                        {/* Header Content */}
                        <div className="relative p-2 sm:p-4 md:p-6 lg:p-8">
                            {/* Cover Image */}
                            <div className="absolute inset-0 z-0 overflow-hidden">
                                <img
                                    src={job.cover_image}
                                    alt="Cover Image"
                                    className="absolute top-0 right-0 w-full h-full object-cover"
                                    style={{clipPath: 'polygon(45% 0px, 100% 0px, 100% 100%, 57% 100%)'}}
                                />
                                <div
                                    className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent opacity-60"></div>
                            </div>

                            {/* Header Information */}
                            <div
                                className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-2">
                                {/* Logo and Job Info */}
                                <div className="flex flex-col flex-grow">
                                    <div className="flex items-center gap-2 sm:gap-4 mb-2">
                                        <div
                                            className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-lg overflow-hidden bg-gray-200">
                                            <img src={job.image} alt={job.company_name}
                                                 className="object-contain w-full h-full"/>
                                        </div>
                                        <div className="flex flex-col">
                                            <Link href="#"
                                                  className="text-xs sm:text-sm font-semibold text-blue-600 hover:underline">{job.company_name}</Link>
                                            <h2 className="text-sm sm:text-lg font-bold text-gray-800 mb-1">{job.job_title}</h2>
                                            <p className="text-xs sm:text-sm text-gray-600">{job.address}</p>
                                        </div>
                                    </div>

                                    {/* Job Details */}
                                    <div className="flex flex-col sm:flex-row text-xs sm:text-sm text-gray-600">
                    <span className="flex items-center ml-1 mb-1">
                        <FaBriefcase className="text-gray-500 mr-1"/>
                        <span>{job.availability}</span>
                    </span>
                                        <span className="flex items-center ml-1 mb-1">
                        <FaDollarSign className="text-gray-500"/>
                        <span>{job.salary}</span>
                    </span>
                                        <span className="flex items-center ml-1 mb-1">
                        <FaCalendarAlt className="text-gray-500 mr-1"/>
                        <span>{job.job_type}</span>
                    </span>
                                    </div>
                                </div>
                            </div>
                            {/* Apply Button */}
                            <div className="flex items-center">
                                <button
                                    className={`w-full sm:w-auto h-10 px-4 py-2 text-xs sm:text-base font-bold rounded-lg flex items-center justify-center gap-2 transition-all duration-300 ${
                                        !isApplied(job.id)
                                            ? 'bg-green-500 text-white hover:bg-green-600 active:bg-green-700'
                                            : 'bg-gray-500 text-white cursor-not-allowed'
                                    }`}
                                    disabled={isApplied(job.id)}
                                >
                                    {isApplied(job.id) ? 'Applied' : 'Apply Now'}
                                    <FaUpRightFromSquare
                                        className={`w-4 h-4 ${!isApplied(job.id) ? 'text-white' : 'text-gray-300'}`}/>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Job Details Section */}
                    <div className="p-4 sm:p-6 md:p-8 lg:p-10 space-y-4 sm:space-y-6 overflow-y-auto"
                         style={{maxHeight: 'calc(100vh - 17rem)'}}>
                        <div className="text-xs sm:text-sm md:text-base">
                            <div className="mb-2">
                                <h3 className="font-medium text-gray-800 mb-1">Job Type</h3>
                                <p className="text-gray-600 leading-tight">{job.availability}</p>
                            </div>
                            <div className="mb-2">
                                <h3 className="font-medium text-gray-800 mb-1">Salary</h3>
                                <p className="text-gray-600 leading-tight">{job.salary}</p>
                            </div>
                            <div className="mb-2">
                                <h3 className="font-medium text-gray-800 mb-1">Educational Requirements</h3>
                                <p className="text-gray-600 leading-tight">{job.educational_requirements}</p>
                            </div>
                            <div className="mb-2">
                                <h3 className="font-medium text-gray-800 mb-1">Required Experiences</h3>
                                <p className="text-gray-600 leading-tight">{job.experience}</p>
                            </div>
                            <div className="mb-2">
                                <h3 className="font-medium text-gray-800 mb-1">Job Description</h3>
                                <p className="text-gray-600 leading-tight">{job.description}</p>
                            </div>
                            <div className="mb-2">
                                <h3 className="font-medium text-gray-800 mb-1">Job Responsibilities</h3>
                                <p className="text-gray-600 leading-tight">{job.responsibilities}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default JobDetails;
