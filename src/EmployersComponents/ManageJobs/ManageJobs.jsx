import React, { useState } from 'react';
import { HiOutlineHome, HiOutlineBriefcase, HiOutlinePhoneIncoming } from 'react-icons/hi';
import { FaRegCheckCircle } from 'react-icons/fa';
import Link from 'next/link';

const ManageJobs = () => {
    const [sidebarItemClick, setSidebarItemClick] = useState('/managejobs/dashboard');
    const [activeSidebarItem, setActiveSideItem] = useState('Dashboard');

    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <div className="flex-none bg-white shadow-md sticky top-20 w-full md:w-64">
                <div className="p-5">
                    <h2 className="text-2xl font-semibold text-[#061421] border-b border-gray-300 pb-3">Manage Jobs</h2>
                    <ul className="mt-4 space-y-2">
                        {['Dashboard', 'Active Jobs', 'Job History', 'Shortlisted', 'Interview'].map((item) => (
                            <li
                                key={item}
                                onClick={() => setActiveSideItem(item)}
                                className={`flex items-center gap-3 p-3 rounded-md transition duration-200 ease-in-out cursor-pointer ${
                                    activeSidebarItem === item ? 'bg-[#F08200] text-white' : 'text-[#061421]'
                                }`}
                            >
                                {item === 'Dashboard' && <HiOutlineHome className="text-2xl" />}
                                {item === 'Active Jobs' && <HiOutlineBriefcase className="text-2xl" />}
                                {item === 'Job History' && <HiOutlineBriefcase className="text-2xl" />}
                                {item === 'Shortlisted' && <FaRegCheckCircle className="text-2xl" />}
                                {item === 'Interview' && <HiOutlinePhoneIncoming className="text-2xl" />}
                                <Link href={sidebarItemClick} onMouseOver={() => setSidebarItemClick(`/managejobs/${item.toLowerCase().replace(' ', '')}`)}>
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {/* Content */}
            <div className="flex-1 p-4 md:p-8">
                <Outlet />
            </div>
        </div>
    );
};

export default ManageJobs;
