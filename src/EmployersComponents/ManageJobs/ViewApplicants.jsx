import React, { useState } from 'react';
import { HiArrowLeft, HiOutlineBriefcase, HiOutlineChevronDown, HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi';
import Link from 'next/link';

const ViewApplicants = ({ applicants, setShowViewApplicants, job }) => {
    const [selectedStatus, setSelectedStatus] = useState({});

    const handleStatusClick = (index, status) => {
        setSelectedStatus((prevSelectedStatus) => ({
            ...prevSelectedStatus,
            [index]: status,
        }));
    };

    const handleStatusChange = (index, newStatus) => {
        // Handle the logic for updating the status in your data or triggering an API call
        console.log(`Status changed for index ${index} to ${newStatus}`);
    };

    return (
        <div className='fixed inset-0 bg-white bg-opacity-90 z-50 flex flex-col'>
            <div className='flex justify-between items-center p-4 bg-gray-200 border-b border-gray-300'>
                <div className='flex items-center gap-2'>
                    <HiOutlineBriefcase className='text-xl text-gray-700' />
                    <h2 className='text-lg font-semibold'>{`Applicants for ${job.job_title} role`}</h2>
                </div>
                <button className='bg-gray-300 hover:bg-gray-400 text-gray-700 rounded p-2' onClick={() => setShowViewApplicants(false)}>
                    <HiArrowLeft className='text-xl' />
                </button>
            </div>
            <div className='p-4'>
                <div className='bg-white rounded-lg shadow-md'>
                    <ul className='grid grid-cols-[40px_200px_160px_150px_auto] gap-4 p-4 border-b border-gray-300'>
                        <li></li>
                        <li className='font-semibold'>Applicant Name</li>
                        <li className='font-semibold'>Application Date</li>
                        <li className='font-semibold'>Status</li>
                        <li className='font-semibold'>Actions</li>
                    </ul>
                   
                    {applicants.map((applicant, index) => (
                        <ul key={applicant.id} className='grid grid-cols-[40px_200px_160px_150px_auto] gap-4 p-4 border-b border-gray-300'>
                            <li className='flex items-center justify-center bg-primary text-white rounded-full w-8 h-8'>
                                {index + 1}
                            </li>
                            <li>{applicant.applicant_name}</li>
                            <li>28-11-2023</li>
                            <li className='flex items-center'>
                                <div className={`px-2 py-1 rounded-full text-white ${selectedStatus[index] || applicant.status === 'applied' ? 'bg-blue-500' : selectedStatus[index] === 'shortlisted' ? 'bg-orange-500' : selectedStatus[index] === 'interview' ? 'bg-green-500' : 'bg-red-500'}`}>
                                {selectedStatus[index] !== undefined ? (
                                        <select
                                            value={selectedStatus[index]}
                                            onChange={(e) => {
                                                const newStatus = e.target.value;
                                                handleStatusClick(index, newStatus);
                                                handleStatusChange(index, newStatus);
                                            }}
                                            className='bg-transparent text-white border-none'
                                        >
                                            <option value='applied'>applied</option>
                                            <option value='shortlisted'>shortlisted</option>
                                            <option value='interview'>interview</option>
                                            <option value='rejected'>rejected</option>
                                        </select>
                                    ) : (
                                        <span onMouseOver={() => handleStatusClick(index, applicant.status)} className='flex items-center gap-2'>
                                            {applicant.status} <HiOutlineChevronDown className='text-xs' />
                                        </span>
                                    )}
                                </div>
                            </li>
                            <div className='flex gap-2'>
                                <Link href="">
                                    <a>
                                        <button className='bg-blue-500 text-white py-1 px-4 rounded-full font-semibold hover:bg-blue-600 transition'>View Resume</button>
                                    </a>
                                </Link>
                                <Link href="">
                                    <a>
                                        <button className='bg-blue-500 text-white py-1 px-4 rounded-full font-semibold hover:bg-blue-600 transition'>Cover Letter</button>
                                    </a>
                                </Link>
                                <Link href="">
                                    <a>
                                        <button className='bg-blue-500 text-white py-1 px-4 rounded-full font-semibold hover:bg-blue-600 transition'>View Profile</button>
                                    </a>
                                </Link>
                            </div>
                        </ul>
                    )
                    )} 
              
                </div>
            </div>
        </div>
    );
};

export default ViewApplicants;
