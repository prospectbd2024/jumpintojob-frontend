'use client'

import React, { useState } from 'react'
import DashboardLayout from "@/Components/Dashboard/DashboardLayout";
import { Calendar, Clock, MapPin, User, Search, Filter, ChevronDown } from 'lucide-react'
import Image from 'next/image'

const interviews = [
    { id: 1, candidate: 'Alice Johnson', position: 'Frontend Developer', date: '2023-05-20', time: '10:00 AM', location: 'Video Call', image: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, candidate: 'Bob Smith', position: 'Backend Developer', date: '2023-05-21', time: '2:00 PM', location: 'Office', image: 'https://i.pravatar.cc/150?img=2' },
    { id: 3, candidate: 'Carol Williams', position: 'UX Designer', date: '2023-05-22', time: '11:30 AM', location: 'Video Call', image: 'https://i.pravatar.cc/150?img=3' },
    { id: 4, candidate: 'David Brown', position: 'Full Stack Developer', date: '2023-05-23', time: '3:00 PM', location: 'Office', image: 'https://i.pravatar.cc/150?img=4' },
]

export default function InterviewsPage() {
    const [searchTerm, setSearchTerm] = useState('')

    const filteredInterviews = interviews.filter(interview =>
        interview.candidate.toLowerCase().includes(searchTerm.toLowerCase()) ||
        interview.position.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <DashboardLayout>
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Interviews</h1>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out">
                    Schedule Interview
                </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
                    <div className="relative flex-grow">
                        <input
                            type="text"
                            placeholder="Search interviews..."
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredInterviews.map((interview) => (
                    <div key={interview.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                        <div className="p-6">
                            <div className="flex items-center space-x-4 mb-4">
                                <Image src={interview.image} alt={interview.candidate} width={60} height={60} className="rounded-full" />
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{interview.candidate}</h2>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">{interview.position}</p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                    <Calendar className="w-5 h-5 mr-2" />
                                    {interview.date}
                                </div>
                                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                    <Clock className="w-5 h-5 mr-2" />
                                    {interview.time}
                                </div>
                                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                    <MapPin className="w-5 h-5 mr-2" />
                                    {interview.location}
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex justify-between">
                            <button className="text-blue-500 hover:text-blue-600 font-medium">
                                View Details
                            </button>
                            <button className="text-gray-500 hover:text-gray-600 font-medium">
                                Reschedule
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </DashboardLayout>
    )
}