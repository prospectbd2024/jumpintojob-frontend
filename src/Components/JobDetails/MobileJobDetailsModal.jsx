'use client';
import React, {useRef, useState, useEffect} from 'react';
import {FaUpRightFromSquare} from 'react-icons/fa6';
import Link from 'next/link';
import {useApplicationContext} from "@/Contexts/ApplicationContext";
import {useUserContext} from "@/Contexts/UserContext";

const MobileJobDetailsModal = ({job, toggleModal}) => {
    const {isApplied,handleApplyJob} = useApplicationContext();
    const {guestProtection} = useUserContext();
    const [startY, setStartY] = useState(0);
    const [translateY, setTranslateY] = useState(0);
    const modalRef = useRef(null);

    useEffect(() => {
        const handleBackButton = (e) => {
            if (e.key === 'Escape') {
                toggleModal();
            }
        };

        window.addEventListener('keydown', handleBackButton);
        return () => {
            window.removeEventListener('keydown', handleBackButton);
        };
    }, [toggleModal]);

    const handleTouchStart = (e) => {
        setStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e) => {
        setTranslateY(e.touches[0].clientY - startY);
    };

    const handleTouchEnd = () => {
        if (translateY > 100) { // Adjust threshold as needed
            toggleModal();
        }
        setTranslateY(0);
    };

    

    return (
        <div
            className="fixed inset-0 flex items-end bg-black bg-opacity-50 z-50 lg:hidden"
            onClick={(e) => {
                if (e.target === modalRef.current) {
                    toggleModal();
                }
            }}
        >
            <div
                ref={modalRef}
                className="w-full h-[90vh] mb-5 bg-white rounded-t-lg shadow-lg transition-transform transform duration-300 ease-in-out translate-y-full"
                style={{transform: `translateY(${Math.min(translateY, 0)}px)`}}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {/* Close Button */}
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                    <h3 className="text-lg font-bold text-gray-800">{job.job_title}</h3>
                    <button className="text-gray-700 text-xl font-semibold" onClick={toggleModal}>
                        &times;
                    </button>
                </div>

                {/* Modal Content */}
                <div className="flex flex-col h-full">
                    {/* Cover Image */}
                    {job.cover_image && (
                        <div className="relative w-full max-h-24 mb-4 overflow-hidden">
                            <img
                                src={job.cover_image}
                                alt="Cover Image"
                                className="w-full h-full object-cover"
                                // style={{clipPath: 'polygon(45% 0px, 100% 0px, 100% 100%, 57% 100%)'}}
                            />
                            <div
                                className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent opacity-60"></div>
                        </div>
                    )}

                    {/* Header Info */}
                    <div className="flex items-center gap-4 mb-2 px-4">
                        <div
                            className="w-16 h-16 flex items-center justify-center rounded-lg overflow-hidden bg-transparent">
                            <img src={job.image} alt={job.company_name} className="object-contain w-full h-full"/>
                        </div>
                        <div className="flex flex-col">
                            <Link href="#" className="text-sm font-semibold text-blue-600 hover:underline">
                                {job.company_name}
                            </Link>
                            <h2 className="text-lg font-bold text-gray-800 mb-1">{job.job_title}</h2>
                            <p className="text-sm text-gray-600">{job.address}</p>
                        </div>
                    </div>

                    {/* Job Details */}
                    <div className="flex-1 px-4 py-2 overflow-y-auto" style={{maxHeight: 'calc(90vh - 10rem)'}}>
                        <div className="text-sm md:text-base">
                            <div className="mb-4">
                                <h3 className="font-medium text-gray-800 mb-1">Job Type</h3>
                                <p className="text-gray-600 leading-tight">{job.availability}</p>
                            </div>
                            <div className="mb-4">
                                <h3 className="font-medium text-gray-800 mb-1">Salary</h3>
                                <p className="text-gray-600 leading-tight">{job.salary}</p>
                            </div>
                            <div className="mb-4">
                                <h3 className="font-medium text-gray-800 mb-1">Educational Requirements</h3>
                                <p className="text-gray-600 leading-tight">{job.educational_requirements}</p>
                            </div>
                            <div className="mb-4">
                                <h3 className="font-medium text-gray-800 mb-1">Required Experiences</h3>
                                <p className="text-gray-600 leading-tight">{job.experience}</p>
                            </div>
                            <div className="mb-4">
                                <h3 className="font-medium text-gray-800 mb-1">Job Description</h3>
                                <p className="text-gray-600 leading-tight">{job.description}</p>
                            </div>
                            <div className="mb-4">
                                <h3 className="font-medium text-gray-800 mb-1">Job Responsibilities</h3>
                                <p className="text-gray-600 leading-tight">{job.responsibilities}</p>
                            </div>
                        </div>
                    </div>

                    {/* Apply Button */}
                    <div className="px-4 mb-10 py-3 bg-white border-t border-gray-200">
                        <button
                            type="button"
                            onClick={handleApplyJob}
                            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 inline-flex items-center w-full"
                        >
                            {isApplied(job.id) ? 'Applied' : 'Apply Now'}
                            <FaUpRightFromSquare
                                className={`w-4 h-4 ml-2 ${!isApplied(job.id) ? 'text-white' : 'text-gray-300'}`}
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileJobDetailsModal;
