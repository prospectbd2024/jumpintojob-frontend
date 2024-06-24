// ShowMoreButton.jsx

import React from 'react';
import Link from 'next/link';
import './ShowMoreJobs.css';
const ShowMoreButton = ({ onClick,link }) => {
  return (
    <Link href={link} className="show-more-button" onClick={onClick}>
      Show More Jobs
    </Link>
  );
};

export default ShowMoreButton;
