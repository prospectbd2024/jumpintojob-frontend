"use client";
import React, { useState } from 'react';
import './UserMyJobs.css'
import  Link  from 'next/link';
import { HiOutlineArchive, HiOutlineBookmark, HiOutlineBriefcase, HiOutlineHome, HiOutlinePhoneIncoming } from "react-icons/hi";

const UserMyJobs = ({children}) => {
    const [sidebarItemClick, setSidebarItemClick] = useState('/myjobs/dashboard');
    const [activeSidebarItem, setActiveSideItem] = useState('Dashboard')
    return (
        <div className='user-profile'>
            <div className="user-profile-content">
                <div className="user-profile-sidebar-menu">
                    <div className="userprofile-sidebar-sticky">
                        <h2>My Jobs</h2>
                        <ul>
                            <li onClick={() => setActiveSideItem('Dashboard')} className={`${activeSidebarItem == 'Dashboard' ? 'active-sidebar-item' : ''}`}>
                                <HiOutlineHome></HiOutlineHome>
                                <Link href={sidebarItemClick} onMouseOver={() => setSidebarItemClick('/myjobs/dashboard')} >Dashboard</Link>
                            </li>
                            <li onClick={() => setActiveSideItem('Saved Jobs')} className={`${activeSidebarItem == 'Saved Jobs' ? 'active-sidebar-item' : ''}`}>
                                <HiOutlineBookmark></HiOutlineBookmark>
                                <Link href={sidebarItemClick} onMouseOver={() => setSidebarItemClick('/myjobs/savedjobs')}>Saved Jobs</Link>
                            </li>
                            <li onClick={() => setActiveSideItem('Applied Jobs')} className={`${activeSidebarItem == 'Applied Jobs' ? 'active-sidebar-item' : ''}`}>
                                <HiOutlineBriefcase></HiOutlineBriefcase>
                                <Link href={sidebarItemClick} onMouseOver={() => setSidebarItemClick('/myjobs/appliedjobs')}>Applied Jobs</Link>
                            </li>
                            <li onClick={() => setActiveSideItem('Interviews')} className={`${activeSidebarItem == 'Interviews' ? 'active-sidebar-item' : ''}`}>
                                <HiOutlinePhoneIncoming></HiOutlinePhoneIncoming>
                                <Link href={sidebarItemClick} onMouseOver={() => setSidebarItemClick('/myjobs/interviews')}>Interviews</Link>
                            </li>
                            <li onClick={() => setActiveSideItem('Archived Jobs')} className={`${activeSidebarItem == 'Archived Jobs' ? 'active-sidebar-item' : ''}`}>
                                <HiOutlineArchive></HiOutlineArchive>
                                <Link href={sidebarItemClick} onMouseOver={() => setSidebarItemClick('/myjobs/archivedjobs')}>Archived Jobs</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="dashboard-myjobs-details">
                    <>{children}</>
                </div>
            </div>
        </div>
    );
};

export default UserMyJobs;