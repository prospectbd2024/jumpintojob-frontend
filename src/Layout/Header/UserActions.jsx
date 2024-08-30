"use client"; 
import Link from "next/link"; 
import {
  HiBriefcase,
  HiOutlineUser,
  HiOutlineUserAdd,
} from "react-icons/hi";

import { usePathname, useRouter } from "next/navigation";
import { TbBell,TbSend } from "react-icons/tb"; 
import GlobalLocalToggle from "./GlobalLocalToggle";
import UserProfileDropdown from "./UserProfileDropdown";
const UserActions = ({
    userData,
    selectedOption,
    toggleOption,
    toggleUserProfile,
    userProfileClicked,
    handleLogout,
    handleSignoutAlert,
  }) => {
    
  const location = usePathname();  
    return (
      <div className="flex items-center space-x-4">
        {userData ? (
          <>
            <GlobalLocalToggle selectedOption={selectedOption} toggleOption={toggleOption} />
            <TbBell className="text-2xl text-gray-600 hover:shadow-lg cursor-pointer" />
            <UserProfileDropdown
              userData={userData}
              toggleUserProfile={toggleUserProfile}
              userProfileClicked={userProfileClicked}
              handleLogout={handleLogout}
            />
            <Link
              href="/dashboard/appliedjobs"
              className="flex items-center gap-2 text-gray-800 hover:bg-blue-100 p-2 rounded"
            >
              <HiOutlineUser /> Dashboard
            </Link>
            <button
              className="flex items-center gap-2 text-gray-800 hover:bg-blue-100 p-2 rounded"
              onClick={handleSignoutAlert}
            >
              <TbSend /> Post a Job
            </button>
          </>
        ) : (
          <>
            <Link href="/signin"  className={ `${location =="/signin"  ?"text-blue-500" : "text-gray-800"} flex items-center gap-2`}>
              <HiOutlineUser /> Sign in
            </Link>
            <Link href="/register" className={ `${location =="/register"  ?"text-blue-500" : "text-gray-800"} flex items-center gap-2`}>
              <HiOutlineUserAdd /> Register
            </Link>
          </>
        )}
        <Link href="/foremployers" className={ `${location =="/foremployers"  ?"text-blue-500" : "text-gray-800"} flex items-center gap-2`}>
          <HiBriefcase /> For Employers
        </Link>
      </div>
    );
  };


  export default UserActions;