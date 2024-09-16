"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { HiOutlineUser, HiOutlineAcademicCap, HiBriefcase, HiOutlineCog } from 'react-icons/hi';

const UserProfile = ({ children }) => {
    const [sidebarItemClick, setSidebarItemClick] = useState('/userprofile/aboutme');
    const pathname = usePathname();

    return (
        <div className="min-h-screen flex">
            <div className="flex-none bg-white shadow-md sticky top-20 w-full md:w-80">
                <div className="p-5">
                    <h2 className="text-2xl font-semibold text-[#061421] border-b border-gray-300 pb-3">My Information</h2>
                    <ul className="mt-4 space-y-2">
                        {['About Me', 'Qualifications', 'Job Preferences', 'Account Setting'].map((item) => (
                            <li
                                key={item}
                                className={`flex items-center gap-3 p-3 rounded-md transition duration-200 ease-in-out cursor-pointer ${
                                    pathname === `/userprofile/${item.toLowerCase().replace(' ', '')}` ? 'bg-[#F08200] text-white' : 'text-[#061421]'
                                }`}
                            >
                                {item === 'About Me' && <HiOutlineUser className="text-2xl" />}
                                {item === 'Qualifications' && <HiOutlineAcademicCap className="text-2xl" />}
                                {item === 'Job Preferences' && <HiBriefcase className="text-2xl" />}
                                {item === 'Account Setting' && <HiOutlineCog className="text-2xl" />}
                                <Link href={`/userprofile/${item.toLowerCase().replace(' ', '')}`}>
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="flex-1 p-4 md:p-8">
                {children}
            </div>
        </div>
    );
};

export default UserProfile;
