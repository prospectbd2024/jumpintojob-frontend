"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApplicationContext } from "@/Contexts/ApplicationContext";
import { useUserContext } from "@/Contexts/UserContext";
import Link from "next/link";
import { FaUpRightFromSquare } from "react-icons/fa6";
import { FaBriefcase, FaCalendarAlt, FaDollarSign } from "react-icons/fa";
import { useJobContext } from "@/Contexts/JobContext";
import JobDetailsSkeleton from "@/Skeletons/JobDetailsSkeleton";
import dynamic from "next/dynamic"; 

const ApplyJob = dynamic(() => import("../ApplyJob/ApplyJob"), {
  loading: () => <p>Loading application form...</p>,
  ssr: false,
});

const JobDetails = ({ props }) => {
  const router = useRouter();
  const { job } = props;
  const { isApplied, handleApplyJob } = useApplicationContext();
  const { guestProtection } = useUserContext();
  const { Loading } = useJobContext();

  if (Loading) {
    return (
      <div className="sticky top-14">
        <JobDetailsSkeleton />
      </div>
    );
  }

  return (
    <div className="relative bg-white shadow-md border-b border-gray-200 overflow-hidden sm:mx-0 md:mx-0 lg:mx-0 xl:mx-0">
      {/* Header Content */} 
      <div className="relative pb-1 py-2 pt-2 sm:p-4 md:p-6 lg:pt-8">
        {/* Cover Image */}
        {job.cover_image && (
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src={job.cover_image}
              alt="Cover Image"
              className="absolute top-0 right-0 w-full h-full object-cover"
              style={{ clipPath: "polygon(45% 0px, 100% 0px, 100% 100%, 57% 100%)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent opacity-60"></div>
          </div>
        )}

        {/* Header Information */}
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-2">
          {/* Logo and Job Info */}
          <div className="flex flex-col flex-grow">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-16 h-16 flex items-center justify-center rounded-lg overflow-hidden bg-transparent">
                <img src={job.image} alt={job.company_name} className="object-contain w-full h-full" />
              </div>

              <div className="flex flex-col">
                <Link href="#" className="text-sm font-semibold text-blue-600 hover:underline">
                  {job.company_name}
                </Link>
                <h2 className="text-lg font-bold text-gray-800 mb-1">{job.job_title}</h2>
                <p className="text-sm text-gray-600">{job.address}</p>
              </div>
            </div>

            {/* Job Details */}
            <div className="flex flex-col sm:flex-row text-sm text-gray-600 gap-2">
              <span className="flex items-center mb-1">
                <FaBriefcase className="text-gray-500 mr-1" />
                <span>{job.availability}</span>
              </span>
              <span className="flex items-center mb-1">
                <FaDollarSign className="text-gray-500 mr-1" />
                <span>{job.salary}</span>
              </span>
              <span className="flex items-center mb-1">
                <FaCalendarAlt className="text-gray-500 mr-1" />
                <span>{job.job_type}</span>
              </span>
            </div>
          </div>
        </div>
        {/* Apply Button */}
        <div className="flex items-center relative z-50">
          <button
            type="button"
            onClick={()=>handleApplyJob(job)}
            disabled={isApplied(job.id)}
            className={`text-white  ${isApplied(job.id)?"bg-gray-600 hover:bg-gray-700 disabled:cursor-not-allowed":"bg-blue-600 hover:bg-blue-700"}focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 inline-flex items-center`}>
            {isApplied(job.id) ? "Applied" : "Apply Now"}
            <FaUpRightFromSquare className={`w-4 h-4 ml-2 ${!isApplied(job.id) ? "text-white" : "hidden"}`} />
          </button>
        </div>
      </div>

      {/* Job Details Section */}
      <div className="p-4 sm:p-6 md:p-8 lg:p-10 space-y-4 overflow-y-auto" style={{ maxHeight: "calc(100vh - 18rem)" }}>
        <div className="text-sm md:text-base">
          <div className="mb-4">
            <h3 className="font-medium text-gray-800 mb-1">Job Type</h3>
            <p className="text-gray-600 leading-tight">{job.availability}</p>
          </div>
          <div className="mb-4">
            <h3 className="font-medium text-gray-800 mb-1">Salary</h3>
            <p className="text-gray-600 leading-tight">{job.salary}</p>
          </div>
          <div className="mb-4">
            <h3 className="font-medium text-gray-800 mb-1">Educational Requirements</h3>
            <p className="text-gray-600 leading-tight">{job.educational_requirements}</p>
          </div>
          <div className="mb-4">
            <h3 className="font-medium text-gray-800 mb-1">Required Experiences</h3>
            <p className="text-gray-600 leading-tight">{job.experience}</p>
          </div>
          <div className="mb-4">
            <h3 className="font-medium text-gray-800 mb-1">Job Description</h3>
            <p className="text-gray-600 leading-tight">{job.description}</p>
          </div>
          <div className="mb-4">
            <h3 className="font-medium text-gray-800 mb-1">Job Responsibilities</h3>
            <p className="text-gray-600 leading-tight">{job.responsibilities}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
