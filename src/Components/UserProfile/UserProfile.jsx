"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { HiOutlineUser, HiOutlineAcademicCap, HiBriefcase, HiOutlineCog, HiMenu, HiX } from 'react-icons/hi';

const UserProfile = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const menuItems = [
        { name: 'About Me', icon: HiOutlineUser },
        { name: 'Qualifications', icon: HiOutlineAcademicCap },
        { name: 'Job Preferences', icon: HiBriefcase },
        { name: 'Account Setting', icon: HiOutlineCog },
    ];

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Top navigation for small screens */}
            <div className="md:hidden fixed top-0 left-0 right-0 bg-white shadow-md z-20">
                <ul className="flex justify-around p-2">
                    {menuItems.map((item) => (
                        <li
                            key={item.name}
                            className={`flex flex-col items-center p-2 ${
                                pathname === `/userprofile/${item.name.toLowerCase().replace(' ', '')}` ? 'text-primary-color' : 'text-[#061421]'
                            }`}
                        >
                            <Link href={`/userprofile/${item.name.toLowerCase().replace(' ', '')}`}>
                                <item.icon className="text-xl mb-1" />
                                <span className="text-xs">{item.name.split(' ')[0]}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Sidebar for larger screens */}
            <div className={`bg-white shadow-md w-full md:w-80 fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out z-30 mt-16 md:mt-0`}>
                <div className="p-5">
                    <h2 className="text-2xl font-semibold text-[#061421] border-b border-gray-300 pb-3">My Information</h2>
                    <ul className="mt-4 space-y-2">
                        {menuItems.map((item) => (
                            <li
                                key={item.name}
                                className={`flex items-center gap-3 p-3 rounded-md transition duration-200 ease-in-out cursor-pointer ${
                                    pathname === `/userprofile/${item.name.toLowerCase().replace(' ', '')}` ? 'bg-primary-color text-white' : 'text-[#061421]'
                                }`}
                                onClick={() => {
                                    if (window.innerWidth < 768) {
                                        setSidebarOpen(false);
                                    }
                                }}
                            >
                                <item.icon className="text-2xl" />
                                <Link href={`/userprofile/${item.name.toLowerCase().replace(' ', '')}`}>
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 p-4 md:p-8 mt-24 md:mt-0">
                {children}
            </div>

            {/* Toggle button for sidebar */}
            <button 
                className="md:hidden fixed bottom-4 right-4 z-40 p-3 bg-primary-color text-white rounded-full shadow-lg"
                onClick={toggleSidebar}
            >
                {sidebarOpen ? <HiX className="text-2xl" /> : <HiMenu className="text-2xl" />}
            </button>
        </div>
    );
};

export default UserProfile;