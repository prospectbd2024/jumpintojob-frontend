"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { HiOutlineArchive, HiOutlineBookmark, HiOutlineBriefcase, HiOutlineHome, HiOutlinePhoneIncoming } from "react-icons/hi";

const UserMyJobs = ({ children }) => {
    const [sidebarItemClick, setSidebarItemClick] = useState('/myjobs/dashboard');
    const [activeSidebarItem, setActiveSideItem] = useState('Dashboard');

    return (
        <div className="min-h-screen flex">
            <div className="flex-none bg-white shadow-md sticky top-20 w-full md:w-[300px]">
                <div className="p-5">
                    <h2 className="text-2xl font-semibold text-[#061421] border-b border-gray-300 pb-3">My Jobs</h2>
                    <ul className="mt-4">
                        {['Dashboard', 'Saved Jobs', 'Applied Jobs', 'Interviews', 'Archived Jobs'].map((item) => (
                            <li
                                key={item}
                                onClick={() => setActiveSideItem(item)}
                                className={`flex items-center gap-3 p-3 rounded-md transition duration-200 ease-in-out cursor-pointer ${
                                    activeSidebarItem === item ? 'bg-[#F08200] text-white' : 'text-[#061421]'
                                }`}
                            >
                                {item === 'Dashboard' && <HiOutlineHome className="text-2xl" />}
                                {item === 'Saved Jobs' && <HiOutlineBookmark className="text-2xl" />}
                                {item === 'Applied Jobs' && <HiOutlineBriefcase className="text-2xl" />}
                                {item === 'Interviews' && <HiOutlinePhoneIncoming className="text-2xl" />}
                                {item === 'Archived Jobs' && <HiOutlineArchive className="text-2xl" />}
                                <Link href={sidebarItemClick} onMouseOver={() => setSidebarItemClick(`/myjobs/${item.toLowerCase().replace(' ', '')}`)}>
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="flex-1 p-4 md:p-20">
                {children}
            </div>
        </div>
    );
};

export default UserMyJobs;
