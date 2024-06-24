// src/Components/SkeletonLoader/SkeletonLoader.jsx

import React from 'react';
import './JobListView.css';

const SkeletonLoader = () => {
  return (
    <div className="skeleton-job">
      <div className="skeleton-header">
        <div className="skeleton-title"></div>
        <div className="skeleton-icon"></div>
      </div>
      <div className="skeleton-company"></div>
      <div className="skeleton-address"></div>
      <div className="skeleton-description"></div>
      <div className="skeleton-bottom">
        <div className="skeleton-salary"></div>
        <div className="skeleton-date"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
