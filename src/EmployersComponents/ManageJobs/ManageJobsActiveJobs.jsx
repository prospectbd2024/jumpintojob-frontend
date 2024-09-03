"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { HiOutlineBriefcase, HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import ViewApplicants from './ViewApplicants';

const ManageJobsActiveJobs = () => {
    const [activeJobs, setActiveJobs] = useState([]);
    const [applicants, setApplicants] = useState([]);
    const [job, setJob] = useState(null);
    const [showViewApplicants, setShowViewApplicants] = useState(false);

    useEffect(() => {
        fetch('/public/employerjobs.json')
            .then(res => res.json())
            .then(data => {
                const filterActiveJobs = data.filter(job => job.status === "active");
                setActiveJobs(filterActiveJobs);
            });
    }, []);

    const handleViewApplicants = (job) => {
        setApplicants(job.applicants);
        setJob(job);
        setShowViewApplicants(true);
    };

    return (
        <>
            {showViewApplicants ? (
                <div className='absolute top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center'>
                    <ViewApplicants
                        applicants={applicants}
                        setShowViewApplicants={setShowViewApplicants}
                        job={job}
                    />
                </div>
            ) : (
                <div className='bg-gray-100 rounded-lg p-6'>
                    <div className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-teal-500 p-4 rounded-t-lg">
                        <HiOutlineBriefcase className="text-white text-xl" />
                        <h2 className="text-white text-lg font-semibold">Active Jobs</h2>
                    </div>
                    <div className="mt-6">
                        <ul className='grid grid-cols-8 gap-2 text-gray-800 font-medium'>
                            <li></li>
                            <li>Job Title</li>
                            <li>Date Posted</li>
                            <li>Status</li>
                            <li>Applications</li>
                            <li>View Applicants</li>
                            <li>Job Details</li>
                            <li>Actions</li>
                        </ul>

                        {activeJobs.map((item, index) => (
                            <ul key={item.id} className='grid grid-cols-8 gap-2 bg-white rounded-lg p-4 mb-4 shadow-md'>
                                <li className='bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center'>{index + 1}</li>
                                <li>{item.job_title}</li>
                                <li>{item.date_posted}</li>
                                <li className={`px-2 py-1 rounded-full text-white ${item.status === "active" ? "bg-green-500" : "bg-red-500"}`}>
                                    {item.status}
                                </li>
                                <li>{item.applications}</li>
                                <li>
                                    <button
                                        onClick={() => handleViewApplicants(item)}
                                        className='bg-green-500 text-white px-4 py-1 rounded-full hover:bg-green-600'
                                    >
                                        View Applicants
                                    </button>
                                </li>
                                <li>
                                    <Link href="#">
                                        <button className='bg-blue-500 text-white px-4 py-1 rounded-full hover:bg-blue-600'>
                                            Job Details
                                        </button>
                                    </Link>
                                </li>
                                <li className='flex gap-2'>
                                    <button className='bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-600'>
                                        <HiOutlinePencilAlt className='text-lg' />
                                    </button>
                                    <button className='bg-red-500 text-white p-2 rounded-full hover:bg-red-600'>
                                        <HiOutlineTrash className='text-lg' />
                                    </button>
                                </li>
                            </ul>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default ManageJobsActiveJobs;
