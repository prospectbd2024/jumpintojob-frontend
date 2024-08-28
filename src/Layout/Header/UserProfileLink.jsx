"use client"; 
import Link from "next/link"; 
const UserProfileLink = ({ href, icon, label }) => (
    <Link
      href={href}
      className="flex items-center gap-2 text-gray-800 hover:bg-blue-100 p-2 rounded"
    >
      {icon} {label}
    </Link>
  );

export default UserProfileLink;