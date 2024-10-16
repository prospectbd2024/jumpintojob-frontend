'use client'

import React, { useContext, useState } from 'react';
import { Search, Filter, ChevronDown, Edit, Trash2, Eye } from 'lucide-react';
import DashboardLayout from "@/Components/Dashboard/DashboardLayout";
import { useDashboardContext } from '@/Contexts/DashboardContext';

export default function JobsPage() {
    const { jobs, loading, paginate, currentPage, totalPages } = useDashboardContext();
    const [searchTerm, setSearchTerm] = useState('');

    console.log("jobs", jobs);

    const filteredJobs = jobs.filter(job =>
        job.job_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.job_category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location_type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <DashboardLayout>
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Jobs</h1>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out">
                    Post New Job
                </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
                    <div className="relative flex-grow">
                        <input
                            type="text"
                            placeholder="Search jobs..."
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

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                {loading ? (
                    <div className="flex justify-center items-center h-48">
                        <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <>
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Job
                                    Title
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Location</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredJobs.map((job) => (
                                <tr key={job.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div
                                            className="text-sm font-medium text-gray-900 dark:text-white">{job.job_title}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div
                                            className="text-sm text-gray-500 dark:text-gray-300">{job.job_category}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div
                                            className="text-sm text-gray-500 dark:text-gray-300">{job.location_type}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button className="text-indigo-600 hover:text-indigo-900 mr-2">
                                            <Eye size={18}/>
                                        </button>
                                        <button className="text-blue-600 hover:text-blue-900 mr-2">
                                            <Edit size={18}/>
                                        </button>
                                        <button className="text-red-600 hover:text-red-900">
                                            <Trash2 size={18}/>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                        <div className="flex justify-between p-4">
                            <button
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-4 py-2 bg-blue-500 dark:bg-gray-700 text-white rounded disabled:bg-gray-300"
                            >
                                Previous
                            </button>
                            <span className="dark:text-white">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 bg-blue-500 dark:bg-gray-700 text-white rounded disabled:bg-gray-300"
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
            </div>
        </DashboardLayout>
    );
}
