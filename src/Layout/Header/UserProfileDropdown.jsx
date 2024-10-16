"use client"; 
import Link from "next/link";
import { FaFileAlt, FaUserTie } from "react-icons/fa";
import {
  HiBriefcase,
  HiCog, 
  HiOutlineViewGrid,
  HiQuestionMarkCircle, 
} from "react-icons/hi";
import {   TbLogout, TbUserCircle } from "react-icons/tb"; 
import UserProfileLink from "./UserProfileLink";
const UserProfileDropdown = ({
    userData,
    toggleUserProfile,
    userProfileClicked,
    handleLogout,
  }) => {
    return (
      <div className="relative">
        <TbUserCircle
          className={`text-2xl text-gray-600 cursor-pointer ${
            userProfileClicked ? "shadow-lg" : ""
          }`}
          onClick={toggleUserProfile}
        />
        {userProfileClicked && (
          <div className="absolute top-10 right-0 w-72 bg-white shadow-lg rounded-lg p-5">
            <div className="mb-4">
              <h4 className="text-lg font-bold text-gray-800">
                Welcome {userData?.data?.user.first_name}!
              </h4>
              <p className="text-sm text-gray-800">{userData?.data?.user.email}</p>
            </div>
            <div>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-gray-800 hover:bg-blue-100 p-2 rounded"
            >
              <HiOutlineViewGrid /> Dashboard
            </Link>
            </div>
            <div className="flex flex-col gap-2 mb-4">
              <UserProfileLink href="/userprofile/aboutme" icon={<FaUserTie />} label="Profile" />
              <UserProfileLink href="/resumebuilder" icon={<FaFileAlt />} label="Resume Build" />
              <UserProfileLink href="#" icon={<HiBriefcase />} label="My Jobs" />
              <UserProfileLink href="#" icon={<HiCog />} label="Settings" />
              <UserProfileLink href="#" icon={<HiQuestionMarkCircle />} label="Help Center" />
            </div>
            <button
              className="w-full text-red-700 border-t border-gray-300 py-2 text-center font-bold flex items-center justify-between"
              onClick={handleLogout}
            >
              Sign Out <TbLogout className="text-xl" />
            </button>
          </div>
        )}
      </div>
    );
  };


  export default UserProfileDropdown;