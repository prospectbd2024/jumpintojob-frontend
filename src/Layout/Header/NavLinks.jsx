"use client"; 
import Link from "next/link"; 

const NavLinks = ({ activeMenu, handleActiveMenu, mobile }) => {
    const links = [
      { href: "/", label: "Home" },
      { href: "/jobs", label: "Jobs" },
      { href: "/companies", label: "Companies" },
    ];
  
    return (
      <>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`${
              activeMenu === link.href ? "text-blue-500" : "text-gray-800"
            } ${
              mobile
                ? "block px-4 py-3 text-2xl font-semibold hover:bg-blue-100 rounded-lg transition-colors duration-200"
                : ""
            }`}
            onClick={() => handleActiveMenu(link.href)}
          >
            {link.label}
          </Link>
        ))}
      </>
    );
  };

export default NavLinks;