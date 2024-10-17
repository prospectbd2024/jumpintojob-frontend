import React from 'react';
import Link from "next/link";
import { motion } from 'framer-motion';
import { HiHome, HiBriefcase, HiOfficeBuilding } from "react-icons/hi";

const NavLink = ({ href, label, icon, isActive, mobile, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Link
      href={href}
      className={`
        ${isActive ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-blue-50"}
        ${mobile ? "block w-full" : "inline-block"}
        px-4 py-2 rounded-lg transition-colors duration-200 font-medium
      `}
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        {icon}
        <span>{label}</span>
      </div>
    </Link>
  </motion.div>
);

const NavLinks = ({ activeMenu, handleActiveMenu, mobile }) => {
  const links = [
    { href: "/", label: "Home", icon: <HiHome className="text-xl" /> },
    { href: "/jobs", label: "Jobs", icon: <HiBriefcase className="text-xl" /> },
    { href: "/companies", label: "Companies", icon: <HiOfficeBuilding className="text-xl" /> },
  ];

  return (
    <motion.nav
      className={`flex ${mobile ? "flex-col space-y-2" : "space-x-2"}`}
      initial={mobile ? { opacity: 0, y: -20 } : { opacity: 0, x: -20 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={mobile ? { opacity: 0, y: -20 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {links.map((link) => (
        <NavLink
          key={link.href}
          href={link.href}
          label={link.label}
          icon={link.icon}
          isActive={activeMenu === link.href}
          mobile={mobile}
          onClick={() => handleActiveMenu(link.href)}
        />
      ))}
    </motion.nav>
  );
};

export default NavLinks;