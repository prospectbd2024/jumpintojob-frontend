'use client'

import React, { useState } from 'react'

import { Search, Filter, ChevronDown, Briefcase, MapPin, Calendar, Clock } from 'lucide-react'
import Image from 'next/image'
import DashboardLayout from "@/Components/Dashboard/DashboardLayout";

const appliedJobs = [
    { id: 1, title: 'Frontend Developer', company: 'TechCorp', logo: 'https://logo.clearbit.com/techcorp.com', location: 'Remote', appliedDate: '2023-05-15', status: 'Under Review' },
    { id: 2, title: 'UX Designer', company: 'DesignHub', logo: 'https://logo.clearbit.com/designhub.com', location: 'New York, NY', appliedDate: '2023-05-10', status: 'Interview Scheduled' },
    { id: 3, title: 'Data Scientist', company: 'DataWorks', logo: 'https://logo.clearbit.com/dataworks.com', location: 'San Francisco, CA', appliedDate: '2023-05-05', status: 'Application Received' },
    { id: 4, title: 'Product Manager', company: 'InnovateCo', logo: 'https://logo.clearbit.com/innovateco.com', location: 'Chicago, IL', appliedDate: '2023-05-01', status: 'Under Review' },
]

export default function AppliedJobsPage() {
    const [searchTerm, setSearchTerm] = useState('')

    const filteredJobs = appliedJobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase())
    )

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
                {filteredJobs.map((job) => (
                    <div key={job.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-4">
                                    <Image src={job.logo} alt={job.company} width={48} height={48} className="rounded-full" />
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{job.title}</h2>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">{job.company}</p>
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
                                    {job.location}
                                </div>
                                <div className="flex items-center mr-4 mb-2">
                                    <Calendar size={16} className="mr-1" />
                                    Applied on {job.appliedDate}
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex justify-between items-center">
                            <button className="text-blue-500 hover:text-blue-600 font-medium">
                                View Application
                            </button>
                            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out">
                                Follow Up
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </DashboardLayout>
    )
}