// pages/candidates.js
'use client'

import React, { useState } from 'react'
import { Search, Filter, ChevronDown, Star, Mail, Phone, Trash2 } from 'lucide-react'
import Image from 'next/image'
import DashboardLayout from "@/Components/Dashboard/DashboardLayout";
import { useCandidatesContext } from '@/Contexts/CandidatesContext';
import { useInterviewsContext } from '@/Contexts/InterviewsContext';
import Swal from 'sweetalert2';

export default function CandidatesPage() {
    const { candidates, deleteCandidate } = useCandidatesContext();
    const { scheduleInterview } = useInterviewsContext();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCandidates = candidates.filter(candidate =>
        candidate.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.location?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCallForInterview = (candidate) => {
        Swal.fire({
            title: 'Schedule Interview',
            html: `
                <input type="datetime-local" id="interviewDateTime" class="swal2-input" placeholder="Interview Date and Time">
                <input type="text" id="interviewLocation" class="swal2-input" placeholder="Interview Location">
            `,
            confirmButtonText: 'Schedule',
            focusConfirm: false,
            preConfirm: () => {
                const interviewDateTime = document.getElementById('interviewDateTime').value;
                const interviewLocation = document.getElementById('interviewLocation').value;
                if (!interviewDateTime || !interviewLocation) {
                    Swal.showValidationMessage('Please enter date, time, and location');
                }
                return { interviewDateTime, interviewLocation };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const { interviewDateTime, interviewLocation } = result.value;
                scheduleInterview({
                    candidate: candidate.name,
                    position: candidate.role,
                    date: new Date(interviewDateTime).toLocaleDateString(),
                    time: new Date(interviewDateTime).toLocaleTimeString(),
                    location: interviewLocation,
                    image: candidate.image,
                    candidateData: candidate // pass the whole candidate object
                });
                Swal.fire('Scheduled!', 'Interview scheduled successfully!', 'success');
            }
        });
    };

    const handleDeleteCandidate = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteCandidate(id);
                Swal.fire(
                    'Deleted!',
                    'Candidate has been deleted.',
                    'success'
                );
            }
        });
    };


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
                                    <Image src={candidate.image || '/placeholder-image.jpg'} alt={candidate.name} width={60} height={60} className="rounded-full" />
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
                                {candidate.resume && (
                                    <a href={candidate.resume} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">View Resume</a>
                                )}
                                <p className="text-sm text-gray-600 dark:text-gray-300">📞 {candidate.phone}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-300">📧 {candidate.email}</p>
                            </div>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex justify-between">
                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out flex items-center justify-center space-x-2"
                                onClick={() => handleCallForInterview(candidate)}
                            >
                                <Phone size={20} />
                                <span>Call for Interview</span>
                            </button>
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out flex items-center justify-center space-x-2"
                                onClick={() => handleDeleteCandidate(candidate.id)}
                            >
                                <Trash2 size={20} />
                                <span>Delete</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </DashboardLayout>
    )
}