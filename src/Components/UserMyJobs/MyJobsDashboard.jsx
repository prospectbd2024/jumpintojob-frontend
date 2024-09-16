"use client";
import React, { useState, useEffect } from 'react';
import { HiBriefcase, HiBookmark, HiPhoneIncoming, HiEye, HiMap, HiPhone, HiMail, HiOutlineBookmark } from 'react-icons/hi';
import { FaFacebookF, FaLinkedinIn, FaGithub, FaWhatsappSquare } from 'react-icons/fa';
import Link from 'next/link';

const MyJobDashboard = () => {
    const [userData, setUserData] = useState([]);
    const [dashboardJobs, setDashboardJobs] = useState([]);
    const [isMobileScreen, setIsMobileScreen] = useState(false);

    useEffect(() => {
        fetch('/userprofile.json')
            .then(res => res.json())
            .then(data => setUserData(data));
        
        fetch('/public/employerjobs.json')
            .then(res => res.json())
            .then(data => setDashboardJobs(data));
    }, []);

    useEffect(() => {
        const handleResize = () => setIsMobileScreen(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleClickedJob = (id) => {
        // Handle job click
    };

    return (
        <div>
            <div className="bg-[#f0f0f066] rounded-lg p-8">
                <div className="dashboard-data-items flex justify-between">
                    <div className="data-item applied-item bg-[#660096] text-white rounded-lg p-5 flex items-center gap-5 justify-between w-[180px] h-[80px]">
                        <div>
                            <HiBriefcase className="text-2xl" />
                        </div>
                        <div className="text-right">
                            <h5 className="text-lg font-normal">Applied Jobs</h5>
                            <h4 className="text-2xl">72</h4>
                        </div>
                    </div>
                    <div className="data-item saved-item bg-[#F08200] text-white rounded-lg p-5 flex items-center gap-5 justify-between w-[180px] h-[80px]">
                        <div>
                            <HiBookmark className="text-2xl" />
                        </div>
                        <div className="text-right">
                            <h5 className="text-lg font-normal">Saved Jobs</h5>
                            <h4 className="text-2xl">35</h4>
                        </div>
                    </div>
                    <div className="data-item interview-item bg-[#7c0635] text-white rounded-lg p-5 flex items-center gap-5 justify-between w-[180px] h-[80px]">
                        <div>
                            <HiPhoneIncoming className="text-2xl" />
                        </div>
                        <div className="text-right">
                            <h5 className="text-lg font-normal">Interviews</h5>
                            <h4 className="text-2xl">03</h4>
                        </div>
                    </div>
                    <div className="data-item view-item bg-[#78b100] text-white rounded-lg p-5 flex items-center gap-5 justify-between w-[180px] h-[80px]">
                        <div>
                            <HiEye className="text-2xl" />
                        </div>
                        <div className="text-right">
                            <h5 className="text-lg font-normal">Profile View</h5>
                            <h4 className="text-2xl">11</h4>
                        </div>
                    </div>
                </div>
                <div className="dashboard-stats-and-profile grid grid-cols-3 gap-8 my-8">
                    <div className='dashboard-application-stats bg-white rounded-lg'>
                        {/* Application stats content */}
                    </div>
                    <div className="dashboard-user-profile bg-white p-5 rounded-lg">
                        {userData.map(data => (
                            <React.Fragment key={data.user_id}>
                                <div className="user-profile-main text-center pb-8 mb-2 border-b border-gray-200">
                                    <img src="https://img.freepik.com/free-icon/man_318-677829.jpg" alt="" className="w-1/5 border border-gray-400 p-1 rounded-full" />
                                    <h4 className="mb-1">{data.user_name}</h4>
                                    <p>{data.job_role}</p>
                                    <p className='user-address flex items-center gap-2 text-sm'><HiMap /> {data.user_address}</p>
                                </div>
                                <div className="user-profile-contact p-5">
                                    <p className="flex items-center mb-2"><HiPhone className="mr-2 bg-[#F08200] text-white rounded-full p-1" /> {data.user_phone}</p>
                                    <p className="flex items-center mb-2"><HiMail className="mr-2 bg-[#F08200] text-white rounded-full p-1" /> {data.user_email}</p>
                                    <div className="dashboard-update-profile-btn mt-8">
                                        <Link href="/userprofile/aboutme">
                                            <button className="w-[140px] h-[40px] font-bold bg-[#F08200] text-white rounded-md cursor-pointer">Update Profile</button>
                                        </Link>
                                    </div>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
                <div className="dashboard-featuredjobs-and-social-contacts grid grid-cols-3 gap-8">
                    <div className="dashboard-jobs bg-white rounded-lg p-5">
                        <h4 className="font-medium text-2xl text-[#061421] mb-6">Recent Jobs</h4>
                        <div className='dashboard-jobs-content'>
                            {dashboardJobs.slice(0, 3).map(job => (
                                <div className={`single-job dashboard-job border-b border-gray-300 pb-5`} key={job.id}>
                                    <div className="single-job-header flex justify-between">
                                        <h2 className="text-xl">{job.job_title}</h2>
                                        <HiOutlineBookmark className="text-xl" />
                                    </div>
                                    <h3 className="text-lg">{job.company_name}</h3>
                                    <p>{job.address}</p>
                                    <p>{job.description.slice(0, 100)}...</p>
                                    <div className="single-job-bottom flex justify-between">
                                        <p className='single-job-salary text-lg'>{job.salary} <span className="text-sm">(Estimated)</span></p>
                                        <p className='posting-date text-sm'>22d</p>
                                    </div>
                                    <Link onClick={() => handleClickedJob(job.id)} href={isMobileScreen ? `/jobdetailsres/${job.id}` : `/jobs/jobdetails/${job.id}`} className="text-blue-500 underline">View Details</Link>
                                </div>
                            ))}
                        </div>
                        <div className="dashboard-viewmorejobs-btn text-center mt-10">
                            <Link href="/jobs">
                                <button className="w-[140px] h-[40px] bg-transparent border border-[#F08200] rounded-md font-bold text-[#F08200]">View More</button>
                            </Link>
                        </div>
                    </div>
                    <div className="dashboard-social-resume flex flex-col gap-6">
                        <div className="dashboard-social bg-white p-5 rounded-lg">
                            <h4 className="font-medium text-2xl mb-6 text-[#061421]">Social Contacts</h4>
                            <ul>
                                <li className='facebook-social bg-[#3498db33] p-3 rounded-md mb-4 flex items-center gap-6 hover:bg-[#1877F2]'>
                                    <Link href="">
                                        <FaFacebookF className="text-xl text-[#1877F2] hover:text-white" /> /kazisolah114
                                    </Link>
                                </li>
                                <li className='linkedin-social bg-[#3498db33] p-3 rounded-md mb-4 flex items-center gap-6 hover:bg-[#0063C2]'>
                                    <Link href="">
                                        <FaLinkedinIn className="text-xl text-[#0063C2] hover:text-white" /> /kazisolah114
                                    </Link>
                                </li>
                                <li className='github-social bg-[#3498db33] p-3 rounded-md mb-4 flex items-center gap-6 hover:bg-[#000000]'>
                                    <Link href="">
                                        <FaGithub className="text-xl text-[#181212] hover:text-white" /> /kazisolah114
                                    </Link>
                                </li>
                                <li className='whatsapp-social bg-[#3498db33] p-3 rounded-md mb-4 flex items-center gap-6 hover:bg-[#00a11d]'>
                                    <Link href="">
                                        <FaWhatsappSquare className="text-xl text-[#00ff1a] hover:text-[#00ff62]" /> /kazisolah114
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyJobDashboard;
