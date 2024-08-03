"use client";
import React, { useState, useCallback, useContext, useEffect } from 'react';
import Link from 'next/link';
import { FaFileAlt, FaGlobe, FaUserTie } from "react-icons/fa";
import { HiBookmark, HiBriefcase, HiCog, HiMenu, HiOutlineUser, HiOutlineUserAdd, HiQuestionMarkCircle, HiX } from "react-icons/hi";
import { TbBell, TbLogout, TbSend, TbUserCircle } from 'react-icons/tb';
import Swal from 'sweetalert2';
import { usePathname, useRouter } from 'next/navigation';
import { UserContext } from '@/Contexts/UserContext';
import { signOut } from 'next-auth/react';
import Logo from '@/assets/Logo';

const Header = () => {
    const forEmployerNavigate = useRouter();
    const [mobileMenuClicked, setMobileMenuClicked] = useState(false);
    const location = usePathname();
    const [activeMenu, setActiveMenu] = useState(location);
    const { userData, setUserData } = useContext(UserContext);

    const [userLoggedout, setUserLoggedout] = useState(false);
    const [userProfileClicked, setUserProfileClicked] = useState(false);
    const [isClient, setClient] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Global');

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userProfileClicked && !(event.target).closest('.user-profile-icon')) {
                setUserProfileClicked(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [userProfileClicked]);

    useEffect(() => {
        setClient(true);
    }, []);

    const toggleOption = () => {
        setSelectedOption(selectedOption === 'Global' ? 'Local' : 'Global');
    };

    const toggleUserProfile = () => {
        setUserProfileClicked((prev) => !prev);
    };

    const handleActiveMenu = (e) => {
        setActiveMenu(e);
    };

    const handleLogout = async () => {
        forEmployerNavigate.push('/signin');
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'User logout successful!',
            showConfirmButton: false,
            timer: 1500
        });
        setUserData(null);
        const token = userData?.data?.access_token;
        if (!token) {
            console.error("User token not available.");
            return;
        }
        try {
            const userLogoutResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/logout`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            localStorage.removeItem('userData');
            await signOut();
            const userLogoutData = await userLogoutResponse.json();
            setUserLoggedout(userLogoutData);
            setUserData(null);
        } catch (error) {
            console.error("Logout failed:", error);
            alert(error);
        }
    };

    const handleSignoutAlert = async () => {
        if (userData) {
            const result = await Swal.fire({
                title: 'You will be logged out from your job seeker account!',
                text: "Are you sure?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes!'
            });

            if (result.isConfirmed) {
                Swal.fire(
                    'Welcome!',
                    'To post jobs, create an employer account with your business email',
                    'success'
                ).then(() => {
                    handleLogout();
                    forEmployerNavigate.push('/foremployers');
                });
            }
        } else {
            forEmployerNavigate.push('/foremployers');
        }
    };

    return (
        <>
            {isClient && (
                <div className='bg-white border-b border-gray-400 sticky top-0 left-0 z-50'>
                    <div className="container mx-auto flex justify-between items-center py-4">
                        <div className="flex items-center">
                            <Logo className='w-32 h-10' fill='var(--primary-color)' />
                            <div className='hidden lg:flex items-center gap-5 ml-5'>
                                {userData ?
                                    <div className='flex items-center gap-4 relative'>
                                        <label className="relative inline-block w-14 h-7">
                                            <input type="checkbox" className="opacity-0 w-0 h-0" onClick={toggleOption} />
                                            <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-cover bg-center rounded-full transition-transform duration-300" style={{ backgroundImage: `url('${selectedOption === 'Global' ? 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/world-map-in-blue-michael-tompsett.jpg' : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmB-yQ2zFUyD9BgDpBCSWKFDEDe4pYk2pOSoPQ8PEG&s'}')` }}></span>
                                            <span className="absolute left-1 top-1 w-5 h-5 bg-gray-400 rounded-full transition-transform duration-300 transform" style={{ transform: selectedOption === 'Global' ? 'translateX(0)' : 'translateX(26px)' }}></span>
                                        </label>
                                        <TbBell className="text-2xl text-gray-600 hover:shadow-lg" />
                                        <TbUserCircle className={`text-2xl text-gray-600 cursor-pointer ${userProfileClicked ? 'shadow-lg' : ''}`} onClick={toggleUserProfile} />

                                        {userProfileClicked && (
                                            <div className="absolute top-14 right-0 w-72 bg-white shadow-lg rounded-lg p-5">
                                                <div className="mb-4">
                                                    <h4 className="text-lg font-bold text-gray-800">Welcome {userData?.data?.user.first_name}!</h4>
                                                    <p className="text-sm text-gray-800">{userData?.data?.user.email}</p>
                                                </div>
                                                <div className="flex flex-col gap-2 mb-4">
                                                    <Link href="/userprofile/aboutme" className="flex items-center gap-2 text-gray-800 hover:bg-blue-100 p-2 rounded"><FaUserTie /> Profile</Link>
                                                    <a className="flex items-center gap-2 text-gray-800 hover:bg-blue-100 p-2 rounded" onClick={toggleUserProfile}><FaFileAlt /> Resume Build</a>
                                                    <a className="flex items-center gap-2 text-gray-800 hover:bg-blue-100 p-2 rounded" onClick={toggleUserProfile}><HiBriefcase /> My Jobs</a>
                                                    <a className="flex items-center gap-2 text-gray-800 hover:bg-blue-100 p-2 rounded" onClick={toggleUserProfile}><HiCog /> Settings</a>
                                                    <a className="flex items-center gap-2 text-gray-800 hover:bg-blue-100 p-2 rounded" onClick={toggleUserProfile}><HiQuestionMarkCircle /> Help Center</a>
                                                </div>
                                                <button className="w-full text-red-700 border-t border-gray-300 py-2 text-center font-bold flex items-center justify-between" onClick={handleLogout}>Sign Out <TbLogout className="text-xl" /></button>
                                            </div>
                                        )}
                                    </div>
                                    :
                                    <Link href="/signin" className='lg:hidden'>
                                        <button className="flex items-center gap-2"><HiOutlineUser /> Sign in</button>
                                    </Link>
                                }
                                <div className='lg:hidden'>
                                    {mobileMenuClicked ?
                                        <HiX className="text-2xl" onClick={() => setMobileMenuClicked(!mobileMenuClicked)} />
                                        :
                                        <HiMenu className="text-2xl" onClick={() => {
                                            setMobileMenuClicked(!mobileMenuClicked);
                                            setUserProfileClicked(false);
                                        }} />
                                    }
                                </div>
                            </div>
                        </div>
                        <div className={`lg:flex items-center gap-10 ${!mobileMenuClicked ? 'hidden' : 'block'}`}>
                            <ul className="flex gap-6">
                                <li><Link href="/" className={`${location === '/' ? 'text-blue-500' : 'text-gray-800'}`} onClick={() => (handleActiveMenu('/'), setMobileMenuClicked(false))}>Home</Link></li>
                                <li><Link href="/findjobs" className={`${location.search('/findjobs') !== -1 ? 'text-blue-500' : 'text-gray-800'}`} onClick={() => (handleActiveMenu('/findjobs'), setMobileMenuClicked(false))}>Jobs</Link></li>
                                <li><Link href="/companies" className={`${location.search('/companies') !== -1 ? 'text-blue-500' : 'text-gray-800'}`} onClick={() => (handleActiveMenu('/companies'), setMobileMenuClicked(false))}>Companies</Link></li>
                                {/* <li><Link href="/blogs" className={`${location.search('/blogs') !== -1 ? 'text-blue-500' : 'text-gray-800'}`} onClick={() => (handleActiveMenu('/blogs'), setMobileMenuClicked(false))}>Blogs</Link></li>
                                <li><Link href="/about" className={`${location.search('/about') !== -1 ? 'text-blue-500' : 'text-gray-800'}`} onClick={() => (handleActiveMenu('/about'), setMobileMenuClicked(false))}>About</Link></li>
                                <li><Link href="/contact" className={`${location.search('/contact') !== -1 ? 'text-blue-500' : 'text-gray-800'}`} onClick={() => (handleActiveMenu('/contact'), setMobileMenuClicked(false))}>Contact</Link></li> */}
                                {userData && (
                                    <div className="flex items-center gap-4 relative">
                                        <label className="relative inline-block w-14 h-7">
                                            <input type="checkbox" className="opacity-0 w-0 h-0" onClick={toggleOption} />
                                            <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-cover bg-center rounded-full transition-transform duration-300" style={{ backgroundImage: `url('${selectedOption === 'Global' ? 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/world-map-in-blue-michael-tompsett.jpg' : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmB-yQ2zFUyD9BgDpBCSWKFDEDe4pYk2pOSoPQ8PEG&s'}')` }}></span>
                                            <span className="absolute left-1 top-1 w-5 h-5 bg-gray-400 rounded-full transition-transform duration-300 transform" style={{ transform: selectedOption === 'Global' ? 'translateX(0)' : 'translateX(26px)' }}></span>
                                        </label>
                                        <TbBell className="text-2xl text-gray-600 hover:shadow-lg" />
                                        <TbUserCircle className={`text-2xl text-gray-600 cursor-pointer ${userProfileClicked ? 'shadow-lg' : ''}`} onClick={toggleUserProfile} />
                                    </div>
                                )}
                            </ul>
                            <div className="flex items-center gap-4">
                                {userData ?
                                    <>
                                        <Link href="/dashboard/appliedjobs" className='flex items-center gap-2 text-gray-800 hover:bg-blue-100 p-2 rounded'><HiOutlineUser /> Dashboard</Link>
                                        <a className='flex items-center gap-2 text-gray-800 hover:bg-blue-100 p-2 rounded' onClick={handleSignoutAlert}><TbSend /> Post a Job</a>
                                    </>
                                    :
                                    <Link href="/signin" className='hidden lg:flex items-center gap-2'><HiOutlineUser /> Sign in</Link>
                                }
                                {!userData && (
                                    <Link href="/signup" className='hidden lg:flex items-center gap-2'><HiOutlineUserAdd /> Register</Link>
                                )}
                                <Link href="/foremployers" className='hidden lg:flex items-center gap-2'><HiBriefcase /> For Employers</Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
