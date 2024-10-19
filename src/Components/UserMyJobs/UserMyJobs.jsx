"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { HiOutlineHome, HiOutlineBookmark, HiOutlineBriefcase, HiOutlinePhoneIncoming, HiOutlineArchive, HiMenu, HiX } from 'react-icons/hi';

const UserMyJobs = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isLargeScreen, setIsLargeScreen] = useState(true);
    const pathname = usePathname();

    useEffect(() => {
        const checkScreenSize = () => {
            setIsLargeScreen(window.innerWidth >= 1024);
            if (window.innerWidth >= 1024) {
                setSidebarOpen(true);
            }
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const menuItems = [
        { name: 'Dashboard', icon: HiOutlineHome },
        { name: 'Saved Jobs', icon: HiOutlineBookmark },
        { name: 'Applied Jobs', icon: HiOutlineBriefcase },
        { name: 'Interviews', icon: HiOutlinePhoneIncoming },
        { name: 'Archived Jobs', icon: HiOutlineArchive },
    ];

    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            {/* Top navigation for small and medium screens */}
            <div className="lg:hidden fixed top-0 left-0 right-0 bg-white shadow-md z-20">
                <ul className="flex justify-around p-2">
                    {menuItems.map((item) => (
                        <li
                            key={item.name}
                            className={`flex flex-col items-center p-2 ${
                                pathname === `/myjobs/${item.name.toLowerCase().replace(' ', '')}` ? 'text-primary-color' : 'text-[#061421]'
                            }`}
                        >
                            <Link href={`/myjobs/${item.name.toLowerCase().replace(' ', '')}`}>
                                <item.icon className="text-xl mb-1" />
                                <span className="text-xs">{item.name.split(' ')[0]}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Sidebar */}
            <div className={`bg-white shadow-md w-full lg:w-80 fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition duration-200 ease-in-out z-30 mt-16 lg:mt-0`}>
                <div className="p-5">
                    <h2 className="text-2xl font-semibold text-[#061421] border-b border-gray-300 pb-3">Dashboard</h2>
                    <ul className="mt-4 space-y-2">
                        {menuItems.map((item) => (
                            <li
                                key={item.name}
                                className={`flex items-center gap-3 p-3 rounded-md transition duration-200 ease-in-out cursor-pointer ${
                                    pathname === `/myjobs/${item.name.toLowerCase().replace(' ', '')}` ? 'bg-primary-color text-white' : 'text-[#061421]'
                                }`}
                                onClick={() => {
                                    if (!isLargeScreen) {
                                        setSidebarOpen(false);
                                    }
                                }}
                            >
                                <item.icon className="text-2xl" />
                                <Link href={`/myjobs/${item.name.toLowerCase().replace(' ', '')}`}>
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 p-4 lg:p-8 mt-24 lg:mt-0">
                {children}
            </div>

            {/* Toggle button for sidebar on small and medium screens */}
            {!isLargeScreen && (
                <button 
                    className="fixed bottom-4 right-4 z-40 p-3 bg-primary-color text-white rounded-full shadow-lg"
                    onClick={toggleSidebar}
                >
                    {sidebarOpen ? <HiX className="text-2xl" /> : <HiMenu className="text-2xl" />}
                </button>
            )}
        </div>
    );
};

export default UserMyJobs;