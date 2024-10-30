import React from 'react';
import Link from "next/link";
import { motion } from 'framer-motion';
import { usePathname } from "next/navigation";
import {
  HiBriefcase,
  HiOutlineUser,
  HiOutlineUserAdd,
} from "react-icons/hi";
import { TbBell, TbSend } from "react-icons/tb";
import GlobalLocalToggle from "./GlobalLocalToggle";
import UserProfileDropdown from "./UserProfileDropdown";

const ActionLink = ({ href, icon, label }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Link
        href={href}
        className={`
          flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200
          ${isActive ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"}
        `}
      >
        {icon}
        <span className="font-medium">{label}</span>
      </Link>
    </motion.div>
  );
};

const ActionButton = ({ onClick, icon, label }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-200"
    onClick={onClick}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </motion.button>
);

const UserActions = ({
  userData,
  selectedOption,
  toggleOption,
  toggleUserProfile,
  userProfileClicked,
  handleLogout,
  handleSignoutAlert,
}) => {
  return (
    <motion.div
      className="flex items-center space-x-2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {userData ? (
        <>
          <GlobalLocalToggle selectedOption={selectedOption} toggleOption={toggleOption} />
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <TbBell className="text-2xl text-gray-600 hover:text-blue-600 cursor-pointer" />
          </motion.div>
          <ActionButton
            onClick={handleSignoutAlert}
            icon={<TbSend />}
            label="Post a Job"
          />
        </>
      ) : (
        <>
          <ActionLink href="/signin" icon={<HiOutlineUser />} label="Sign in" />
          <ActionLink href="/register" icon={<HiOutlineUserAdd />} label="Register" />
        </>
      )}
      <ActionLink href="/foremployers"  label="For Employers" />

      {/*user profile dropdown*/}
      {userData ? (
          <UserProfileDropdown
              userData={userData}
              toggleUserProfile={toggleUserProfile}
              userProfileClicked={userProfileClicked}
              handleLogout={handleLogout}
          />
      ) : null}
    </motion.div>
  );
};

export default UserActions;