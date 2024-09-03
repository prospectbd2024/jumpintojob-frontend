"use client"
import React, { useEffect, useState } from 'react';
import { useUserContext } from '@/Contexts/UserContext';
import { HiOutlineUserCircle } from 'react-icons/hi';
import RichEditor from './RichEditor';
import Link from 'next/link';
import PostJobReview from './PostJobReview';
import { useCategoryContext } from '@/Contexts/CategoryContext';

const ForEmployersPostJob = () => {
    const [showReview, setShowReview] = useState(false);
    const { userData } = useUserContext();
    const [jobData, setJobData] = useState({});
    const { jobCategories } = useCategoryContext();

    const handlePosting = () => {
        setShowReview(true);
        setJobData({ ...jobData, 'email': userData.data.user.email });
    };

    return (
        <div className="py-12">
            <div className="container mx-auto p-8 bg-white shadow-md">
                {showReview ? (
                    <PostJobReview setShowReview={setShowReview} jobData={jobData} />
                ) : (
                    <form>
                        <h3 className="text-xl font-medium mb-6">ADD JOB INFORMATION</h3>
                        <div className="flex flex-wrap gap-x-12 gap-y-8">
                            <div className="flex flex-col w-full md:w-[400px]">
                                <label htmlFor="job_title" className="text-sm mb-2">Job Title</label>
                                <div className="flex items-center border border-gray-300 p-2 rounded-md">
                                    <HiOutlineUserCircle className="mr-2" />
                                    <input
                                        type="text"
                                        placeholder="Civil Engineer"
                                        id="job_title"
                                        name="job_title"
                                        onChange={(e) => setJobData({ ...jobData, 'title': e.target.value })}
                                        value={jobData.title}
                                        required
                                        className="w-full border-none outline-none"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col w-full md:w-[400px]">
                                <label htmlFor="vacancies" className="text-sm mb-2">Vacancies</label>
                                <div className="flex items-center border border-gray-300 p-2 rounded-md">
                                    <HiOutlineUserCircle className="mr-2" />
                                    <input
                                        type="number"
                                        placeholder="1"
                                        id="vacancies"
                                        name="vacancies"
                                        onChange={(e) => setJobData({ ...jobData, 'vacancies': e.target.value })}
                                        value={jobData.vacancies}
                                        required
                                        className="w-full border-none outline-none"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col w-full md:w-[400px]">
                                <label htmlFor="salary" className="text-sm mb-2">Estimated Salary</label>
                                <div className="flex items-center border border-gray-300 p-2 rounded-md">
                                    <HiOutlineUserCircle className="mr-2" />
                                    <input
                                        type="number"
                                        placeholder="$120000"
                                        id="salary"
                                        name="salary"
                                        onChange={(e) => setJobData({ ...jobData, 'salary': e.target.value })}
                                        value={jobData.salary}
                                        required
                                        className="w-full border-none outline-none"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col w-full md:w-[400px]">
                                <label htmlFor="job_type" className="text-sm mb-2">Job Type</label>
                                <div className="flex items-center border border-gray-300 p-2 rounded-md">
                                    <HiOutlineUserCircle className="mr-2" />
                                    <select
                                        name="job_type"
                                        id="job_type"
                                        onChange={(e) => setJobData({ ...jobData, 'employment_type': e.target.value })}
                                        value={jobData.employment_type}
                                        required
                                        className="w-full border-none outline-none"
                                    >
                                        <option value="Select">Select</option>
                                        <option value="Full-time">Full-time</option>
                                        <option value="Part-time">Part-time</option>
                                        <option value="Internship">Internship</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex flex-col w-full md:w-[400px]">
                                <label htmlFor="location_type" className="text-sm mb-2">Location Type</label>
                                <div className="flex items-center border border-gray-300 p-2 rounded-md">
                                    <HiOutlineUserCircle className="mr-2" />
                                    <select
                                        name="location_type"
                                        id="location_type"
                                        onChange={(e) => setJobData({ ...jobData, 'location_type': e.target.value })}
                                        value={jobData.location_type}
                                        required
                                        className="w-full border-none outline-none"
                                    >
                                        <option value="Select">Select</option>
                                        <option value="In-person">In person</option>
                                        <option value="Remote">Remote</option>
                                        <option value="Hybrid">Hybrid</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex flex-col w-full md:w-[400px]">
                                <label htmlFor="job_location" className="text-sm mb-2">Location street address</label>
                                <div className="flex items-center border border-gray-300 p-2 rounded-md">
                                    <HiOutlineUserCircle className="mr-2" />
                                    <input
                                        type="text"
                                        placeholder="Address for this job"
                                        onChange={(e) => setJobData({ ...jobData, 'location': e.target.value })}
                                        value={jobData.location}
                                        className="w-full border-none outline-none"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col w-full md:w-[400px]">
                                <label htmlFor="availability" className="text-sm mb-2">Availability</label>
                                <div className="flex items-center border border-gray-300 p-2 rounded-md">
                                    <HiOutlineUserCircle className="mr-2" />
                                    <input
                                        type="text"
                                        placeholder="Availability for this job"
                                        onChange={(e) => setJobData({ ...jobData, 'availability': e.target.value })}
                                        value={jobData.availability}
                                        className="w-full border-none outline-none"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col w-full md:w-[400px]">
                                <label htmlFor="category_id" className="text-sm mb-2">Job Category</label>
                                <div className="flex items-center border border-gray-300 p-2 rounded-md">
                                    <HiOutlineUserCircle className="mr-2" />
                                    <select
                                        name="category_id"
                                        id="category_id"
                                        onChange={(e) => setJobData({ ...jobData, 'category_id': e.target.value })}
                                        value={jobData.category_id}
                                        className="w-full border-none outline-none"
                                    >
                                        <option value="">Select</option>
                                        {jobCategories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.category_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="flex flex-col w-full md:w-[400px]">
                                <label htmlFor="deadline" className="text-sm mb-2">Deadline</label>
                                <div className="flex items-center border border-gray-300 p-2 rounded-md">
                                    <HiOutlineUserCircle className="mr-2" />
                                    <input
                                        type="date"
                                        id="deadline"
                                        name="deadline"
                                        onChange={(e) => setJobData({ ...jobData, 'deadline': e.target.value })}
                                        value={jobData.deadline}
                                        className="w-full border-none outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-8">
                            <RichEditor jobData={jobData} setJobData={setJobData} />
                        </div>
                        <div className="mt-8">
                            <p className="text-sm">
                                By posting a job, you understand and agree to Job Portal's <Link href="/terms" className="text-blue-500">Terms</Link>. 
                                You also acknowledge our <Link href="/cookie" className="text-blue-500">Cookie</Link> and <Link href="/privacy" className="text-blue-500">Privacy</Link> policies.
                            </p>
                            <div className="mt-4 flex items-center">
                                <input type="checkbox" id="termscheck" required className="mr-2"/>
                                <label htmlFor="termscheck" className="text-sm">I agree to the company terms & conditions.</label>
                            </div>
                        </div>
                        <button 
                            type="button" 
                            onClick={handlePosting} 
                            className="mt-8 px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
                        >
                            Continue
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ForEmployersPostJob;
