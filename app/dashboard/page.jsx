'use client'

import React, { useState } from 'react'

import { StarIcon, FilterIcon, ChevronDownIcon } from 'lucide-react'
import Image from 'next/image'
import {useUserContext} from "@/Contexts/UserContext";
import DashboardLayout from "@/Components/Dashboard/DashboardLayout";
import {useDashboardContext} from "@/Contexts/DashboardContext";


export default function Dashboard() {
    const { userData } = useUserContext()
    const { jobs, loading } = useDashboardContext();
    const user = userData?.data.user
    const [activeTab, setActiveTab] = useState('all')

    return (
        <DashboardLayout>
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
                    {user?.user_type === 'employer' ? 'Jobs' : 'Job Search'}
                </h1>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex space-x-4">
                        <button
                            className={`px-4 py-2 rounded-full ${activeTab === 'all' ? 'bg-blue-500 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                            onClick={() => setActiveTab('all')}
                        >
                            All Jobs
                        </button>
                        <button
                            className={`px-4 py-2 rounded-full ${activeTab === 'open' ? 'bg-blue-500 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                            onClick={() => setActiveTab('open')}
                        >
                            {user?.user_type === 'employer' ? 'Open and Paused' : 'Saved Jobs'}
                        </button>
                        <button
                            className={`px-4 py-2 rounded-full ${activeTab === 'closed' ? 'bg-blue-500 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                            onClick={() => setActiveTab('closed')}
                        >
                            {user?.user_type === 'employer' ? 'Closed Jobs' : 'Applied Jobs'}
                        </button>
                    </div>
                    {user?.user_type === 'employer' && (
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                            Post a Job
                        </button>
                    )}
                </div>

                <div className="p-4">
                    <div className="flex items-center space-x-4 mb-4">
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                placeholder="Filter and search jobs"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            />
                            <FilterIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        </div>
                        <button className="flex items-center space-x-1 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
                            <StarIcon size={20} />
                            <span>Starred</span>
                        </button>
                    </div>

                    {loading ? (
                        <div className="text-center py-16">
                            <p className="text-gray-600 dark:text-gray-400">Loading jobs...</p>
                        </div>
                    ) : jobs.length > 0 ? (
                        jobs.map((job) => (
                            <div key={job.id} className="border-b border-gray-200 dark:border-gray-700 py-4 flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{job.job_title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400">{job.job_category}</p>
                                    <p className="text-gray-600 dark:text-gray-400">{job.location_type}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">
                                        Pause
                                    </button>
                                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                                        Applicants
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-16">
                            {/*<Image*/}
                            {/*    src="https://i.pravatar.cc/200"*/}
                            {/*    alt="No jobs found"*/}
                            {/*    width={200}*/}
                            {/*    height={200}*/}
                            {/*    className="mx-auto mb-4"*/}
                            {/*/>*/}
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                                {user?.user_type === 'employer' ? 'No jobs posted yet' : 'No jobs found'}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                {user?.user_type === 'employer'
                                    ? 'Get started by posting your first job'
                                    : 'Try adjusting your search criteria'}
                            </p>
                            {user?.user_type === 'employer' && (
                                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                                    Post a job
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    )
}