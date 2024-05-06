"use client"
import React, { useState } from 'react';
import  Link  from 'next/link';
import './UserProfile.css';
import { usePathname } from "next/navigation";
import { FaHouseUser } from 'react-icons/fa';
import { HiBriefcase, HiOutlineAcademicCap, HiOutlineCode, HiOutlineCog, HiOutlineUser, HiOutlineUserCircle } from 'react-icons/hi';

const UserProfile = ({children}) => {
    const [sidebarItemClick, setSidebarItemClick] = useState('/userprofile/aboutme');
    const [activeSidebarItem, setActiveSideItem] = useState('About Me');
    const pathname = usePathname();
    return (
        <div className='user-profile'>
            <div className="user-profile-content">
                <div className="user-profile-sidebar-menu">
                    <div className="userprofile-sidebar-sticky">
                        <h2>My Information</h2>
                        <ul>
                            <li  className={`${pathname == '/userprofile/aboutme' ? 'active-sidebar-item' : ''}`}>
                                <HiOutlineUser/>
                                <Link href='/userprofile/aboutme'  >About Me</Link>
                            </li>
                            <li  className={`${pathname == '/userprofile/qualifications' ? 'active-sidebar-item' : ''}`}>
                                <HiOutlineAcademicCap/>
                                <Link href='/userprofile/qualifications' >Qualifications</Link>
                            </li>
                            <li  className={`${pathname == '/userprofile/jobpreferences' ? 'active-sidebar-item' : ''}`}>
                                <HiBriefcase/>
                                <Link href='/userprofile/jobpreferences'  >Job Preferences</Link>
                            </li>
                            <li   className={`${pathname == '/userprofile/accountsetting' ? 'active-sidebar-item' : ''}`}>
                                <HiOutlineCog/>
                                <Link href='/userprofile/accountsetting' >Account Setting</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="user-profile-details">
                    <>{children}</>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
