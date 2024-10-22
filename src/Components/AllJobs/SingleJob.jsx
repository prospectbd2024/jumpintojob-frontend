'use client';
import React, {useState} from 'react';
import {useJobContext} from '@/Contexts/JobContext';
import {useUserContext} from '@/Contexts/UserContext';
import {HiOutlineBookmark} from 'react-icons/hi';
import MobileJobDetailsModal from "@/Components/JobDetails/MobileJobDetailsModal";

const SingleJob = ({index, job, clickedJob, handleClickedJob}) => {
    const {guestProtection} = useUserContext();
    const {bookMarkedJobs, setBookMarkedJobs,updateBookMarkJobs} = useJobContext();
    const [showModal, setShowModal] = useState(false);

    const toggleBookMarks = (e, job) => {
        e.stopPropagation();
        guestProtection(() => {
            let id = job.id;  
            if (bookMarkedJobs.find(el => job.id == el.job_id)) {
                setBookMarkedJobs((prev) => prev.filter(el => job.id != el.job_id));
            } else {
                setBookMarkedJobs((prev) => [...prev, {job_id : job.id}]);
            }
        });
    };



    const toggleModal = () => setShowModal(!showModal);

    return (
        <>
            <div
                className={`relative mx-2 sm:mx-3 md:mx-3 md:mr-10 md:ml-10 lg:mx-5 xl:mx-0 rounded-lg p-4 transition-transform duration-300 ease-in-out cursor-pointer ${
                    clickedJob === job.id
                        ? 'border-b-4 border-r-3 border-gray-300 shadow-lg bg-gradient-to-br from-blue-100 via-blue-80 to-blue-70 transform scale-102'
                        : 'border-b-4 border-r-3 border-transparent shadow-md hover:border-gray-300 hover:shadow-lg'
                }`}
                onClick={() => {
                    handleClickedJob(job.id);
                    toggleModal(); // Toggle modal on job click
                }}
            >
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-semibold text-gray-900 truncate">
                        {job.job_title}
                    </h2>
                    <HiOutlineBookmark
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleBookMarks(e, job);
                            updateBookMarkJobs(job.id)
                        }}
                        className={`text-xl cursor-pointer w-8 h-8 p-1 rounded-full transition duration-300 ease-in-out ${
                            bookMarkedJobs.find(el => job.id == el.job_id)
                                ? 'bg-gray-200 hover:bg-gray-400 text-gray-800 hover:text-white'
                                : 'bg-green-200 hover:bg-green-400 text-green-800 hover:text-white'
                        }`}
                    />
                </div>
                <h3 className="text-sm font-medium text-gray-700 mb-1">{job.company_name}</h3>
                <p className="text-gray-600 text-sm leading-tight truncate">{job.address}</p>
                <p className="text-gray-700 text-sm leading-tight mt-2 truncate">{job.description}</p>
                <div className="flex items-center justify-between mt-3">
                    <p className="font-semibold bg-blue-50 py-1 px-3 rounded-lg text-blue-800 text-sm">
                        {job.salary}$ <span className="font-normal">(Estimated Salary)</span>
                    </p>
                    <p className="text-gray-500 text-xs">{job.created_at}</p>
                </div>
            </div>

            {/* Conditionally render the MobileModal */}
            {showModal && (
                <div className=' mt-10'>

                <MobileJobDetailsModal
                    job={job}
                    toggleModal={toggleModal}
                    />
                    </div>
            )}
        </>
    );
};

export default SingleJob;
