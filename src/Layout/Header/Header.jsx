"use client"
import React, { useState, useCallback, useContext, useEffect } from 'react';
import './Header.css';
import Link from 'next/link';
import { FaFileAlt, FaGlobe, FaUserTie } from "react-icons/fa";
import { HiBookmark, HiBriefcase, HiCog, HiMenu, HiOutlineUser, HiOutlineUserAdd, HiQuestionMarkCircle, HiX } from "react-icons/hi";
import { TbBell, TbLogout, TbSend, TbUserCircle } from 'react-icons/tb';
import Swal from 'sweetalert2';
import { usePathname, useRouter } from 'next/navigation';
import { UserContext } from '@/Contexts/UserContext';
import { signOut } from 'next-auth/react';
import Logo from '@/assets/Logo'

const Header = () => {
    const forEmployerNavigate = useRouter();
    const [mobileMenuClicked, setMobileMenuClicked] = useState(false);
    const location = usePathname();
    const [activeMenu, setActiveMenu] = useState(location);
    const { userData, setUserData } = useContext(UserContext);

    const [userLoggedout, setUserLoggedout] = useState(false);
    const [userProfileClicked, setUserProfileClicked] = useState(false);

    // console.log(userProfileClicked);
    const [isClient, setClient] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userProfileClicked && !event.target.closest('.user-profile-icon')) {
                setUserProfileClicked(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [userProfileClicked]);


    useEffect(() => {
        setClient(true)

    }, [])
    const [selectedOption, setSelectedOption] = useState('Global');
    const toggleOption = () => {
        setSelectedOption(selectedOption === 'Global' ? 'Local' : 'Global');
    };
    // console.log(selectedOption)


    const toggleUserProfile = () => {
        setUserProfileClicked((prev) => !prev);
    }

    const handleActiveMenu = (e) => {
        setActiveMenu(e);
    };

    const handleLogout = async () => {
        forEmployerNavigate.push('/signin')
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'User logout successful!',
            showConfirmButton: false,
            timer: 1500
        });
        setUserData(null);
        console.log("logging out");
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
            console.log("logging out");
            await signOut();
            console.log("logged out");
            const userLogoutData = await userLogoutResponse.json();
            setUserLoggedout(userLogoutData);
            setUserData(null);
            // forEmployerNavigate.push('/signin')

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
                    handleLogout(); // Call handleLogout only if the user confirms
                    forEmployerNavigate.push('/foremployers');
                });
            }
        } else {
            forEmployerNavigate.push('/foremployers');
        }
    };


    return (
        <>{
            isClient &&

            <div className='main-header' >
                <div className="web-header container">
                    <div className="header-logo">
                        {/* <img className='jump-job-logo' src={Logo.src} alt="" />
                         */}
                         <Logo className='jump-job-logo'  fill='var(--primary-color)' />
                        <div className='mobile-menu-icon'>
                            {userData ?
                                <div className={`loggedin-user-container`}>
                                    <div className='local-global'>
                                        <label className="toggle-switch">
                                            <input type="checkbox" onClick={toggleOption} />
                                            <span className="slider round"></span>
                                        </label>
                                    </div>
                                    <TbBell />
                                    <TbUserCircle className={userProfileClicked ? 'user-profile-active' : ''}></TbUserCircle>

                                    <div className={`user-profile-icon ${!userProfileClicked ? 'hide-profile-menu' : 'show-profile-menu'}`}>
                                        <div className="user-profile-icon-header">

                                            <h4>Welcome {userData?.data?.user.first_name} !</h4>
                                            <p>{userData?.data?.user.email}</p>
                                        </div>
                                        <div className="loggedin-user-options">
                                            <Link href="/userprofile/aboutme" onClick={toggleUserProfile}><FaUserTie /> Profile</Link>
                                            <a onClick={toggleUserProfile}><FaFileAlt /> Resume Build</a>
                                            <a onClick={toggleUserProfile}><HiBriefcase />My Jobs</a>
                                            <a onClick={toggleUserProfile}><HiCog /> Settings</a>
                                            <a onClick={toggleUserProfile}><HiQuestionMarkCircle /> Help Center</a>
                                        </div>
                                        <button className='signout-btn' onClick={handleLogout}>Sign Out <TbLogout></TbLogout></button>
                                    </div>

                                </div>
                                :
                                <div>
                                    <Link href="/signin" className='mobile-login-btn'><button><HiOutlineUser /> Sign in</button></Link>
                                </div>
                            }
                            <div className='menu-close-open'>
                                {mobileMenuClicked ?
                                    <HiX onClick={() => setMobileMenuClicked(!mobileMenuClicked)} />
                                    :
                                    <HiMenu onClick={() => {
                                        setMobileMenuClicked(!mobileMenuClicked);
                                        setUserProfileClicked(false);
                                    }} />
                                }
                            </div>
                        </div>

                    </div>
                    <div className={`header-menu ${!mobileMenuClicked ? 'hide-header-menu' : 'show-header-menu'}`}>
                        <ul className="main-menu">
                            <li><Link href="/" onClick={() => (handleActiveMenu(activeMenu), setMobileMenuClicked(false))} className={location === '/' ? 'active' : ''}>Home</Link></li>
                            <li><Link href="/findjobs" onClick={() => (handleActiveMenu(activeMenu), setMobileMenuClicked(false))} className={ location.search('/findjobs')!=-1  ? 'active' : ''}>Jobs</Link></li>
                            <li><Link href="/companies" onClick={() => (handleActiveMenu(activeMenu), setMobileMenuClicked(false))} className={location.search('/companies') !=-1  ? 'active' : ''}>Companies</Link></li>
                            {/* <li><Link href="/message" onClick={() => (handleActiveMenu(activeMenu), setMobileMenuClicked(false))} className={location.search('/message')!=-1 ? 'active' : ''}>Message</Link></li> */}
                            <li><a onClick={handleSignoutAlert} style={{ "cursor": "pointer" }}>For Employers</a></li>
                        </ul>
                        <div className="account-menu">
                            {
                                userData?.data ?
                                    <div className="loggedin-user-container">
                                        <div>
                                            <div className='togglenicon' style={{ display: 'flex', gap: '25px' }}>
                                                <div className='local-global'>
                                                    <label className="toggle-switch">
                                                        <input type="checkbox" onClick={toggleOption} />
                                                        <span className="slider round"></span>
                                                    </label>
                                                </div>
                                                <div className='notification-profile-icon'>
                                                    <TbBell />
                                                    <TbUserCircle onClick={toggleUserProfile} className={userProfileClicked ? 'user-profile-active' : ''}></TbUserCircle>
                                                </div>
                                            </div>

                                            {userProfileClicked ?
                                                <div className="user-profile-icon">
                                                    <div className="user-profile-icon-header">
                                                        <h4>Welcome {userData?.data?.user.first_name} !</h4>
                                                        <p>{userData?.data?.user.email}</p>
                                                    </div>
                                                    <div className="loggedin-user-options">
                                                        <Link href="/userprofile/aboutme" onClick={toggleUserProfile}><FaUserTie></FaUserTie> Profile</Link>
                                                        <Link href="/myjobs/dashboard" onClick={toggleUserProfile}><HiBriefcase></HiBriefcase> My Jobs</Link>
                                                        <Link href="/resumebuilder" onClick={toggleUserProfile}><FaFileAlt></FaFileAlt> Resume Build</Link>
                                                        <a onClick={toggleUserProfile}><HiCog /> Settings</a>
                                                        <a onClick={toggleUserProfile}><HiQuestionMarkCircle /> Help Center</a>
                                                    </div>
                                                    <button className='signout-btn' onClick={handleLogout}>Sign Out <TbLogout /></button>
                                                </div>
                                                :
                                                ''
                                            }
                                        </div>
                                    </div>
                                    :
                                    userLoggedout?.result ?
                                        <ul>
                                            <li><Link href="/register" className='register-btn' onClick={() => setMobileMenuClicked(false)}><HiOutlineUserAdd />Register</Link></li>
                                            <li><Link href="/signin" className='login-btn' onClick={() => setMobileMenuClicked(false)}><HiOutlineUser />Sign In</Link></li>
                                        </ul>
                                        :
                                        <ul>
                                            <li><Link href="/register" className='register-btn'><HiOutlineUserAdd />Register</Link></li>
                                            <li><Link href="/signin" className='login-btn'><HiOutlineUser />Sign In</Link></li>
                                        </ul>
                            }
                        </div>
                    </div>

                </div>
                <div className={`header-menu ${!mobileMenuClicked ? 'hide-header-menu' : 'show-header-menu'}`} hidden>
                    <ul className="main-menu">
                        <li><Link href="/" onClick={() => (handleActiveMenu(activeMenu), setMobileMenuClicked(false))} className={location === '/' ? 'active' : ''}>Home</Link></li>
                        <li><Link href="/findjobs" onClick={() => (handleActiveMenu(activeMenu), setMobileMenuClicked(false))} className={ location.search('/findjobs')!=-1  ? 'active' : ''}>Jobs</Link></li>
                        <li><Link href="/companies" onClick={() => (handleActiveMenu(activeMenu), setMobileMenuClicked(false))} className={location.search('/companies') !=-1  ? 'active' : ''}>Companies</Link></li>
                        {/* <li><Link href="/message" onClick={() => (handleActiveMenu(activeMenu), setMobileMenuClicked(false))} className={location.search('/message')!=-1 ? 'active' : ''}>Message</Link></li> */}
                        <li><a onClick={handleSignoutAlert} style={{"cursor" : "pointer"}}>For Employers</a></li>
                    </ul>
                    <div className="account-menu">
                        {
                            userData?.data ?
                                <div className="loggedin-user-container">
                                    <div>
                                        <div className='local-global'>
                                            <label className="toggle-switch">
                                                <input type="checkbox" onClick={toggleOption} />
                                                <span className="slider round"></span>
                                            </label>
                                        </div>
                                        <TbBell />
                                        {/* <TbSend></TbSend> */}
                                        <TbUserCircle onClick={toggleUserProfile} className={userProfileClicked ? 'user-profile-active' : ''}></TbUserCircle>

                                        {userProfileClicked ?
                                            <div className="user-profile-icon">
                                                <div className="user-profile-icon-header">
                                                    <h4>Welcome Kazi !</h4>
                                                    <p>kazisolah@gmail.com</p>
                                                </div>
                                                <div className="loggedin-user-options">
                                                    <Link href="/userprofile/aboutme" onClick={toggleUserProfile}><FaUserTie></FaUserTie> Profile</Link>
                                                    <Link href="/myjobs/dashboard" onClick={toggleUserProfile}><HiBriefcase></HiBriefcase> My Jobs</Link>
                                                    <Link href="/resumebuilder" onClick={toggleUserProfile}><FaFileAlt></FaFileAlt> Resume Build</Link>
                                                    <a onClick={toggleUserProfile}><HiCog /> Settings</a>
                                                    <a onClick={toggleUserProfile}><HiQuestionMarkCircle /> Help Center</a>
                                                </div>
                                                <button className='signout-btn' onClick={handleLogout}>Sign Out <TbLogout /></button>
                                            </div>
                                            :
                                            ''
                                        }
                                    </div>
                                </div>
                                :
                                userLoggedout?.result ?
                                    <ul>
                                        <li><Link href="/register" className='register-btn' onClick={() => setMobileMenuClicked(false)}><HiOutlineUserAdd />Register</Link></li>
                                        <li><Link href="/signin" className='login-btn' onClick={() => setMobileMenuClicked(false)}><HiOutlineUser />Sign In</Link></li>
                                    </ul>
                                    :
                                    <ul>
                                        <li><Link href="/register" className='register-btn'><HiOutlineUserAdd />Register</Link></li>
                                        <li><Link href="/signin" className='login-btn'><HiOutlineUser />Sign In</Link></li>
                                    </ul>
                        }
                    </div>
                </div>
            </div>
        }
        </>
    );
};

export default Header;
