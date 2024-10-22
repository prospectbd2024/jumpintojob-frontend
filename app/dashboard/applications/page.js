'use client';

import {useDashboardContext} from '@/Contexts/DashboardContext';
import DashboardLayout from '@/Components/Dashboard/DashboardLayout';


export default function Applications() {
    const {applicantsData, loadingApplicants} = useDashboardContext()


    return (
        <DashboardLayout>
            <div className="flex">
                <div className="w-full p-4">
                    {loadingApplicants ? (
                        <div className="flex items-center justify-center h-full">
                            {/* Loading Spinner */}
                            <svg
                                className="animate-spin h-10 w-10 text-yellow-500"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <circle className="opacity-25" cx="12" cy="12" r="10" fill="currentColor" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v2a6 6 0 100 12v2a8 8 0 01-8-8z" />
                            </svg>
                        </div>
                    ) : (
                        applicantsData && applicantsData.map((applicant) => (
                            <div key={applicant.job_title} className="border-b py-4 transition-all duration-300 ease-in-out">
                                <h2 className="text-xl font-semibold mb-2 text-gray-800">
                                    Applicants for "{applicant.job_title}"
                                </h2>
                                {applicant.applicants.length > 0 ? (
                                    applicant.applicants.map((app) => (
                                        <div key={app.id} className="border-b py-2 flex justify-between items-center">
                                            <div className="flex-1">
                                                <p className="text-lg font-medium">{app.cv_id}</p>
                                                <p className="text-gray-600">Status: {app.status}</p>
                                            </div>
                                            <div className="flex space-x-2">
                                                <button
                                                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded transition duration-200 ease-in-out"
                                                    onClick={() => {/* Handle shortlist */}}
                                                >
                                                    Shortlist
                                                </button>
                                                <button
                                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded transition duration-200 ease-in-out"
                                                    onClick={() => {/* Handle reject */}}
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500">No applicants found for this job.</p>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
