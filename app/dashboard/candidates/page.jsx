'use client'

import React, { useState } from 'react'
import { Search, Filter, ChevronDown, Star, Mail } from 'lucide-react'
import Image from 'next/image'
import DashboardLayout from "@/Components/Dashboard/DashboardLayout";

const candidates = [
    { id: 1, name: 'Alice Johnson', role: 'Frontend Developer', location: 'New York, NY', experience: '5 years', image: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, name: 'Bob Smith', role: 'Backend Developer', location: 'San Francisco, CA', experience: '3 years', image: 'https://i.pravatar.cc/150?img=2' },
    { id: 3, name: 'Carol Williams', role: 'UX Designer', location: 'London, UK', experience: '7 years', image: 'https://i.pravatar.cc/150?img=3' },
    { id: 4, name: 'David Brown', role: 'Full Stack Developer', location: 'Berlin, Germany', experience: '4 years', image: 'https://i.pravatar.cc/150?img=4' },
]

export default function CandidatesPage() {
    const [searchTerm, setSearchTerm] = useState('')

    const filteredCandidates = candidates.filter(candidate =>
        candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.location.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <DashboardLayout>
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Candidates</h1>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out">
                    Add New Candidate
                </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
                    <div className="relative flex-grow">
                        <input
                            type="text"
                            placeholder="Search candidates..."
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
                {filteredCandidates.map((candidate) => (
                    <div key={candidate.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-4">
                                    <Image src={candidate.image} alt={candidate.name} width={60} height={60} className="rounded-full" />
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{candidate.name}</h2>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">{candidate.role}</p>
                                    </div>
                                </div>
                                <button className="text-gray-400 hover:text-yellow-500 transition duration-300 ease-in-out">
                                    <Star size={24} />
                                </button>
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm text-gray-600 dark:text-gray-300">📍 {candidate.location}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-300">💼 {candidate.experience} experience</p>
                            </div>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4">
                            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out flex items-center justify-center space-x-2">
                                <Mail size={20} />
                                <span>Contact</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </DashboardLayout>
    )
}