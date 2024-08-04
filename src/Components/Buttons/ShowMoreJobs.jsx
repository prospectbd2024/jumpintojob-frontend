import React from 'react';
import Link from 'next/link';

const ShowMoreButton = ({ onClick, link }) => {
  return (
    <Link
      href={link}
      onClick={onClick}
      className="
        bg-green-500 
        text-white 
        px-4 
        py-2 
        text-lg 
        rounded-md 
        cursor-pointer 
        inline-block 
        mt-2 
        transition 
        duration-300 
        ease-in-out 
        hover:bg-green-600
      "
    >
      Show More Jobs
    </Link>
  );
};

export default ShowMoreButton;
