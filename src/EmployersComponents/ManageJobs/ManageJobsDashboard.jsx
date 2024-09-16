"use client";
import React, { useState, useEffect } from 'react';
import { HiBookmark, HiBriefcase, HiEye, HiMail, HiMap, HiPhone, HiPhoneIncoming } from 'react-icons/hi';
import Link from 'next/link';
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";

const ManageJobsDashboard = () => {
    const [userData, setUserData] = useState([]);
    useEffect(() => {
        fetch('/userprofile.json')
            .then(res => res.json())
            .then(data => setUserData(data))
    }, []);

    const [mostAppliedJobs, setMostAppliedJobs] = useState([]);
    useEffect(() => {
        fetch('/public/employerjobs.json')
            .then(res => res.json())
            .then(data => {
                const mostApplied = data.slice().sort((a, b) => b.applications - a.applications);
                setMostAppliedJobs(mostApplied);
            });
    }, []);
    
    return (
        <div className="bg-gray-100 p-6">
            <div className="bg-gray-200 rounded-lg p-8">
                {/* Dashboard Data Items */}
                <div className="flex justify-between mb-8">
                    {/* Jobs Posted */}
                    <div className="flex items-center gap-5 bg-purple-800 text-white rounded-md p-5 w-44 h-20">
                        <HiBriefcase className="text-2xl" />
                        <div>
                            <h5 className="text-sm">Jobs Posted</h5>
                            <h4 className="text-lg font-semibold">72</h4>
                        </div>
                    </div>
                    {/* Active Jobs */}
                    <div className="flex items-center gap-5 bg-orange-600 text-white rounded-md p-5 w-44 h-20">
                        <HiBookmark className="text-2xl" />
                        <div>
                            <h5 className="text-sm">Active Jobs</h5>
                            <h4 className="text-lg font-semibold">35</h4>
                        </div>
                    </div>
                    {/* Interview */}
                    <div className="flex items-center gap-5 bg-red-800 text-white rounded-md p-5 w-44 h-20">
                        <HiPhoneIncoming className="text-2xl" />
                        <div>
                            <h5 className="text-sm">Interview</h5>
                            <h4 className="text-lg font-semibold">09</h4>
                        </div>
                    </div>
                    {/* Shortlisted */}
                    <div className="flex items-center gap-5 bg-green-600 text-white rounded-md p-5 w-44 h-20">
                        <HiEye className="text-2xl" />
                        <div>
                            <h5 className="text-sm">Shortlisted</h5>
                            <h4 className="text-lg font-semibold">19</h4>
                        </div>
                    </div>
                </div>

                {/* Dashboard Stats and Profile */}
                <div className="grid grid-cols-2 gap-8 my-8">
                    {/* Application Stats */}
                    <div className="bg-white rounded-lg p-6">
                        <h5>Application Stats Will Be Added Here</h5>
                    </div>
                    {/* User Profile */}
                    <div className="bg-white rounded-lg p-6">
                        {userData.map(data => (
                            <div key={data.id}>
                                <div className="text-center pb-6 mb-2 border-b border-gray-200">
                                    <img src="https://img.freepik.com/free-icon/man_318-677829.jpg" alt="" className="w-20 border border-gray-400 p-1 rounded-full mx-auto" />
                                    <h4 className="mb-1 text-lg font-semibold">{data.user_name}</h4>
                                    <p className="mb-2 text-sm">{data.job_role}</p>
                                    <p className="flex items-center mb-2 text-sm text-gray-700">
                                        <HiMap className="text-primary mr-1" /> {data.user_address}
                                    </p>
                                </div>
                                <div className="p-6">
                                    <p className="flex items-center mb-2 text-sm text-gray-700">
                                        <HiPhone className="mr-2 bg-orange-600 text-white rounded-full p-1" /> {data.user_phone}
                                    </p>
                                    <p className="flex items-center mb-2 text-sm text-gray-700">
                                        <HiMail className="mr-2 bg-orange-600 text-white rounded-full p-1" /> {data.user_email}
                                    </p>
                                    <div className="text-center">
                                        <Link href="/userprofile/aboutme">
                                            <button className="w-36 h-10 font-bold bg-orange-600 text-white rounded-md cursor-pointer">Update Profile</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Most Applied Jobs */}
                <div className="bg-white rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-900">Most Applied Jobs</h2>
                    <div className="">
                        <div className="">
                            <div className="active-jobs-content">
                                <ul className="grid grid-cols-8 text-gray-800 font-medium border-b border-gray-300 mb-2">
                                    <li></li>
                                    <li>Job Title</li>
                                    <li>Date Posted</li>
                                    <li>Status</li>
                                    <li>Applications</li>
                                    <li>View Applicants</li>
                                    <li>Job Details</li>
                                    <li>Actions</li>
                                </ul>
                                {mostAppliedJobs.slice(0, 5).map((item, index) => (
                                    <ul key={item.id} className="grid grid-cols-8 text-gray-700 border-b border-gray-200 py-2">
                                        <li className="px-2 py-1">{index + 1}</li>
                                        <li className="px-2 py-1">{item.job_title}</li>
                                        <li className="px-2 py-1">{item.date_posted}</li>
                                        <li className={`px-2 py-1 ${item.status === "active" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"} rounded`}>{item.status}</li>
                                        <li className="px-2 py-1">{item.applications}</li>
                                        <Link href="">
                                            <button className="bg-gray-300 text-gray-800 px-3 py-1 rounded-md font-medium cursor-pointer">View Applicants</button>
                                        </Link>
                                        <Link href="">
                                            <button className="bg-gray-300 text-gray-800 px-3 py-1 rounded-md font-medium cursor-pointer">Job Details</button>
                                        </Link>
                                        <div className="flex gap-2 px-2 py-1">
                                            <button className="text-gray-700 p-2"><HiOutlinePencilAlt /></button>
                                            <button className="text-red-600 p-2"><HiOutlineTrash /></button>
                                        </div>
                                    </ul>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-8">
                        <Link href="/foremployers/postjobs">
                            <button className="w-36 h-10 bg-blue-600 text-white rounded-md font-bold cursor-pointer">Post a new job</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageJobsDashboard;
