'use client'

import React, {useState} from 'react'
import {Search, Filter, ChevronDown, MapPin, Calendar} from 'lucide-react';
import Image from 'next/image';
import {useDashboardContext} from "@/Contexts/DashboardContext";
import DashboardLayout from "@/Components/Dashboard/DashboardLayout";

export default function AppliedJobsPage() {
    const { appliedJobs, loadingApplyJob, error } = useDashboardContext();

    const [searchTerm, setSearchTerm] = useState('');

    // Filter jobs based on search term
    const filteredJobs = appliedJobs.filter(job =>
        job?.job?.job_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job?.job?.company_name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    return (
        <DashboardLayout>
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Applied Jobs</h1>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
                    <div className="relative flex-grow">
                        <input
                            type="text"
                            placeholder="Search applied jobs..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                    <div className="flex space-x-2">
                        <button className="flex items-center space-x-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300 ease-in-out">
                            <Filter size={20} />
                            <span>Filter</span>
                        </button>
                        <button className="flex items-center space-x-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300 ease-in-out">
                            <span>Sort by</span>
                            <ChevronDown size={20} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                {loadingApplyJob &&
                    <div className="flex justify-center items-center h-48">
                        <div
                            className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
                    </div>
                }
                {error && <p className="text-red-600">{error}</p>}
                {!loadingApplyJob && !error && filteredJobs.length === 0 &&
                    <p className="text-gray-600 dark:text-gray-300">No applied jobs found.</p>}
                {!loadingApplyJob && !error && filteredJobs.map((job) => (
                    <div key={job.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-4">
                                    <Image src={job.job.image} alt={job.job.company_name} width={48} height={48} className="rounded-full" />
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{job.job.job_title}</h2>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">{job.job.company_name}</p>
                                    </div>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    job.status === 'Interview Scheduled' ? 'bg-green-100 text-green-800' :
                                        job.status === 'Under Review' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-blue-100 text-blue-800'
                                }`}>
                                    {job.status}
                                </span>
                            </div>
                            <div className="flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-300">
                                <div className="flex items-center mr-4 mb-2">
                                    <MapPin size={16} className="mr-1" />
                                    {job.job.address}
                                </div>
                                <div className="flex items-center mr-4 mb-2">
                                    <Calendar size={16} className="mr-1" />
                                    Applied on {new Date(job.created_at).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 flex justify-between">
                            <button className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400">View Details</button>
                            <button className="text-red-600 hover:text-red-800 dark:hover:text-red-400">Withdraw Application</button>
                        </div>
                    </div>
                ))}
            </div>
        </DashboardLayout>
    );
}
