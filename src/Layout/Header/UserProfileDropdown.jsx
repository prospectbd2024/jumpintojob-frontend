import React from 'react';
import Link from "next/link";
import { motion } from 'framer-motion';
import { FaFileAlt, FaUserTie } from "react-icons/fa";
import {
    HiBriefcase,
    HiCog,
    HiOutlineViewGrid,
    HiQuestionMarkCircle,
} from "react-icons/hi";
import { TbLogout, TbUserCircle } from "react-icons/tb";

const UserProfileLink = ({ href, icon, label }) => (
    <Link
        href={href}
        className="flex items-center gap-3 text-gray-700 hover:bg-blue-50 p-3 rounded-lg transition-colors duration-200"
    >
        <span className="text-blue-500">{icon}</span>
        <span>{label}</span>
    </Link>
);

const UserProfileDropdown = ({
                                 userData,
                                 toggleUserProfile,
                                 userProfileClicked,
                                 handleLogout,
                             }) => {
    return (
        <div className="relative">
            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                <TbUserCircle
                    className="text-3xl text-blue-500 cursor-pointer"
                    onClick={toggleUserProfile}
                />
            </motion.div>

            {userProfileClicked && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-12 right-0 w-80 bg-white shadow-xl rounded-xl overflow-hidden z-[1001]"
                >
                    <div className="bg-gradient-to-r from-primary-color to-purple-600 p-6 text-white">
                        <h4 className="text-xl font-bold">
                            Welcome, {userData?.data?.user.first_name}!
                        </h4>
                        <p className="text-sm opacity-80">{userData?.data?.user.email}</p>
                    </div>
                    <div className="p-4 space-y-2">
                        <UserProfileLink href="/dashboard" icon={<HiOutlineViewGrid />} label="Dashboard" />
                        <UserProfileLink href="/userprofile/aboutme" icon={<FaUserTie />} label="Profile" />
                        <UserProfileLink href="/resumebuilder" icon={<FaFileAlt />} label="Resume Builder" />
                        <UserProfileLink href="/settings" icon={<HiCog />} label="Settings" />
                        <UserProfileLink href="/help" icon={<HiQuestionMarkCircle />} label="Help Center" />
                    </div>
                    <div className="px-4 pb-4">
                        <button
                            className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-red-600 transition-colors duration-200"
                            onClick={handleLogout}
                        >
                            <TbLogout className="text-xl" />
                            Sign Out
                        </button>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default UserProfileDropdown;
