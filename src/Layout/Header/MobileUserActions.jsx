import React from 'react';
import Link from "next/link";
import { motion } from 'framer-motion';
import { HiOutlineViewGrid, HiBriefcase, HiLogout, HiLogin, HiUserAdd, HiOfficeBuilding } from "react-icons/hi";
import { TbSend } from "react-icons/tb";

const ActionLink = ({ href, label, icon, onClick, color = "blue" }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
  >
    <Link
      href={href}
      className={`
        flex items-center gap-3 w-full px-4 py-3 text-lg font-semibold
        ${color === "blue" ? "text-gray-700 hover:bg-blue-50 hover:text-blue-600" : "text-red-600 hover:bg-red-50"}
        rounded-lg transition-colors duration-200
      `}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </Link>
  </motion.div>
);

const ActionButton = ({ label, icon, onClick, color = "blue" }) => (
  <motion.button
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    className={`
      flex items-center gap-3 w-full px-4 py-3 text-lg font-semibold
      ${color === "blue" ? "text-gray-700 hover:bg-blue-50 hover:text-blue-600" : "text-red-600 hover:bg-red-50"}
      rounded-lg transition-colors duration-200
    `}
    onClick={onClick}
  >
    {icon}
    <span>{label}</span>
  </motion.button>
);

const MobileUserActions = ({ userData, handleSignoutAlert, handleLogout, location }) => {
  return (
    <motion.div
      className="mt-6 space-y-2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {userData ? (
        <>
          <ActionLink
            href="/myjobs/dashboard"
            label="Dashboard"
            icon={<HiOutlineViewGrid className="text-xl" />}
          />
          <ActionButton
            label="Post a Job"
            icon={<TbSend  className='text-xl'/>}
            onClick={handleSignoutAlert}
          />
          <ActionButton
            label="Sign Out"
            icon={<HiLogout className="text-xl" />}
            onClick={handleLogout}
            color="red"
          />
        </>
      ) : (
        <>
          <ActionLink
            href="/signin"
            label="Sign in"
            icon={<HiLogin className="text-xl" />}
          />
          <ActionLink
            href="/register"
            label="Register"
            icon={<HiUserAdd className="text-xl" />}
          />
        </>
      )}
      <ActionLink
        href="/foremployers"
        label="For Employers"
        
      />
    </motion.div>
  );
};

export default MobileUserActions;