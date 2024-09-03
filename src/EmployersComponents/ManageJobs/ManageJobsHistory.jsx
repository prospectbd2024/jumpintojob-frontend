"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { HiOutlineBriefcase, HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import ViewApplicants from './ViewApplicants';

const ManageJobsHistory = () => {
    const [employerJobs, setEmployerJobs] = useState([]);
    const [applicants, setApplicants] = useState([]);
    const [job, setJob] = useState(null); // Changed to null for clarity
    const [showViewApplicants, setShowViewApplicants] = useState(false);

    useEffect(() => {
        fetch('/employerjobs.json') // Adjusted path assuming it's in the public folder
            .then(res => res.json())
            .then(data => setEmployerJobs(data))
            .catch(error => console.error("Error fetching jobs:", error));
    }, []);

    const handleViewApplicants = (job) => {
        setApplicants(job.applicants || []); // Ensure applicants is always an array
        setShowViewApplicants(true);
        setJob(job);
    };

    return (
        <>
            {showViewApplicants ? (
                <div className='fixed inset-0 bg-white bg-opacity-90 z-50 flex items-center justify-center'>
                    <ViewApplicants applicants={applicants} setShowViewApplicants={setShowViewApplicants} job={job} />
                </div>
            ) : (
                <div className='bg-gray-100 p-6 rounded-lg shadow-md'>
                    <div className='flex items-center gap-2 w-[180px] justify-center bg-gradient-to-r from-primary to-teal-400 p-3 rounded-t-lg'>
                        <HiOutlineBriefcase className='text-white text-xl' />
                        <h2 className='text-white text-lg'>Jobs History</h2>
                    </div>
                    <div className='p-6'>
                        <div className='overflow-x-auto'>
                            <ul className='grid grid-cols-[40px_179px_115px_90px_105px_150px_110px_100px] gap-2 mb-5 p-2 border-b border-gray-300'>
                                <li></li>
                                <li>Job Title</li>
                                <li>Date Posted</li>
                                <li>Status</li>
                                <li>Applications</li>
                                <li>View Applicants</li>
                                <li>Job Details</li>
                                <li>Actions</li>
                            </ul>

                            {employerJobs.map((item, index) => (
                                <ul key={item.id} className='grid grid-cols-[40px_179px_115px_90px_105px_150px_110px_100px] gap-2 bg-white mb-2 p-2 rounded-lg shadow-sm'>
                                    <li className='bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center'>{index + 1}</li>
                                    <li>{item.job_title}</li>
                                    <li>{item.date_posted}</li>
                                    <li className={`px-2 py-1 rounded-full text-white ${item.status === "active" ? "bg-green-500" : "bg-red-500"}`}>{item.status}</li>
                                    <li>{item.applications}</li>
                                    <Link href="#">
                                        <a>
                                            <button onClick={() => handleViewApplicants(item)} className='bg-primary text-white py-1 px-4 rounded-full font-semibold'>View Applicants</button>
                                        </a>
                                    </Link>
                                    <Link href="#">
                                        <a>
                                            <button className='bg-primary text-white py-1 px-4 rounded-full font-semibold'>Job Details</button>
                                        </a>
                                    </Link>
                                    <div className='flex items-center gap-2'>
                                        <button className='bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-green-600 transition'>
                                            <HiOutlinePencilAlt className='text-xl' />
                                        </button>
                                        <button className='bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition'>
                                            <HiOutlineTrash className='text-xl' />
                                        </button>
                                    </div>
                                </ul>
                            )
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ManageJobsHistory;
