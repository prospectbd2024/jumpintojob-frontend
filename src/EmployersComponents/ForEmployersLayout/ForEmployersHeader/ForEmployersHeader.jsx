"use client";
import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { FaAngleDown, FaUserAlt, FaUserCircle, FaUserPlus, FaUserTie } from "react-icons/fa";
import {
  HiBookmark,
  HiBriefcase,
  HiChevronDown,
  HiCog,
  HiOutlineBookmark,
  HiOutlineUser,
  HiOutlineUserAdd,
  HiQuestionMarkCircle,
  
} from "react-icons/hi";
import { TbBell, TbSend, TbBriefcase, TbLogout, TbUserCircle, TbClipboardList, TbMessage2, TbHome2,TbUsers } from "react-icons/tb";
import { UserContext } from "@/Contexts/UserContext";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Logo from "@/assets/Logo";

const ForEmployersHeader = () => {
  const [isClient, setClient] = useState(false);
  const activeMenu = usePathname();
  const { userData, setUserData } = useContext(UserContext);
  const [userLoggedout, setUserLoggedout] = useState(false);
  const [userProfileClicked, setUserProfileClicked] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setClient(true);
  }, []);

  const handleLogout = async (e) => {
    localStorage.removeItem("userData");
    const token = userData?.data?.access_token;
    if (!token) {
      console.error("User token not available.");
      return;
    }
    try {
      setUserData(null);

      const userLogoutResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/logout`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      await signOut();
      router.push("/signin");
      const userLogoutData = await userLogoutResponse.json();
      // alert("Logout Successfull!")
      setUserLoggedout(userLogoutData);
    } catch (error) {
      console.error("Logout failed:", error);
      alert(error);
    }
  };

  return (
    isClient && (
      <div className="bg-white border-b border-gray-400 sticky top-0 left-0 z-50 px-5">
        <div className="container mx-auto">

        <div className="flex justify-between items-center py-4">
          <div className="flex items-center cursor-pointer">
            {/* <img className='jump-job-logo' src="https://i.ibb.co/RNtVFY1/blue-full.jpg" alt="" />
             */}
            <Logo className="w-24 h-8 sm:w-32 sm:h-10" fill="var(--primary-color)" />
            <p>For Employers</p>
          </div>
          <div className="header-menu">
            <ul className="hidden lg:flex items-center space-x-4">
              <li>
                <Link
                  href="/foremployers"
                  className={`${activeMenu === "/foremployers" ? "active" : ""} flex items-center gap-2 text-gray-800 hover:bg-blue-100 p-2 rounded`}>
                  <TbHome2 />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/foremployers/postjobs"
                  className={`${
                    activeMenu === "/foremployers/postjobs" ? "active" : ""
                  } flex items-center gap-2 text-gray-800 hover:bg-blue-100 p-2 rounded`}>
                  {" "}
                  <TbSend /> Post a Job
                </Link>
              </li>
              <li>
                <Link
                  href="/candidates"
                  className={`${activeMenu === "/candidates" ? "active" : ""} flex items-center gap-2 text-gray-800 hover:bg-blue-100 p-2 rounded`}>
                  <TbClipboardList /> Candidates
                </Link>
              </li>
              <li>
                <Link href={""} className="flex items-center gap-2 text-gray-800 hover:bg-blue-100 p-2 rounded">
                  <TbMessage2 /> Message
                </Link>
              </li>
              <li>
                <Link href="/" className="flex items-center gap-2 text-gray-800 hover:bg-blue-100 p-2 rounded">
                <TbUsers />For Workers
                </Link>
              </li>
              <li className="flex items-center space-x-4">
                {userData?.data ? (
                  <div className="flex items-center gap-2">
                    <TbBell className="w-6 h-6" />
                    <div>
                      <TbUserCircle onClick={() => setUserProfileClicked(!userProfileClicked)} className="w-6 h-6"></TbUserCircle>
                      {userProfileClicked && (
                        <div className="user-profile-icon">
                          <div className="user-profile-icon-header">
                            <h4>
                              Welcome {userData?.data?.user.first_name} {userData?.data?.user.last_name} !
                            </h4>
                            <p>{userData?.data?.user.email}</p>
                          </div>
                          <div className="loggedin-user-options">
                            <Link href="/foremployers/employerprofile" onClick={() => setUserProfileClicked(false)}>
                              <FaUserTie></FaUserTie>Employer Profile
                            </Link>
                            <Link href="/foremployers/managejobs/dashboard" onClick={() => setUserProfileClicked(false)}>
                              <HiBriefcase></HiBriefcase>Manage Jobs
                            </Link>
                            <a onClick={() => setUserProfileClicked(false)} style={{ cursor: "pointer" }}>
                              <HiBriefcase></HiBriefcase>Subscriptions
                            </a>
                            <a onClick={() => setUserProfileClicked(false)} style={{ cursor: "pointer" }}>
                              <HiCog></HiCog> Settings
                            </a>
                            <a onClick={() => setUserProfileClicked(false)} style={{ cursor: "pointer" }}>
                              <HiQuestionMarkCircle></HiQuestionMarkCircle> Help Center
                            </a>
                          </div>
                          <button className="signout-btn" onClick={handleLogout}>
                            Sign Out <TbLogout></TbLogout>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <>
                    <li>
                      <Link href="/foremployers/register" className="flex items-center gap-2 text-gray-800 hover:bg-blue-100 p-2 rounded">
                        <HiOutlineUserAdd />
                        Register
                      </Link>
                    </li>
                    <li>
                      <Link href="/foremployers/signin" className="flex items-center gap-2 text-gray-800 hover:bg-blue-100 p-2 rounded">
                        <HiOutlineUser />
                        Sign In
                      </Link>
                    </li>
                  </>
                )}
              </li>
            </ul>
          </div>
        </div>
        </div>
      </div>
    )
  );
};

export default ForEmployersHeader;
